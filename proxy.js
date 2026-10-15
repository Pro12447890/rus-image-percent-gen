/**
 * proxy_switch — выбор исходящего прокси для DeepSeek Harness.
 *
 * Здесь же живёт страница настроек прокси: host-половина отдаёт её данные
 * HTTP-маршрутами `/api/rus-image-percent-gen/proxy*`, значения сохраняются
 * в `$DSH_HOME/rus-image-percent-gen.json` (не в пакете!).
 *
 * Плагин НЕ содержит никакого адреса прокси: маршрут включает сам пользователь
 * своим адресом, переменными окружения или не включает вовсе. `undici`
 * подгружается динамически; без него инструмент честно говорит, чего не хватает.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { readInstructions } from './shared.js'

/** Имя записи в дереве Cordis. */
export const name = 'rus-image-percent-gen/proxy'
/** Инструмент регистрируется в реестре `ctx.tools`. */
export const inject = ['tools']


/* -------------------------------------------------------------- ПРОКСИ --- */

/**
 * Исходящий прокси. Плагин НЕ содержит никакого адреса: маршрут включает сам
 * пользователь — своим адресом (`action: "set"`) или переменными окружения
 * (`action: "env"`). По умолчанию всё идёт напрямую, как если бы плагина не было.
 *
 * Техника та же, что у штатного `@deepseek-ai/dsh-http-proxy`: подменяется
 * глобальный диспетчер undici, а его читает встроенный `fetch` — то есть модели,
 * поиск и HTTP-MCP. `undici` подгружается динамически, только когда прокси
 * действительно включают; без него плагин работает как обычно и честно говорит,
 * что для прокси нужен пакет `undici` или отдельный плагин прокси.
 */
const proxyState = {
  mode: 'direct',
  url: undefined,
  noProxy: [],
  installed: undefined,
  baseline: undefined,
  envExported: {},
  /** Кандидаты из конфига записи: `[{ name?, url }]` — для выбора и проверки. */
  candidates: [],
  /** Результаты последней проверки: `{ name?, url, ok, ms, exit, country, error }`. */
  lastCheck: [],
}
/** Промис динамического импорта undici (или null, если его нет). */
let undiciPromise

/** Куда стучимся при проверке прокси: адрес и страна одним крошечным ответом. */
const DEFAULT_PROBE_URLS = [
  'http://ip-api.com/json/?fields=status,country,countryCode,query',
  'https://api.country.is/',
]
/** Сколько ждём ответа при проверке, мс. */
const DEFAULT_PROBE_TIMEOUT_MS = 5000

/** Варианты написания протокола → канонический вид. */
const PROTOCOL_ALIASES = { socks: 'socks5', socks5h: 'socks5' }
/** Протоколы, которые принимает и инструмент, и страница настроек. */
const PROXY_PROTOCOLS = ['http', 'https', 'socks5']

/** Файл настроек прокси (в профиле пользователя, НЕ в пакете плагина). */
const SETTINGS_FILE = join(process.env.DSH_HOME ?? join(homedir(), '.dsh'), 'rus-image-percent-gen.json')

/** Загрузить undici при первой надобности. */
async function loadUndici() {
  if (undiciPromise === undefined) undiciPromise = import('undici').catch(() => null)
  return undiciPromise
}

/** Спрятать логин и пароль в адресе прокси. */
function redactProxy(url) {
  try {
    const parsed = new URL(url)
    return parsed.username === '' && parsed.password === '' ? parsed.href : `${parsed.protocol}//***@${parsed.host}`
  } catch {
    return '<нечитаемый адрес>'
  }
}

/** Разобрать и проверить адрес прокси: http(s):// и socks5:// (как у сторонних плагинов). */
function readProxyUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('proxy_switch: "proxy" must be a non-empty proxy URL, for example "http://user:password@host:8080"')
  }
  let parsed
  try {
    parsed = new URL(value.trim())
  } catch {
    throw new Error(`proxy_switch: cannot read the proxy URL ${JSON.stringify(value)}; expected http://host:port or https://host:port`)
  }
  const protocol = PROTOCOL_ALIASES[parsed.protocol.replace(/:$/, '')] ?? parsed.protocol.replace(/:$/, '')
  if (protocol !== 'http' && protocol !== 'https' && protocol !== 'socks5') {
    throw new Error(`proxy_switch: ${parsed.protocol}// is not supported — use an HTTP(S) or SOCKS5 proxy`)
  }
  return parsed.href
}

/** Протокол адреса прокси: `http`, `https` или `socks5`. */
function readProxyProtocol(url) {
  try {
    const raw = new URL(url).protocol.replace(/:$/, '')
    return PROTOCOL_ALIASES[raw] ?? raw
  } catch {
    return 'http'
  }
}

/**
 * Собрать адрес прокси из частей: у каждого прокси они свои, поэтому ввод
 * раздельный — протокол, хост, порт, логин, пароль (а не одна строка).
 * @param parts - `{ protocol?, host, port?, user?, password? }`.
 * @returns нормализованный адрес прокси.
 */
function buildProxyUrl(parts) {
  const raw = String(parts.protocol ?? 'http').replace(/:+$/, '').toLowerCase()
  const protocol = PROTOCOL_ALIASES[raw] ?? raw
  if (!PROXY_PROTOCOLS.includes(protocol)) {
    throw new Error(`proxy_switch: "protocol" must be one of ${PROXY_PROTOCOLS.join(', ')}, got ${JSON.stringify(parts.protocol)}`)
  }
  const host = String(parts.host ?? '').trim()
  if (host === '') throw new Error('proxy_switch: "host" is required — pass host/port (and user/password when the proxy asks for them)')
  if (/[\s/@]/.test(host)) throw new Error(`proxy_switch: "host" must be a host name or IP without a scheme, slashes or credentials, got ${JSON.stringify(host)}`)
  let port = ''
  if (parts.port !== undefined && parts.port !== null && parts.port !== '') {
    const portNumber = Number(parts.port)
    if (!Number.isInteger(portNumber) || portNumber < 1 || portNumber > 65535) {
      throw new Error(`proxy_switch: "port" must be an integer from 1 to 65535, got ${JSON.stringify(parts.port)}`)
    }
    port = `:${portNumber}`
  }
  const user = parts.user === undefined || parts.user === null ? '' : String(parts.user).trim()
  const password = parts.password === undefined || parts.password === null ? '' : String(parts.password)
  const auth = user === '' ? '' : `${encodeURIComponent(user)}:${encodeURIComponent(password)}@`
  return readProxyUrl(`${protocol}://${auth}${host}${port}`)
}

/**
 * Прочитать описание прокси: готовый адрес строкой или части объектом.
 * @param entry - строка URL либо `{ name?, protocol?, host, port?, user?, password?, url? }`.
 * @param fallbackName - имя, если в описании его нет.
 * @returns `{ name, url }`.
 */
function readProxySpec(entry, fallbackName) {
  if (typeof entry === 'string') return { name: fallbackName, url: readProxyUrl(entry) }
  if (entry === null || typeof entry !== 'object') {
    throw new Error('proxy_switch: a proxy must be a URL string or an object with host/port/user/password')
  }
  const name = typeof entry.name === 'string' && entry.name.trim() !== '' ? entry.name.trim() : fallbackName
  if (typeof entry.url === 'string' && entry.url.trim() !== '') return { name, url: readProxyUrl(entry.url) }
  return { name, url: buildProxyUrl(entry) }
}

/** Отдать переменные прокси дочерним процессам (или забрать их назад). */
function syncProxyEnv(mode, url, noProxy) {
  const keys = ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'NO_PROXY', 'http_proxy', 'https_proxy', 'all_proxy', 'no_proxy']
  if (mode !== 'manual') {
    for (const [key, value] of Object.entries(proxyState.envExported)) {
      if (value === null) delete process.env[key]
      else process.env[key] = value
    }
    proxyState.envExported = {}
    return
  }
  for (const key of keys) {
    if (!(key in proxyState.envExported)) proxyState.envExported[key] = key in process.env ? process.env[key] : null
  }
  for (const key of ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'http_proxy', 'https_proxy', 'all_proxy']) process.env[key] = url
  const list = noProxy.join(',')
  for (const key of ['NO_PROXY', 'no_proxy']) {
    if (list === '') delete process.env[key]
    else process.env[key] = list
  }
}

/**
 * Включить режим (manual — свой адрес, system — из окружения, direct — напрямую).
 * @param mode - `manual`, `system` или `direct`.
 * @param url - адрес прокси для manual.
 * @param noProxy - список хостов, идущих напрямую.
 * @param exportEnv - отдавать ли переменные дочерним процессам.
 */
async function switchProxy(mode, url, noProxy, exportEnv) {
  if (mode === 'direct') {
    const mod = await loadUndici()
    if (mod !== null) {
      if (proxyState.installed !== undefined) {
        mod.setGlobalDispatcher(proxyState.baseline ?? new mod.Agent())
        Promise.resolve(proxyState.installed.close?.()).catch(() => {})
      }
    }
    proxyState.mode = 'direct'
    proxyState.url = undefined
    proxyState.installed = undefined
    syncProxyEnv('direct')
    return 'direct: every request goes out without a proxy'
  }

  const mod = await loadUndici()
  if (mod === null) {
    throw new Error('proxy_switch: the "undici" package is not installed for this plugin, so an in-process proxy cannot be installed — install undici (npm i undici) next to the plugin, or use a dedicated proxy plugin with a settings card')
  }

  let effective = url
  let list = noProxy
  if (mode === 'system') {
    const env = process.env.HTTPS_PROXY ?? process.env.https_proxy ?? process.env.HTTP_PROXY ?? process.env.http_proxy ?? process.env.ALL_PROXY ?? process.env.all_proxy
    if (env === undefined || env === '') {
      throw new Error('proxy_switch: no proxy is set in the environment (HTTP_PROXY/HTTPS_PROXY/ALL_PROXY), so system mode has nothing to follow — pass an explicit "proxy" URL instead')
    }
    effective = readProxyUrl(env)
    const envNoProxy = process.env.NO_PROXY ?? process.env.no_proxy
    list = envNoProxy === undefined || envNoProxy === '' ? list : envNoProxy.split(',').map((entry) => entry.trim()).filter(Boolean)
  }

  const protocol = readProxyProtocol(effective)
  let dispatcher
  if (protocol === 'socks5') {
    // У SOCKS5 в undici нет своего списка обхода: noProxy к нему не применяется.
    dispatcher = new mod.Socks5ProxyAgent(effective)
    list = []
  } else {
    dispatcher = new mod.EnvHttpProxyAgent({
      httpProxy: effective,
      httpsProxy: effective,
      noProxy: list.join(','),
    })
  }
  if (proxyState.baseline === undefined) proxyState.baseline = mod.getGlobalDispatcher()
  if (proxyState.installed !== undefined) Promise.resolve(proxyState.installed.close?.()).catch(() => {})
  mod.setGlobalDispatcher(dispatcher)
  proxyState.mode = mode
  proxyState.url = effective
  proxyState.noProxy = list
  proxyState.installed = dispatcher
  syncProxyEnv(exportEnv === false ? 'direct' : 'manual', effective, list)
  const rules = list.length > 0 ? `, ${list.length} bypass rule(s)` : ''
  const socksNote = protocol === 'socks5' ? '; SOCKS5 ignores the bypass list' : ''
  return `${mode}: routing global fetch through ${redactProxy(effective)}${rules}${socksNote}${exportEnv === false ? '' : '; proxy variables exported to child processes'}`
}

/** Текущее состояние маршрута словами. */
async function proxyStatus() {
  const mod = await loadUndici()
  const savedExists = readSettingsFile() !== undefined
  const env = ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'http_proxy', 'https_proxy', 'all_proxy']
    .filter((key) => (process.env[key] ?? '') !== '')
    .map((key) => `${key}=${redactProxy(process.env[key])}`)
  const lines = [
    `mode: ${proxyState.mode}`,
    proxyState.url === undefined ? 'proxy: none (direct)' : `proxy: ${redactProxy(proxyState.url)}`,
    proxyState.noProxy.length > 0 ? `bypass: ${proxyState.noProxy.join(', ')}` : 'bypass: none',
    proxyState.candidates.length > 0
      ? `candidates (${proxyState.candidates.length}): ${proxyState.candidates.map((entry) => `${entry.name === undefined ? '' : `${entry.name} `}${redactProxy(entry.url)}`).join(', ')}`
      : 'candidates: none',
    proxyState.lastCheck.length > 0
      ? `last check: ${proxyState.lastCheck.map((entry) => `${entry.name === undefined ? '' : `${entry.name} `}${redactProxy(entry.url)} ${entry.ok ? `ok ${entry.ms} ms${entry.country === undefined ? '' : ` ${entry.country}${entry.countryCode === undefined ? '' : ` (${entry.countryCode})`}`}` : `fail (${entry.error})`}`).join('; ')}`
      : 'last check: none',
    `undici: ${mod === null ? 'not installed — an in-process proxy cannot be installed' : 'available'}`,
    `settings file: ${SETTINGS_FILE}${savedExists ? '' : ' (not created yet)'}`,
    env.length > 0 ? `environment: ${env.join(', ')}` : 'environment: no proxy variables',
  ]
  return lines.join('\n')
}

/**
 * Внешний адрес и страна из ответа пробника: `{ip, country}`, `{query, country,
 * countryCode}` или просто текст с адресом.
 * @param body - тело ответа пробника (JSON или текст).
 * @returns `{ exit?, country?, countryCode? }`.
 */
function readExitPlace(body) {
  const text = String(body ?? '').trim()
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch {
    parsed = undefined
  }
  if (parsed !== undefined && parsed !== null && typeof parsed === 'object') {
    const rawExit = parsed.ip ?? parsed.query ?? parsed.origin
    const exit = typeof rawExit === 'string' && rawExit !== '' ? rawExit.split(',')[0].trim() : undefined
    const rawCountry = parsed.country ?? parsed.country_name ?? parsed.countryName
    const rawCode = parsed.countryCode ?? parsed.country_code ?? parsed.country_iso ?? parsed.countryISO
    const code = typeof rawCode === 'string' && rawCode !== '' ? rawCode.toUpperCase() : (/^[A-Za-z]{2}$/.test(String(rawCountry ?? '')) ? String(rawCountry).toUpperCase() : undefined)
    // Однобуквенных «названий стран» не бывает: код берём из countryCode, из country — только полное имя.
    const name = typeof rawCountry === 'string' && !/^[A-Za-z]{2}$/.test(rawCountry) ? rawCountry : undefined
    const country = name ?? (code === undefined ? undefined : code)
    return {
      ...exit === undefined ? {} : { exit },
      ...country === undefined ? {} : { country },
      ...code === undefined || name === undefined ? {} : { countryCode: code },
    }
  }
  const match = text.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/)
  return match === null ? {} : { exit: match[0] }
}

/**
 * Проверить один прокси: живой ли он, за сколько миллисекунд отвечает и какой
 * внешний адрес видит мир. Меряется полный путь — запрос через туннель прокси,
 * поэтому «пинг» здесь честный: это время до ответа сайта, а не до порта.
 * @param url - адрес прокси.
 * @param options - `{ timeoutMs, probeUrl }`.
 * @returns `{ url, ok, ms, status?, exit?, error? }`.
 */
export async function probeProxy(url, options = {}) {
  const mod = await loadUndici()
  if (mod === null) {
    throw new Error('proxy_switch: the "undici" package is not installed for this plugin, so a proxy cannot be checked — install undici (npm i undici) next to the plugin')
  }
  const timeoutMs = Number.isInteger(options.timeoutMs) && options.timeoutMs > 0 ? options.timeoutMs : DEFAULT_PROBE_TIMEOUT_MS
  const explicit = typeof options.probeUrl === 'string' && options.probeUrl.trim() !== '' ? options.probeUrl.trim() : undefined
  const probeUrls = explicit === undefined ? DEFAULT_PROBE_URLS : [explicit]
  const agent = new mod.EnvHttpProxyAgent({ httpProxy: url, httpsProxy: url, noProxy: '' })
  let last = { url, ok: false, ms: 0, error: 'no probe was attempted' }
  try {
    for (const probeUrl of probeUrls) {
      const started = performance.now()
      try {
        const response = await mod.fetch(probeUrl, {
          dispatcher: agent,
          signal: AbortSignal.timeout(timeoutMs),
          headers: { accept: 'application/json, text/plain, */*' },
        })
        const ms = Math.round(performance.now() - started)
        const body = (await response.text()).slice(0, 400)
        if (!response.ok) {
          last = { url, ok: false, ms, status: response.status, error: `HTTP ${response.status}`, probe: probeUrl }
          continue
        }
        const place = readExitPlace(body)
        last = { url, ok: true, ms, status: response.status, probe: probeUrl, ...place }
        // Первый же ответивший пробник закрывает вопрос: цепочка нужна только на сбой.
        if (place.exit !== undefined || place.country !== undefined) break
      } catch (error) {
        const ms = Math.round(performance.now() - started)
        const reason = error?.name === 'TimeoutError' || error?.name === 'AbortError'
          ? `no answer within ${timeoutMs} ms`
          : (error?.cause?.message ?? error?.message ?? String(error))
        last = { url, ok: false, ms, error: reason, probe: probeUrl }
      }
    }
    return last
  } finally {
    Promise.resolve(agent.close?.()).catch(() => {})
  }
}

/** Кандидаты для проверки: аргумент, список из конфига или текущий адрес. */
function readCandidates(args) {
  if (Array.isArray(args.targets) && args.targets.length > 0) {
    return args.targets.map((entry, index) => readProxySpec(entry, `#${index + 1}`))
  }
  if (Array.isArray(args.proxies) && args.proxies.length > 0) {
    return args.proxies.map((entry, index) => readProxySpec(entry, `#${index + 1}`))
  }
  if (proxyState.candidates.length > 0) return proxyState.candidates.map((entry) => ({ ...entry }))
  return proxyState.url === undefined ? [] : [{ name: 'текущий', url: proxyState.url }]
}

/** Строка отчёта об одном прокси: имя, адрес, время, внешний адрес и страна. */
function reportProxy(entry, index) {
  const label = `${index + 1}. ${entry.name === undefined ? '' : `${entry.name} — `}${redactProxy(entry.url)}`
  if (!entry.ok) return `${label} — нет ответа за ${entry.ms} мс (${entry.error})`
  const place = [
    entry.exit === undefined ? '' : `внешний IP ${entry.exit}`,
    entry.country === undefined ? '' : `страна ${entry.country}${entry.countryCode === undefined ? '' : ` (${entry.countryCode})`}`,
  ].filter(Boolean).join(', ')
  return `${label} — живой, ${entry.ms} мс${place === '' ? '' : `, ${place}`}`
}

/** Действия инструмента proxy_switch. */
async function runProxy(args) {
  if (args.action === 'help') return { text: await readInstructions(args.lang, 'proxy') }
  if (args.action === 'status') return { text: await proxyStatus() }
  if (args.action === 'off') return { text: await switchProxy('direct') }
  if (args.action === 'env') return { text: await switchProxy('system', undefined, readNoProxyList(args.noProxy), args.export_env !== false) }
  if (args.action === 'set') {
    // Адрес можно дать строкой целиком или по частям — как удобнее.
    const url = args.proxy === undefined ? buildProxyUrl(args) : readProxyUrl(args.proxy)
    return { text: await switchProxy('manual', url, readNoProxyList(args.noProxy), args.export_env !== false) }
  }
  if (args.action === 'check') {
    const list = readCandidates(args)
    if (list.length === 0) {
      throw new Error('proxy_switch: nothing to check — pass "targets" (host/port/user/password per proxy) or "proxies" (URLs), or put a list into the plugin config as proxy.candidates')
    }
    const results = []
    // Проверяем по очереди: параллельные запросы исказили бы замер времени.
    for (const spec of list) {
      const outcome = await probeProxy(spec.url, { timeoutMs: args.timeout_ms, probeUrl: args.probe_url })
      results.push({ ...outcome, name: spec.name })
    }
    proxyState.lastCheck = results
    const alive = results.filter((entry) => entry.ok).sort((left, right) => left.ms - right.ms)
    const lines = results.map((entry, index) => reportProxy(entry, index))
    const verdict = alive.length === 0
      ? 'Ни один прокси не ответил — менять маршрут не на что.'
      : `Быстрейший: ${alive[0].name === undefined ? '' : `${alive[0].name} — `}${redactProxy(alive[0].url)} (${alive[0].ms} мс${alive[0].country === undefined ? '' : `, ${alive[0].country}`}).`
    let tail = ''
    if (args.choose === true) {
      if (alive.length === 0) tail = ' Переключение пропущено.'
      else tail = ` Включил его: ${await switchProxy('manual', alive[0].url, readNoProxyList(args.noProxy), args.export_env !== false)}`
    } else if (alive.length > 0) {
      tail = ` Чтобы пойти через него: повторите с "choose": true или задайте адрес по частям (host/port/user/password).`
    }
    return { text: `Проверка прокси (${results.length}):\n${lines.join('\n')}\n${verdict}${tail}` }
  }
  throw new Error(`proxy_switch: unknown action ${JSON.stringify(args.action)}; use help, status, check, set, env or off`)
}

/** Список хостов, идущих напрямую. */
function readNoProxyList(value) {
  if (value === undefined) return ['localhost', '127.0.0.1', '[::1]']
  if (!Array.isArray(value)) throw new Error('proxy_switch: "noProxy" must be an array of host names')
  return value.map((entry) => String(entry).trim()).filter((entry) => entry !== '')
}

/** Схема аргументов инструмента `proxy_switch`. */
const PROXY_PARAMETERS = {
  type: 'object',
  additionalProperties: false,
  required: ['action'],
  properties: {
    action: {
      type: 'string',
      enum: ['help', 'status', 'check', 'set', 'env', 'off'],
      description: 'help — read the proxy instructions; status — show the current route, the candidates and the last check; check — test candidate proxies and report latency (add "choose": true to switch to the fastest); set — route through the given proxy URL; env — follow HTTP_PROXY/HTTPS_PROXY/ALL_PROXY from the environment; off — go direct again.',
    },
    proxy: { type: 'string', description: 'Action "set": the whole proxy URL at once, http://user:password@host:port. Instead of it you may fill the parts separately: protocol/host/port/user/password.' },
    protocol: { type: 'string', enum: ['http', 'https', 'socks5'], description: 'Action "set": proxy protocol when the address is given as parts - http, https or socks5 (default http).' },
    host: { type: 'string', description: 'Action "set": proxy host or IP without a scheme — the port and credentials go into their own fields.' },
    port: { type: 'integer', description: 'Action "set": proxy port, 1…65535 (omit when the proxy uses the protocol default).' },
    user: { type: 'string', description: 'Action "set": proxy login when the proxy asks for one.' },
    password: { type: 'string', description: 'Action "set": proxy password, kept out of the logs and answers.' },
    proxies: { type: 'array', description: 'Action "check": proxy URLs to test (default: the candidates from the plugin config, then the current proxy). Each is tried through a real request, so the reported time is the full round trip.', items: { type: 'string' } },
    targets: {
      type: 'array',
      description: 'Action "check": proxies given as parts — each entry has its own host, port, login and password. Takes precedence over "proxies".',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string', description: 'Label for this proxy, echoed in the report.' },
          protocol: { type: 'string', enum: ['http', 'https'], description: 'Protocol (default http).' },
          host: { type: 'string', description: 'Host or IP without a scheme.' },
          port: { type: 'integer', description: 'Port, 1…65535.' },
          user: { type: 'string', description: 'Login.' },
          password: { type: 'string', description: 'Password.' },
        },
      },
    },
    choose: { type: 'boolean', description: 'Action "check": switch to the fastest proxy that answered (default false — the report alone changes nothing).' },
    timeout_ms: { type: 'integer', description: `Action "check": per-proxy timeout in milliseconds (default ${DEFAULT_PROBE_TIMEOUT_MS}).` },
    probe_url: { type: 'string', description: 'Action "check": tiny URL fetched through each proxy to prove it works and to read the exit address and country (default: a country lookup service).' },
    noProxy: { type: 'array', description: 'Hosts that must stay direct (default: localhost, 127.0.0.1, [::1]).', items: { type: 'string' } },
    export_env: { type: 'boolean', description: 'Also export HTTP(S)_PROXY/NO_PROXY to child processes (default true).' },
    lang: { type: 'string', enum: ['ru', 'en'], description: 'Language of the "help" text (default ru).' },
  },
}

/** Описание инструмента `proxy_switch` для модели. */
const PROXY_DESCRIPTION = [
  'Choose the outbound proxy for this Harness process: show the current route, test a list of candidate proxies and pick the fastest, switch to your own HTTP(S) proxy, follow the proxy from the environment, or go direct again.',
  '"check" measures each candidate with a real request through it (latency plus the exit address) and reports which ones answer; add "choose": true to switch to the fastest one.',
  'HTTP(S) and SOCKS5 are supported (a SOCKS5 proxy has no bypass list). No proxy is bundled with this plugin and none is configured by default — every request goes out directly until you or the user supply an address.',
  'Switching takes effect immediately for every in-process request (models, search, HTTP MCP) and, unless disabled, exports the same variables to child processes.',
  'The same proxy has its own settings page in the Harness UI (Settings -> the proxy page): fill in the parts there, switch the route and check candidates with a real request; the page and this tool share one engine.',
].join(' ')

/** Схема результата: короткий текст. */
const PROXY_OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: { type: 'string', description: 'Short report of what the proxy action did.' },
  },
}

/* ------------------------------------------- СТРАНИЦА НАСТРОЙКИ ПРОКСИ --- */

/** Разобрать адрес в части для страницы: без пароля, но с признаком «пароль есть». */
function proxyParts(url) {
  try {
    const parsed = new URL(url)
    return {
      protocol: readProxyProtocol(url),
      host: parsed.hostname,
      ...parsed.port === '' ? {} : { port: Number(parsed.port) },
      ...parsed.username === '' ? {} : { user: decodeURIComponent(parsed.username) },
      hasPassword: parsed.password !== '',
    }
  } catch {
    return {}
  }
}

/** Снимок состояния прокси для страницы настроек — без паролей и без самих секретов. */
function proxyUiSnapshot() {
  return {
    mode: proxyState.mode,
    ...proxyState.url === undefined ? {} : { current: proxyParts(proxyState.url) },
    currentLabel: proxyState.url === undefined ? undefined : redactProxy(proxyState.url),
    noProxy: proxyState.noProxy,
    candidates: proxyState.candidates.map((entry) => ({ name: entry.name, ...proxyParts(entry.url) })),
    lastCheck: proxyState.lastCheck.map((entry) => ({
      name: entry.name,
      label: redactProxy(entry.url),
      ok: entry.ok,
      ms: entry.ms,
      ...entry.exit === undefined ? {} : { exit: entry.exit },
      ...entry.country === undefined ? {} : { country: entry.country },
      ...entry.countryCode === undefined ? {} : { countryCode: entry.countryCode },
      ...entry.error === undefined ? {} : { error: entry.error },
    })),
    settingsFile: SETTINGS_FILE,
    protocols: PROXY_PROTOCOLS,
    ...proxyState.settingsError === undefined ? {} : { settingsError: proxyState.settingsError },
  }
}

/** Прочитать файл настроек прокси (undefined, если файла ещё нет). */
function readSettingsFile() {
  let text
  try {
    text = readFileSync(SETTINGS_FILE, 'utf8')
  } catch (error) {
    if (error?.code !== 'ENOENT') proxyState.settingsError = `cannot read ${SETTINGS_FILE}: ${error?.message ?? error}`
    return undefined
  }
  try {
    const parsed = JSON.parse(text)
    return parsed !== null && typeof parsed === 'object' ? parsed : undefined
  } catch (error) {
    proxyState.settingsError = `cannot parse ${SETTINGS_FILE}: ${error?.message ?? error}`
    return undefined
  }
}

/** Записать файл настроек прокси (в профиле пользователя, не в пакете). */
function writeSettingsFile(settings) {
  mkdirSync(dirname(SETTINGS_FILE), { recursive: true })
  writeFileSync(SETTINGS_FILE, `${JSON.stringify(settings, null, 2)}\n`, 'utf8')
}

/** Стереть файл настроек (возврат к «как поставили»). */
function removeSettingsFile() {
  try {
    rmSync(SETTINGS_FILE, { force: true })
  } catch {
    /* файла нет — и хорошо */
  }
}

/** Список хостов обхода из строки или массива. */
function normalizeNoProxy(value) {
  if (Array.isArray(value)) return value.map((entry) => String(entry).trim()).filter((entry) => entry !== '')
  return String(value ?? '').split(/[\s,;]+/).map((entry) => entry.trim()).filter((entry) => entry !== '')
}

/**
 * Привести присланные страницей настройки к сохраняемому виду.
 * Пароль страница никогда не получает, поэтому пустой пароль при том же
 * host/port/user означает «оставить прежний», а не «стереть».
 * @param input - то, что прислала страница.
 * @param previous - прежние сохранённые настройки.
 */
function normalizeProxySettings(input, previous = {}) {
  const enabled = input?.enabled !== false
  const mode = ['manual', 'system', 'direct'].includes(input?.mode) ? input.mode : (enabled ? 'manual' : 'direct')
  const protocol = PROXY_PROTOCOLS.includes(String(input?.protocol ?? 'http').toLowerCase())
    ? String(input.protocol ?? 'http').toLowerCase()
    : 'http'
  const host = String(input?.host ?? '').trim()
  const port = input?.port === undefined || input?.port === null || input?.port === '' ? undefined : Number(input.port)
  const user = String(input?.user ?? '').trim()
  let password = input?.password === undefined || input?.password === null ? '' : String(input.password)
  if (password === '' && typeof previous.url === 'string') {
    const old = proxyParts(previous.url)
    const sameTarget = old.host === host && old.port === port && (old.user ?? '') === user
    if (sameTarget && old.hasPassword === true) password = decodeURIComponent(new URL(previous.url).password)
  }
  const settings = {
    enabled,
    mode,
    protocol,
    host,
    ...port === undefined ? {} : { port },
    ...user === '' ? {} : { user },
    noProxy: normalizeNoProxy(input?.noProxy),
    exportEnv: input?.exportEnv !== false,
    candidates: (Array.isArray(input?.candidates) ? input.candidates : []).map((entry, index) => {
      const spec = readProxySpec(entry, `#${index + 1}`)
      return { name: spec.name, url: spec.url }
    }),
  }
  if (password !== '') settings.password = password
  if (host !== '') settings.url = buildProxyUrl({ protocol, host, port, user, password })
  return settings
}

/** Применить настройки: обновить кандидатов и поставить маршрут. */
async function applyProxySettings(settings) {
  proxyState.candidates = (settings.candidates ?? []).map((entry, index) => readProxySpec(entry, `#${index + 1}`))
  const noProxy = readNoProxyList(settings.noProxy)
  if (settings.enabled === false || settings.mode === 'direct') return switchProxy('direct')
  if (settings.mode === 'system') return switchProxy('system', undefined, noProxy, settings.exportEnv !== false)
  const url = typeof settings.url === 'string' && settings.url !== ''
    ? readProxyUrl(settings.url)
    : buildProxyUrl({ protocol: settings.protocol, host: settings.host, port: settings.port, user: settings.user, password: settings.password })
  if (settings.host === undefined || settings.host === '') {
    throw new Error('proxy_switch: "host" is required to switch the proxy on — fill it in on the proxy settings page')
  }
  return switchProxy('manual', url, noProxy, settings.exportEnv !== false)
}

/** Ответ JSON странице. */
function sendJson(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  response.end(JSON.stringify(payload))
}

/** Тело POST-запроса как JSON (пустое тело — пустой объект). */
async function readJsonBody(request) {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  const text = Buffer.concat(chunks).toString('utf8').trim()
  return text === '' ? {} : JSON.parse(text)
}

/**
 * Смонтировать HTTP-маршруты страницы настроек прокси.
 * Страница берёт отсюда состояние и проверку по пингу, а сохраняет настройки
 * в файл профиля. Если сервиса `webServer` в сборке нет, маршруты не появятся,
 * а инструмент `proxy_switch` продолжит работать как обычно.
 * @param ctx - контекст плагина.
 */
export function registerProxyRoutes(ctx) {
  // В нестандартной сборке (или в тесте) сервиса маршрутов может не быть —
  // тогда инструмент работает как обычно, просто без страницы настроек.
  if (typeof ctx?.inject !== 'function') return
  const base = '/api/rus-image-percent-gen/proxy'
  ctx.inject(['webServer'], (wctx) => {
    wctx.effect(() => {
      const routes = [
        {
          kind: 'exact',
          path: base,
          handler: async (request, response) => {
            if (request.method !== 'GET' && request.method !== 'HEAD') {
              sendJson(response, 405, { ok: false, error: 'use GET' })
              return
            }
            sendJson(response, 200, { ok: true, state: proxyUiSnapshot(), settings: readSettingsFile() ?? null })
          },
        },
        {
          kind: 'exact',
          path: `${base}/save`,
          handler: async (request, response) => {
            if (request.method !== 'POST') {
              sendJson(response, 405, { ok: false, error: 'use POST' })
              return
            }
            try {
              const body = await readJsonBody(request)
              const previous = readSettingsFile() ?? {}
              const settings = normalizeProxySettings(body, previous)
              const message = await applyProxySettings(settings)
              writeSettingsFile(settings)
              proxyState.settingsError = undefined
              sendJson(response, 200, { ok: true, message, settings, state: proxyUiSnapshot() })
            } catch (error) {
              sendJson(response, 400, { ok: false, error: error?.message ?? String(error), state: proxyUiSnapshot() })
            }
          },
        },
        {
          kind: 'exact',
          path: `${base}/check`,
          handler: async (request, response) => {
            if (request.method !== 'POST') {
              sendJson(response, 405, { ok: false, error: 'use POST' })
              return
            }
            try {
              const body = await readJsonBody(request)
              const list = proxyState.candidates.length > 0
                ? proxyState.candidates.map((entry) => ({ ...entry }))
                : (proxyState.url === undefined ? [] : [{ name: 'текущий', url: proxyState.url }])
              if (list.length === 0) {
                sendJson(response, 400, { ok: false, error: 'ни одного адреса для проверки: заполните кандидатов или включите прокси' })
                return
              }
              const results = []
              // По очереди: параллельные запросы делят канал и врут по времени.
              for (const spec of list) {
                const outcome = await probeProxy(spec.url, { timeoutMs: Number(body.timeout_ms) > 0 ? Math.floor(Number(body.timeout_ms)) : undefined })
                results.push({ ...outcome, name: spec.name })
              }
              proxyState.lastCheck = results
              const alive = results.filter((entry) => entry.ok).sort((left, right) => left.ms - right.ms)
              let message
              if (body.choose === true && alive.length > 0) {
                const saved = readSettingsFile() ?? {}
                const chosen = readProxySpec(alive[0], alive[0].name)
                message = await switchProxy('manual', chosen.url, readNoProxyList(saved.noProxy), saved.exportEnv !== false)
              }
              sendJson(response, 200, { ok: true, results, ...message === undefined ? {} : { message }, state: proxyUiSnapshot() })
            } catch (error) {
              sendJson(response, 400, { ok: false, error: error?.message ?? String(error), state: proxyUiSnapshot() })
            }
          },
        },
        {
          kind: 'exact',
          path: `${base}/on`,
          handler: async (request, response) => {
            if (request.method !== 'POST') {
              sendJson(response, 405, { ok: false, error: 'use POST' })
              return
            }
            try {
              // Включаем по сохранённым настройкам: кнопке в интерфейсе не нужно
              // присылать адрес заново, а пароль вообще не покидает host-половину.
              const saved = readSettingsFile()
              if (saved === undefined) {
                throw new Error('адрес прокси ещё не задан — откройте Настройки → Прокси и впишите части адреса')
              }
              const message = await applyProxySettings({ ...saved, enabled: true, mode: saved.mode === 'system' ? 'system' : 'manual' })
              writeSettingsFile({ ...saved, enabled: true, mode: saved.mode === 'system' ? 'system' : 'manual' })
              sendJson(response, 200, { ok: true, message, state: proxyUiSnapshot() })
            } catch (error) {
              sendJson(response, 400, { ok: false, error: error?.message ?? String(error), state: proxyUiSnapshot() })
            }
          },
        },
        {
          kind: 'exact',
          path: `${base}/off`,
          handler: async (request, response) => {
            if (request.method !== 'POST') {
              sendJson(response, 405, { ok: false, error: 'use POST' })
              return
            }
            try {
              const previous = readSettingsFile()
              const message = await switchProxy('direct')
              if (previous !== undefined) writeSettingsFile({ ...previous, enabled: false, mode: 'direct' })
              sendJson(response, 200, { ok: true, message, state: proxyUiSnapshot() })
            } catch (error) {
              sendJson(response, 400, { ok: false, error: error?.message ?? String(error) })
            }
          },
        },
        {
          kind: 'exact',
          path: `${base}/forget`,
          handler: async (request, response) => {
            if (request.method !== 'POST') {
              sendJson(response, 405, { ok: false, error: 'use POST' })
              return
            }
            removeSettingsFile()
            sendJson(response, 200, { ok: true, message: 'настройки прокси стёрты', state: proxyUiSnapshot() })
          },
        },
      ]
      const disposers = routes.map((route) => wctx.webServer.register(route))
      return () => disposers.forEach((dispose) => dispose())
    }, 'rus-image-percent-gen: proxy settings routes')
  })
}

/**
 * Смонтировать инструмент выбора прокси.
 * @param ctx - контекст плагина (сервис `tools` уже доступен).
 * @param config - конфиг записи: необязательный `proxy: { enabled, url, candidates, noProxy, exportEnv }`.
 *   Прокси по умолчанию НЕ включён и НЕ вписан: без `url` маршрут остаётся прямым.
 *   `candidates` — список для `check`; каждый элемент либо строка-адрес, либо объект
 *   частей `{ name, protocol, host, port, user, password }`.
 */
export function apply(ctx, config = {}) {
  ctx.effect(() => ctx.tools.register({
    name: 'proxy_switch',
    description: PROXY_DESCRIPTION,
    parameters: PROXY_PARAMETERS,
    output: {
      schema: PROXY_OUTPUT_SCHEMA,
      render: (_args, value) => [{ type: 'text', text: value.text }],
    },
    isConcurrencySafe: () => false,
    async execute(args) {
      return runProxy(args)
    },
  }), 'rus-image-percent-gen: proxy_switch tool')

  // Список кандидатов из конфига — основа для действия `check`.
  const configured = Array.isArray(config?.proxy?.candidates) ? config.proxy.candidates : []
  for (const [index, entry] of configured.entries()) {
    try {
      const spec = readProxySpec(entry, `#${index + 1}`)
      if (!proxyState.candidates.some((known) => known.url === spec.url)) proxyState.candidates.push(spec)
    } catch (error) {
      ctx.logger?.error?.(`rus-image-percent-gen: skipping a bad proxy candidate — ${error.message}`)
    }
  }

  // Маршруты страницы настроек прокси (если в сборке есть webServer).
  registerProxyRoutes(ctx)

  // Что включать при запуске: файл настроек со страницы сильнее конфига записи,
  // потому что его правит сам пользователь в интерфейсе.
  const saved = readSettingsFile()
  if (saved !== undefined) {
    ctx.effect(() => {
      applyProxySettings(saved)
        .then((text) => ctx.logger?.info?.(`rus-image-percent-gen: proxy settings file — ${text}`))
        .catch((error) => ctx.logger?.error?.(`rus-image-percent-gen: cannot apply the saved proxy settings — ${error.message}`))
      return () => {
        switchProxy('direct').catch(() => {})
      }
    }, 'rus-image-percent-gen: saved proxy settings')
    return
  }

  // Адрес из конфига применяется при запуске; без него маршрут остаётся прямым.
  const startup = config?.proxy
  if (startup !== undefined && startup !== null && startup.enabled !== false && typeof startup.url === 'string' && startup.url.trim() !== '') {
    ctx.effect(() => {
      switchProxy('manual', readProxyUrl(startup.url), readNoProxyList(startup.noProxy), startup.exportEnv !== false)
        .then((text) => ctx.logger?.info?.(`rus-image-percent-gen: ${text}`))
        .catch((error) => ctx.logger?.error?.(`rus-image-percent-gen: cannot apply the configured proxy — ${error.message}`))
      return () => {
        switchProxy('direct').catch(() => {})
      }
    }, 'rus-image-percent-gen: configured proxy')
  }
}
