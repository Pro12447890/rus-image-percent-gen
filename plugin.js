/**
 * rus-image-percent-gen — плагин пиксель-арта для DeepSeek Harness.
 *
 * Даёт агенту инструмент `pixel_art`: холст от 4×4 до 256×256, покраска
 * по одному пикселю цветом RGB + альфа, рисование ASCII-сеткой по палитре,
 * текстовый дамп холста (чтобы «думать» без зрения), предпросмотр PNG в
 * увеличении ×5 (×3, если сторона ≥ 128) и финальный экспорт PNG в файл.
 *
 * Плагин намеренно НЕ импортирует пакеты DSH: определение инструмента
 * собирается вручную (JSON Schema вместо DSL `defineTool`), PNG кодируется
 * на встроенном `node:zlib`. Поэтому он ставится в любой профиль без
 * зависимостей — нужны только сервисы `tools` и (для картинок) `attachments`.
 * Выбор прокси живёт отдельной записью в `proxy.js`.
 */
import { deflateSync } from 'node:zlib'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join, resolve as resolvePath } from 'node:path'
import { readInstructions } from './shared.js'
import { apply as applyProxyTool } from './proxy.js'

/** Имя плагина в дереве Cordis. */
export const name = 'rus-image-percent-gen'
/** Инструмент регистрируется в реестре `ctx.tools`. */
export const inject = ['tools']
/** Границы холста из задания. */
const MIN_SIDE = 4
const MAX_SIDE = 256
/** Увеличение предпросмотра: обычное и для крупных холстов. */
const PREVIEW_SCALE = 5
const BIG_SIDE = 128
const BIG_PREVIEW_SCALE = 3
/** Потолок предпросмотра, если сервис вложений не сообщил свои лимиты. */
const FALLBACK_MAX_DIMENSION = 1024
const FALLBACK_MAX_PIXELS = 4 * 1024 * 1024
/** Сколько разных цветов помещается в текстовый дамп. */
const DUMP_SYMBOLS = '#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/* ------------------------------------------------------------------ PNG --- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

/** CRC32 по стандарту PNG. */
function crc32(bytes) {
  let crc = -1
  for (let i = 0; i < bytes.length; i += 1) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ -1) >>> 0
}

/** Один чанк PNG: длина, тип, данные, CRC. */
function pngChunk(type, body) {
  const head = Buffer.alloc(8)
  head.writeUInt32BE(body.length, 0)
  head.write(type, 4, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), body])), 0)
  return Buffer.concat([head, body, crc])
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

/**
 * Закодировать RGBA-растр в PNG (8 бит на канал, без интерлейса).
 * @param width - ширина в пикселях.
 * @param height - высота в пикселях.
 * @param rgba - байты длиной width*height*4.
 * @returns готовый файл PNG.
 */
function encodePng(width, height, rgba) {
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  const source = Buffer.from(rgba.buffer, rgba.byteOffset, rgba.byteLength)
  for (let y = 0; y < height; y += 1) {
    const target = y * (stride + 1)
    raw[target] = 0 // фильтр 0 (None) — для пиксель-арта он же и самый компактный
    source.copy(raw, target + 1, y * stride, y * stride + stride)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // бит на канал
  ihdr[9] = 6 // цветовой тип RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

/**
 * Увеличить растр целым множителем (только NEAREST — пиксель-арт нельзя сглаживать).
 * @param width - исходная ширина.
 * @param height - исходная высота.
 * @param rgba - исходные байты.
 * @param factor - целый множитель.
 * @returns растр увеличенного размера.
 */
function scaleNearest(width, height, rgba, factor) {
  const outWidth = width * factor
  const outHeight = height * factor
  const out = new Uint8Array(outWidth * outHeight * 4)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const si = (y * width + x) * 4
      for (let dy = 0; dy < factor; dy += 1) {
        let ti = ((y * factor + dy) * outWidth + x * factor) * 4
        for (let dx = 0; dx < factor; dx += 1) {
          out[ti] = rgba[si]
          out[ti + 1] = rgba[si + 1]
          out[ti + 2] = rgba[si + 2]
          out[ti + 3] = rgba[si + 3]
          ti += 4
        }
      }
    }
  }
  return { width: outWidth, height: outHeight, data: out }
}

/* ---------------------------------------------------------------- цвета --- */

const NAMED_COLORS = {
  transparent: [0, 0, 0, 0],
  none: [0, 0, 0, 0],
  black: [0, 0, 0, 255],
  white: [255, 255, 255, 255],
  red: [255, 0, 0, 255],
  green: [0, 128, 0, 255],
  lime: [0, 255, 0, 255],
  blue: [0, 0, 255, 255],
  yellow: [255, 255, 0, 255],
  cyan: [0, 255, 255, 255],
  magenta: [255, 0, 255, 255],
  gray: [128, 128, 128, 255],
  grey: [128, 128, 128, 255],
  silver: [192, 192, 192, 255],
  orange: [255, 165, 0, 255],
  brown: [165, 42, 42, 255],
  pink: [255, 192, 203, 255],
  purple: [128, 0, 128, 255],
  navy: [0, 0, 128, 255],
  teal: [0, 128, 128, 255],
  gold: [255, 215, 0, 255],
  sky: [135, 206, 235, 255],
  skin: [255, 205, 148, 255],
}

/** Ограничить число диапазоном 0…255. */
function clampByte(value, what) {
  const number = typeof value === 'string' ? Number(value.trim()) : value
  if (typeof number !== 'number' || !Number.isFinite(number)) {
    throw new Error(`pixel_art: ${what} must be a number from 0 to 255, got ${JSON.stringify(value)}`)
  }
  return Math.max(0, Math.min(255, Math.round(number)))
}

/**
 * Разобрать цвет: `#rgb`, `#rrggbb`, `#rrggbbaa`, `r,g,b[,a]`, имя цвета или
 * массив `[r,g,b(,a)]`. Возвращает RGBA-байты.
 * @param value - описание цвета из аргументов инструмента.
 * @param fallbackAlpha - альфа, если она не задана явно.
 * @returns четыре байта RGBA.
 */
function parseColor(value, fallbackAlpha = 255) {
  if (Array.isArray(value)) {
    const [r, g, b, a] = value
    return [clampByte(r, 'red'), clampByte(g, 'green'), clampByte(b, 'blue'), a === undefined ? clampByte(fallbackAlpha, 'alpha') : clampByte(a, 'alpha')]
  }
  if (typeof value !== 'string') throw new Error(`pixel_art: colour must be a string or an array, got ${JSON.stringify(value)}`)
  const text = value.trim()
  if (text === '') throw new Error('pixel_art: colour is an empty string')
  const named = NAMED_COLORS[text.toLowerCase()]
  if (named !== undefined) return [...named]
  if (text.startsWith('#')) {
    const hex = text.slice(1)
    if (/^[0-9a-f]{3}$/i.test(hex)) {
      return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16), clampByte(fallbackAlpha, 'alpha')]
    }
    if (/^[0-9a-f]{4}$/i.test(hex)) {
      return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16), parseInt(hex[3] + hex[3], 16)]
    }
    if (/^[0-9a-f]{6}$/i.test(hex)) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), clampByte(fallbackAlpha, 'alpha')]
    }
    if (/^[0-9a-f]{8}$/i.test(hex)) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), parseInt(hex.slice(6, 8), 16)]
    }
    throw new Error(`pixel_art: cannot read colour "${text}"; use #rgb, #rrggbb, #rrggbbaa or "r,g,b[,a]"`)
  }
  const parts = text.split(',').map((part) => part.trim())
  if (parts.length === 3 || parts.length === 4) {
    return [clampByte(parts[0], 'red'), clampByte(parts[1], 'green'), clampByte(parts[2], 'blue'), parts[3] === undefined ? clampByte(fallbackAlpha, 'alpha') : clampByte(parts[3], 'alpha')]
  }
  throw new Error(`pixel_art: cannot read colour "${text}"; use #rgb, #rrggbb, #rrggbbaa, "r,g,b[,a]" or a colour name`)
}

/** Цвет в `#rrggbb` для легенды. */
function toHex(rgba) {
  const hex = (n) => n.toString(16).padStart(2, '0')
  return `#${hex(rgba[0])}${hex(rgba[1])}${hex(rgba[2])}`
}

/* ---------------------------------------------------------------- холст --- */

/** Холст пиксель-арта: RGBA-растр фиксированного размера. */
class PixelCanvas {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.data = new Uint8Array(width * height * 4)
  }

  /** Лежит ли точка внутри холста. */
  inside(x, y) {
    return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < this.width && y < this.height
  }

  /** Поставить один пиксель; вне холста — молча пропустить (удобно для сеток). */
  put(x, y, rgba) {
    if (!this.inside(x, y)) return false
    const index = (y * this.width + x) * 4
    this.data[index] = rgba[0]
    this.data[index + 1] = rgba[1]
    this.data[index + 2] = rgba[2]
    this.data[index + 3] = rgba[3]
    return true
  }

  /** Прочитать пиксель как `[r,g,b,a]`. */
  get(x, y) {
    const index = (y * this.width + x) * 4
    return [this.data[index], this.data[index + 1], this.data[index + 2], this.data[index + 3]]
  }

  /** Залить прямоугольник; границы обрезаются по холсту. */
  fill(x, y, w, h, rgba) {
    let painted = 0
    for (let py = y; py < y + h; py += 1) {
      for (let px = x; px < x + w; px += 1) if (this.put(px, py, rgba)) painted += 1
    }
    return painted
  }

  /** Сколько пикселей не полностью прозрачны. */
  opaqueCount() {
    let count = 0
    for (let i = 3; i < this.data.length; i += 4) if (this.data[i] > 0) count += 1
    return count
  }

  /** Палитра холста: уникальные RGBA в порядке появления. */
  palette() {
    const seen = new Map()
    for (let i = 0; i < this.data.length; i += 4) {
      const key = `${this.data[i]},${this.data[i + 1]},${this.data[i + 2]},${this.data[i + 3]}`
      if (!seen.has(key)) seen.set(key, [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]])
    }
    return [...seen.values()]
  }
}

/* ------------------------------------------------------------ состояния --- */

/** Холсты этой сессии хоста: имя -> PixelCanvas. */
const canvases = new Map()

/** Название холста по умолчанию. */
const DEFAULT_CANVAS = 'main'

/** Достать холст или объяснить, что его ещё нет. */
function requireCanvas(args) {
  const key = typeof args.canvas === 'string' && args.canvas.trim() !== '' ? args.canvas.trim() : DEFAULT_CANVAS
  const canvas = canvases.get(key)
  if (canvas === undefined) {
    const known = [...canvases.keys()]
    throw new Error(
      `pixel_art: canvas "${key}" does not exist yet — call {"action":"new","width":W,"height":H${key === DEFAULT_CANVAS ? '' : `,"canvas":"${key}"`}} first`
      + (known.length > 0 ? ` (existing canvases: ${known.join(', ')})` : ''),
    )
  }
  return { key, canvas }
}

/** Размер стороны холста: целое 4…256. */
function readSide(value, what) {
  if (!Number.isInteger(value)) throw new Error(`pixel_art: ${what} must be an integer from ${MIN_SIDE} to ${MAX_SIDE}, got ${JSON.stringify(value)}`)
  if (value < MIN_SIDE || value > MAX_SIDE) throw new Error(`pixel_art: ${what} must be from ${MIN_SIDE} to ${MAX_SIDE}, got ${value}`)
  return value
}

/* ------------------------------------------------------------ черновик --- */

/** Рабочая папка сессии агента, если хост её отдал. */
function sessionCwd(exec) {
  const cwd = exec?.agent?.session?.header?.cwd
  if (typeof cwd === 'string' && cwd.length > 0) return cwd
  return process.cwd()
}

/** Итоговый путь для PNG: аргумент, иначе `<рабочая папка>/pixel-art/...`. */
function resolveSavePath(args, canvas, exec) {
  const name = `${typeof args.canvas === 'string' && args.canvas.trim() !== '' ? args.canvas.trim() : DEFAULT_CANVAS}-${canvas.width}x${canvas.height}`
  const requested = typeof args.path === 'string' && args.path.trim() !== '' ? args.path.trim() : undefined
  if (requested === undefined) return join(sessionCwd(exec), 'pixel-art', `${name}.png`)
  const base = isAbsolute(requested) ? requested : resolvePath(sessionCwd(exec), requested)
  return base.toLowerCase().endsWith('.png') ? base : `${base}.png`
}
/* -------------------------------------------------------------- действия --- */

/** Собрать текстовый дамп холста: сетка символов + легенда палитры. */
function dumpCanvas(key, canvas) {
  const palette = canvas.palette()
  const index = new Map()
  palette.forEach((rgba, position) => {
    index.set(rgba.join(','), position < DUMP_SYMBOLS.length ? DUMP_SYMBOLS[position] : '?')
  })
  const lines = []
  for (let y = 0; y < canvas.height; y += 1) {
    let line = ''
    for (let x = 0; x < canvas.width; x += 1) {
      const rgba = canvas.get(x, y)
      line += rgba[3] === 0 ? '.' : (index.get(rgba.join(',')) ?? '?')
    }
    lines.push(line)
  }
  const legend = palette
    .slice(0, DUMP_SYMBOLS.length)
    .map((rgba, position) => `${DUMP_SYMBOLS[position]} = ${rgba[3] === 0 ? 'transparent' : `${toHex(rgba)}${rgba[3] === 255 ? '' : ` a=${rgba[3]}`}`}`)
  const overflow = palette.length > DUMP_SYMBOLS.length ? `\n(ещё ${palette.length - DUMP_SYMBOLS.length} цветов не поместились в легенду и показаны как "?")` : ''
  return `canvas "${key}" ${canvas.width}×${canvas.height}, colours: ${palette.length}\n\n${lines.join('\n')}\n\nlegend:\n${legend.join('\n')}${overflow}`
}

/** Потолок предпросмотра из лимитов сервиса вложений. */
function previewLimit(attachments) {
  const limits = attachments?.imageLimits
  return {
    maxDimension: Number.isFinite(limits?.maxImageDimension) ? limits.maxImageDimension : FALLBACK_MAX_DIMENSION,
    maxPixels: Number.isFinite(limits?.maxImagePixels) ? limits.maxImagePixels : FALLBACK_MAX_PIXELS,
  }
}

/**
 * Подобрать увеличение предпросмотра: по заданию ×5, для стороны ≥ 128 — ×3,
 * но никогда больше, чем разрешают лимиты вложений.
 * @param canvas - холст.
 * @param requested - явное увеличение из аргументов (необязательно).
 * @param attachments - сервис вложений (необязательно).
 * @returns {{scale: number, clamped: boolean, reason: string}}.
 */
function chooseScale(canvas, requested, attachments) {
  const wanted = Number.isInteger(requested) && requested > 0
    ? requested
    : (Math.max(canvas.width, canvas.height) >= BIG_SIDE ? BIG_PREVIEW_SCALE : PREVIEW_SCALE)
  const { maxDimension, maxPixels } = previewLimit(attachments)
  const byDimension = Math.floor(maxDimension / Math.max(canvas.width, canvas.height))
  const byPixels = Math.floor(Math.sqrt(maxPixels / (canvas.width * canvas.height)))
  const ceiling = Math.max(1, Math.min(byDimension, byPixels))
  const scale = Math.max(1, Math.min(wanted, ceiling))
  return {
    scale,
    clamped: scale !== wanted,
    reason: scale !== wanted ? `увеличение ${wanted}× уменьшено до ${scale}× лимитами вложений (максимум ${maxDimension} px по стороне)` : '',
  }
}

/**
 * Привести ссылку вложения к чистой форме значения результата: ровно те поля,
 * что объявлены в схеме вывода (лишние поля сломали бы строгую проверку).
 * @param ref - ссылка из `attachments.saveImage`.
 * @returns объект значения с картинкой.
 */
function imageValue(ref) {
  return {
    attachmentId: String(ref.attachmentId),
    mediaType: ref.mediaType,
    bytes: ref.bytes,
    width: ref.width,
    height: ref.height,
    ...ref.name === undefined ? {} : { name: ref.name },
  }
}

/** Собрать блок-ответ с картинкой. */
async function imageResult(attachments, canvas, scale, text, fileName) {
  if (attachments === undefined) {
    throw new Error('pixel_art: the deployment has no attachments service, so an image cannot be shown; use action "dump" for a text view or "save" after mounting one')
  }
  const scaled = scale === 1 ? { width: canvas.width, height: canvas.height, data: canvas.data } : scaleNearest(canvas.width, canvas.height, canvas.data, scale)
  const png = encodePng(scaled.width, scaled.height, scaled.data)
  const ref = await attachments.saveImage({ data: new Uint8Array(png), mediaType: 'image/png', name: fileName })
  return { text, image: imageValue(ref) }
}

/** Выполнить действие инструмента. */
async function runAction(args, exec, attachments) {
  const action = args.action

  if (action === 'help') {
    const text = await readInstructions(args.lang)
    return { text }
  }

  if (action === 'new') {
    const width = readSide(args.width, 'width')
    const height = readSide(args.height, 'height')
    const canvas = new PixelCanvas(width, height)
    if (args.background !== undefined) {
      const rgba = parseColor(args.background, 255)
      canvas.fill(0, 0, width, height, rgba)
    }
    const key = typeof args.canvas === 'string' && args.canvas.trim() !== '' ? args.canvas.trim() : DEFAULT_CANVAS
    canvases.set(key, canvas)
    const used = canvas.opaqueCount()
    return {
      text: `canvas "${key}" created: ${width}×${height} px`
        + (args.background !== undefined ? `, background ${typeof args.background === 'string' ? args.background : JSON.stringify(args.background)}` : ', fully transparent')
        + `; non-transparent pixels: ${used}. Paint with action "pixels" (one at a time), "draw" (ASCII grid) or "fill"; look at it with action "preview".`,
    }
  }

  if (action === 'pixels') {
    const { key, canvas } = requireCanvas(args)
    if (!Array.isArray(args.pixels) || args.pixels.length === 0) throw new Error('pixel_art: action "pixels" needs a non-empty "pixels" array of {x, y, color, alpha?}')
    let painted = 0
    const skipped = []
    for (const entry of args.pixels) {
      if (entry === null || typeof entry !== 'object') throw new Error('pixel_art: every entry of "pixels" must be an object {x, y, color, alpha?}')
      const rgba = parseColor(entry.color, entry.alpha === undefined ? 255 : entry.alpha)
      if (canvas.put(entry.x, entry.y, rgba)) painted += 1
      else skipped.push(`(${entry.x},${entry.y})`)
    }
    return {
      text: `canvas "${key}": painted ${painted} pixel(s)`
        + (skipped.length > 0 ? `; skipped ${skipped.length} outside the canvas: ${skipped.slice(0, 8).join(' ')}${skipped.length > 8 ? ' …' : ''}` : '')
        + `; non-transparent now: ${canvas.opaqueCount()}`,
    }
  }

  if (action === 'draw') {
    const { key, canvas } = requireCanvas(args)
    if (!Array.isArray(args.rows) || args.rows.length === 0) throw new Error('pixel_art: action "draw" needs "rows" — an array of equal-length strings')
    if (args.palette === null || typeof args.palette !== 'object' || Array.isArray(args.palette)) throw new Error('pixel_art: action "draw" needs "palette" — an object mapping one character to a colour')
    const originX = Number.isInteger(args.x) ? args.x : 0
    const originY = Number.isInteger(args.y) ? args.y : 0
    const brushes = new Map()
    for (const [symbol, value] of Object.entries(args.palette)) {
      if (symbol.length !== 1) throw new Error(`pixel_art: palette key ${JSON.stringify(symbol)} must be exactly one character`)
      brushes.set(symbol, value === null ? null : parseColor(value, 255))
    }
    const width = Math.max(...args.rows.map((row) => row.length))
    for (const [index, row] of args.rows.entries()) {
      if (typeof row !== 'string') throw new Error(`pixel_art: row ${index + 1} must be a string`)
      if (row.length !== width) throw new Error(`pixel_art: row ${index + 1} has ${row.length} characters, but the widest row has ${width}; every row must be the same length (pad with "." or " ")`)
    }
    let painted = 0
    for (let y = 0; y < args.rows.length; y += 1) {
      const row = args.rows[y]
      for (let x = 0; x < row.length; x += 1) {
        const symbol = row[x]
        if (!brushes.has(symbol)) continue // не описанный символ — «ничего не рисовать»
        const rgba = brushes.get(symbol)
        if (rgba === null) continue
        if (canvas.put(originX + x, originY + y, rgba)) painted += 1
      }
    }
    return {
      text: `canvas "${key}": drew ${args.rows.length}×${width} cells from the ASCII grid at (${originX},${originY}), painted ${painted} pixel(s); non-transparent now: ${canvas.opaqueCount()}. Undescribed characters are left untouched; palette entries with null erase nothing.`
        + (originX + width > canvas.width || originY + args.rows.length > canvas.height ? ' Some cells fell outside the canvas.' : ''),
    }
  }

  if (action === 'fill') {
    const { key, canvas } = requireCanvas(args)
    const x = Number.isInteger(args.x) ? args.x : 0
    const y = Number.isInteger(args.y) ? args.y : 0
    const w = Number.isInteger(args.w) ? args.w : canvas.width - x
    const h = Number.isInteger(args.h) ? args.h : canvas.height - y
    if (w <= 0 || h <= 0) throw new Error(`pixel_art: fill needs positive w and h, got w=${w}, h=${h}`)
    const rgba = parseColor(args.color, args.alpha === undefined ? 255 : args.alpha)
    const painted = canvas.fill(x, y, w, h, rgba)
    return { text: `canvas "${key}": filled ${w}×${h} at (${x},${y}) with ${toHex(rgba)}${rgba[3] === 255 ? '' : ` a=${rgba[3]}`}, painted ${painted} pixel(s); non-transparent now: ${canvas.opaqueCount()}` }
  }

  if (action === 'dump') {
    const { key, canvas } = requireCanvas(args)
    return { text: dumpCanvas(key, canvas) }
  }

  if (action === 'preview') {
    const { key, canvas } = requireCanvas(args)
    if (canvas.opaqueCount() === 0) {
      return { text: `canvas "${key}" is still empty (${canvas.width}×${canvas.height}, every pixel transparent) — nothing to look at yet.` }
    }
    const chosen = chooseScale(canvas, args.scale, attachments)
    const percent = Math.round(chosen.scale * 100)
    const note = chosen.clamped ? ` ${chosen.reason}.` : ''
    return imageResult(
      attachments,
      canvas,
      chosen.scale,
      `canvas "${key}" ${canvas.width}×${canvas.height}, shown at ×${chosen.scale} (${percent}%, nearest neighbour — every art pixel is ${chosen.scale}×${chosen.scale} image pixels). Look at the picture: check silhouette, palette, stray pixels and obvious mistakes, then fix them with "pixels"/"draw"/"fill" and look again.${note}`,
      `${key}-${canvas.width}x${canvas.height}@${chosen.scale}x.png`,
    )
  }

  if (action === 'save') {
    const { key, canvas } = requireCanvas(args)
    const file = resolveSavePath(args, canvas, exec)
    const png = encodePng(canvas.width, canvas.height, canvas.data)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, png)
    const requested = Number.isInteger(args.scale) && args.scale > 1 ? args.scale : undefined
    let extra = ''
    let shown = canvas
    let shownScale = 1
    if (requested !== undefined) {
      const chosen = chooseScale(canvas, requested, attachments)
      const scaled = scaleNearest(canvas.width, canvas.height, canvas.data, chosen.scale)
      const scaledFile = file.replace(/\.png$/i, `@${chosen.scale}x.png`)
      await writeFile(scaledFile, encodePng(scaled.width, scaled.height, scaled.data))
      extra = `\nupscaled copy: ${scaledFile} (${scaled.width}×${scaled.height}, ×${chosen.scale})`
      shown = { width: scaled.width, height: scaled.height, data: scaled.data }
      shownScale = chosen.scale
    }
    const text = `canvas "${key}" saved: ${file} (${canvas.width}×${canvas.height} px, ${png.length} bytes, ${canvas.opaqueCount()} non-transparent pixels)${extra}\nThis is the final image — present it to the user as the deliverable; the picture below is what the file contains${shownScale === 1 ? '' : `, shown at ×${shownScale} for legibility`}.`
    if (attachments === undefined) return { text }
    const ref = await attachments.saveImage({
      data: new Uint8Array(encodePng(shown.width, shown.height, shown.data)),
      mediaType: 'image/png',
      name: `${key}-${canvas.width}x${canvas.height}${shownScale === 1 ? '' : `@${shownScale}x`}.png`,
    })
    return { text, image: imageValue(ref) }
  }

  throw new Error(`pixel_art: unknown action ${JSON.stringify(action)}; use help, new, pixels, draw, fill, dump, preview or save`)
}

/* ------------------------------------------------------------ описание --- */

/** Описание инструмента для модели. */
const DESCRIPTION = [
  'Draw pixel art on an in-memory canvas and look at the result yourself.',
  'Workflow: "help" (read the full instructions once) → "new" (pick any resolution from 4×4 to 256×256) → paint with "pixels" (one pixel at a time, RGB 0-255 plus alpha), "draw" (an ASCII grid plus a colour palette — compact for whole sprites) or "fill" → "preview" to get the canvas back as a PNG at ×5 (×3 when a side is 128 px or more) and inspect silhouette, palette and stray pixels → fix → "save" to write the final PNG file, then present that file to the user.',
  'Every action returns short text; "dump" returns the canvas as a text grid with a palette legend when you want to reason about it without an image.',
  'Colours accept #rgb, #rrggbb, #rrggbbaa, "r,g,b[,a]", a name (red, teal, skin, …) or [r,g,b,a].',
  'The canvas lives in the Host process for this session only; "preview" and "save" return the image inline, and attachment limits may reduce the preview zoom — the text says so when that happens.',
].join(' ')

/** Схема аргументов (проверенный поднабор JSON Schema из dsh-tools). */
const PARAMETERS = {
  type: 'object',
  additionalProperties: false,
  required: ['action'],
  properties: {
    action: {
      type: 'string',
      enum: ['help', 'new', 'pixels', 'draw', 'fill', 'dump', 'preview', 'save'],
      description: 'help — read the pixel-art instructions; new — create/reset a canvas; pixels — paint individual pixels; draw — paint an ASCII grid by palette; fill — fill a rectangle; dump — canvas as a text grid; preview — canvas as a PNG to look at; save — write the final PNG file.',
    },
    canvas: { type: 'string', description: `Canvas name; default "${DEFAULT_CANVAS}". Use it to keep several sprites alive at once.` },
    width: { type: 'integer', description: `Canvas width in pixels, ${MIN_SIDE}…${MAX_SIDE} (action "new").` },
    height: { type: 'integer', description: `Canvas height in pixels, ${MIN_SIDE}…${MAX_SIDE} (action "new").` },
    background: { type: 'string', description: 'Optional background colour for "new" (default: fully transparent).' },
    pixels: {
      type: 'array',
      description: 'Pixels to paint (action "pixels"). Coordinates are 0-based, (0,0) is the top-left corner.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          x: { type: 'integer', description: 'Column, 0-based from the left.' },
          y: { type: 'integer', description: 'Row, 0-based from the top.' },
          color: { type: 'string', description: 'Colour: #rgb, #rrggbb, #rrggbbaa, "r,g,b[,a]" or a name.' },
          alpha: { type: 'integer', description: 'Optional alpha 0…255 (0 = transparent), overrides the colour side.' },
        },
      },
    },
    rows: {
      type: 'array',
      description: 'Action "draw": rows of equal length, each character a palette key. Characters missing from the palette are left untouched; pad with "." or spaces.',
      items: { type: 'string' },
    },
    palette: {
      type: 'object',
      description: 'Action "draw": maps one character to its colour (string value) or to null (paint nothing). Keys must be single characters.',
    },
    x: { type: 'integer', description: 'Origin column for "draw"/"fill" (default 0).' },
    y: { type: 'integer', description: 'Origin row for "draw"/"fill" (default 0).' },
    w: { type: 'integer', description: 'Rectangle width for "fill" (default: to the right edge).' },
    h: { type: 'integer', description: 'Rectangle height for "fill" (default: to the bottom edge).' },
    color: { type: 'string', description: 'Colour for "fill".' },
    alpha: { type: 'integer', description: 'Optional alpha 0…255 for "fill".' },
    scale: { type: 'integer', description: `Zoom for "preview" (default ×${PREVIEW_SCALE}, or ×${BIG_PREVIEW_SCALE} when the canvas has a side ≥ ${BIG_SIDE}); for "save" it writes an extra upscaled copy. Attachment limits cap it.` },
    path: { type: 'string', description: 'Destination .png for "save" (absolute, or relative to the session working directory; default <cwd>/pixel-art/).' },
    lang: { type: 'string', enum: ['ru', 'en'], description: 'Language of the "help" text (default ru).' },
  },
}

/** Схема результата: короткий текст плюс необязательная картинка. */
const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: { type: 'string', description: 'Short report of what the action did.' },
    image: {
      type: 'object',
      additionalProperties: false,
      required: ['attachmentId', 'mediaType', 'bytes', 'width', 'height'],
      properties: {
        attachmentId: { type: 'string', description: 'Durable attachment reference.' },
        mediaType: { type: 'string', enum: ['image/png'], description: 'Media type of the attached picture.' },
        bytes: { type: 'integer', description: 'Size of the attached PNG.' },
        width: { type: 'integer', description: 'Width of the attached picture in pixels.' },
        height: { type: 'integer', description: 'Height of the attached picture in pixels.' },
        name: { type: 'string', description: 'Display name of the attachment.' },
      },
    },
  },
}

/**
 * Смонтировать инструменты плагина: пиксель-арт и выбор прокси.
 * @param ctx - контекст плагина (сервис `tools` уже доступен).
 * @param config - конфиг записи: необязательный `proxy: { url, noProxy, exportEnv }`.
 */
export function apply(ctx, config = {}) {
  ctx.effect(() => ctx.tools.register({
    name: 'pixel_art',
    description: DESCRIPTION,
    parameters: PARAMETERS,
    output: {
      schema: OUTPUT_SCHEMA,
      render: (_args, value) => (value?.image === undefined
        ? [{ type: 'text', text: value.text }]
        : [{ type: 'text', text: value.text }, { type: 'image', attachment: value.image }]),
    },
    // Холсты живут в общем состоянии, поэтому параллельные вызовы небезопасны.
    isConcurrencySafe: () => false,
    async execute(args, exec) {
      // Сервис вложений необязателен: без него работают все действия, кроме
      // показа картинки (тогда инструмент честно об этом сообщает).
      return runAction(args, exec, ctx.get('attachments'))
    },
  }), 'rus-image-percent-gen: pixel_art tool')

  // Второй инструмент живёт в своём модуле (`proxy.js`): это отдельная
  // способность, но запись бандла у плагина одна — так надёжнее.
  applyProxyTool(ctx, config)
}
