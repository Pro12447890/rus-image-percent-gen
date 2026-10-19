# rus-image-percent-gen

**Один плагин DeepSeek Harness, который делает шесть вещей:**

| Что | Как это выглядит |
|---|---|
| **Русский интерфейс** | перевод всей оболочки (2310 строк), включается автоматически |
| **Масштаб элементов** | кнопка `A+` / `A−` в подвале панели, от 80 % до **220 %** (шаг 5 %, выше 160 % — 10 %) |
| **Рисование** | инструмент `pixel_art`: холст 4×4…256×256, покраска по пикселю, предпросмотр ×5/×3, экспорт PNG |
| **Прокси** | инструмент `proxy_switch`, **переключатель в подвале панели** и **своя страница в настройках**: адрес по частям, HTTP(S)/SOCKS5, проверка по пингу со страной выхода |
| **Тариф** | строка под полем ввода: «Тариф: обычный» или «Тариф: пик ×2» — по системному времени |
| **Улучшения** | предохранитель от случайной отправки, копирование переписки правой кнопкой, тёмная тема по расписанию — и своя страница «Улучшения» в настройках |

Пример результата: ![сердце 16×16](docs/example-heart-6x.png)

Английская версия — [ниже](#english). Как выложить плагин, чтобы его скачали другие —
[PUBLISH.md](PUBLISH.md).

Установка одной строкой:

```sh
dsh plugin --profile desktop add github:Pro12447890/rus-image-percent-gen
```

---

## Рисование: инструмент `pixel_art`

| `action` | Что делает |
|---|---|
| `help` | отдаёт эту инструкцию целиком (`lang: "ru"` или `"en"`) |
| `new` | создаёт/очищает холст: `width`, `height` (4…256), необязательный `background` |
| `pixels` | красит отдельные пиксели: `[{x, y, color, alpha?}]` |
| `draw` | рисует ASCII-сетку по палитре: `rows` + `palette` (символ → цвет) |
| `fill` | заливает прямоугольник `{x, y, w, h, color, alpha?}` |
| `dump` | возвращает холст сеткой символов и легендой палитры (текстом) |
| `preview` | возвращает холст картинкой PNG (по умолчанию ×5, для крупных ×3) |
| `save` | пишет итоговый PNG (1:1), с `scale` — ещё и увеличенную копию |

Цвета: `#rgb`, `#rrggbb`, `#rrggbbaa`, `"r,g,b[,a]"`, имя (`red`, `teal`, `skin`)
или массив `[r,g,b,a]`. Альфа — 0…255.

Несколько холстов сразу — через необязательное имя `canvas`.

## Прокси: инструмент `proxy_switch`

**Прокси по умолчанию НЕ вписан и НЕ включён.** Ни адреса, ни логина, ни пароля: пока
пользователь не задаст свой, всё идёт напрямую, как будто инструмента нет. Это сделано
намеренно — чужой прокси в общем пакете не нужен никому.

**Части адреса вводятся раздельно** — у каждого прокси они свои: `protocol`, `host`,
`port`, `user`, `password`. Можно и одной строкой (`proxy`), если так удобнее.

| `action` | Что делает |
|---|---|
| `status` | текущий маршрут: режим, адрес (логин скрыт), список обхода, кандидаты, результат последней проверки, доступен ли `undici`, что в переменных окружения |
| `check` | **проверка по пингу**: идёт через каждого кандидата настоящим запросом и показывает время ответа, внешний IP и **страну**; `"choose": true` — переключиться на быстрейшего |
| `set` | включить свой прокси — **по частям** (`host`, `port`, `user`, `password`, `protocol`) или одной строкой `proxy` |
| `env` | взять адрес из переменных окружения (`HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY`) |
| `off` | вернуться к прямому выходу |
| `help` | отдать инструкцию (`lang: "ru"` или `"en"`) |

Поддерживаются **HTTP(S) и SOCKS5** (у SOCKS5 нет списка обхода). Есть **отдельная страница настроек** в интерфейсе: Настройки → Прокси.
Логин и пароль в ответах скрываются (`http://***@host:8080`). Переключение действует
сразу для всех внутрипроцессных запросов (модели, поиск, HTTP-MCP) и, если не выключить
`export_env`, уходит в переменные дочерних процессов (`curl`/`git`, stdio-MCP).

```json
{"action":"set","protocol":"http","host":"proxy.example.com","port":8080,
 "user":"логин","password":"пароль","noProxy":["localhost","api.deepseek.com"]}
{"action":"set","proxy":"http://user:password@proxy.example.com:8080"}
{"action":"check","targets":[
   {"name":"Домашний","host":"proxy-a.example.com","port":8080,"user":"u","password":"p"},
   {"name":"Рабочий","host":"proxy-b.example.com","port":3128}]}
{"action":"check","choose":true}
```

Чтобы адрес применялся при каждом запуске DSH, а кандидатов было удобно проверять
по пингу, впишите их в конфиг записи плагина (**по умолчанию там пусто**):

```yaml
- insert:
    - id: rus-image-percent-gen
      name: 'rus-image-percent-gen'
      config:
        proxy:
          enabled: true
          url: 'http://user:password@proxy-a.example.com:8080'   # включается при запуске
          candidates:                                            # что проверяет check
            - { name: 'Домашний', protocol: http, host: proxy-a.example.com, port: 8080, user: u, password: p }
            - 'http://user:password@proxy-b.example.com:8080'
          noProxy: ['localhost', '127.0.0.1']
          exportEnv: true
```

Ответ `check` выглядит так:

```
Проверка прокси (2):
1. Домашний — http://***@proxy-a.example.com:8080 — живой, 412 мс, внешний IP 38.154.185.97, страна United States (US)
2. Рабочий — http://***@proxy-b.example.com:3128 — нет ответа за 5000 мс (no answer within 5000 ms)
Быстрейший: Домашний — http://***@proxy-a.example.com:8080 (412 мс, United States).
```

Если в профиле уже стоит отдельный плагин прокси с карточкой настроек (например
`@memef1f1y/dsh-plugin-proxy`) — держите включённым только один: оба пишут один и тот же
глобальный диспетчер.

Для внутрипроцессного прокси нужен пакет `undici` (объявлен в зависимостях, при
установке из npm ставится сам). Если его нет, `set`/`env`/`check` честно скажут об этом.

## Тариф: строка под полем ввода

Под полем ввода, рядом со скоростью и попаданием в кэш, плагин показывает **действующий
тариф**: «Тариф: обычный» или «Тариф: пик ×2» — по системному времени пользователя.

У DeepSeek цена в пиковые часы ровно вдвое выше, чем в обычные: пик — **понедельник–пятница,
01:00–04:00 и 06:00–10:00 UTC**, всё остальное время (включая выходные) — половина цены.
Плагин переводит эти границы в местное время: подсказка при наведении показывает окна
(например, `04:00–07:00 · 09:00–13:00` для Москвы) и время следующего переключения. Строка
обновляется сама каждые 20 секунд — переход через полночь, начало пика и выходные видны
без перезагрузки.

Китайские государственные праздники, когда действует обычный тариф, не учитываются:
их список задаётся календарём, а не расписанием.

```text
● Тариф: обычный        — сейчас, суббота
● Тариф: пик ×2         — понедельник, 04:00–07:00 и 09:00–13:00 (МСК)
```

## Улучшения: предохранитель, копирование, тёмная тема

![Плашка предохранителя](docs/example-guard.png)

**Предохранитель от пустой траты токенов.** Если в поле ввода меньше 5 букв (порог
настраивается), перед отправкой появляется плашка «Точно ли вы хотите отправить?» с
кнопками «Отмена» и «Отправить». Спрашиваем не чаще одного раза в 5 минут — иначе
переписка из «ок» и «да» превращалась бы в сплошные вопросы. Работает и для Enter, и
для кнопки отправки; «Отправить» в плашке повторяет ровно то действие, которое вы
только что сделали.

**Копирование по правой кнопке.** Правый клик по сообщению — меню из двух пунктов:
«Копировать сообщение» и «Копировать всю переписку». В копию не попадают кнопки
действий и скрытые подсказки, а в полной переписке у сообщений стоят роли «Вы» и «ИИ».

**Тёмная тема по расписанию.** Задайте окно «Тёмная с … до …» по местному времени —
оно может переходить через полночь (например, 20:00 → 08:00). Внутри окна включается
тёмная тема, снаружи — светлая, а переход растягивается на 10 секунд (настраивается;
0 — переключать сразу). Расписание проверяется раз в 20 секунд и при возврате во
вкладку; если тему выбрать вручную, плагин не спорит до следующей границы окна.

Все три ручки — на странице **Настройки → Улучшения**: включение, порог букв, частота
вопроса, окно тёмной темы и длительность перехода.

## Установка

```sh
# из локальной папки
dsh plugin --profile desktop add <путь-к-папке-плагина>

# или из npm / git, когда пакет опубликован
dsh plugin --profile desktop add rus-image-percent-gen
dsh plugin --profile desktop add github:Pro12447890/rus-image-percent-gen
```

В интерфейсе DSH то же самое делается через **Настройки → Плагины** (установка
бандла). После установки плагин виден в перечне бандлов профиля, а инструмент
`pixel_art` появляется у агента без перезапуска — достаточно нового запроса.

Совместимость: собран под DSH **0.2.1-rc.2**, профиль `desktop` (Windows). Строка тарифа
опирается на слот `conversation.composer.dock`: на сборках, где его нет, остальное работает
как обычно, а строка просто не показывается. Лицензия — MIT, исходники целиком в
репозитории, внешних сервисов плагин не требует.

Внешних зависимостей ровно одна — `undici` (нужна только для прокси; при установке из
npm ставится сама). PNG кодируется встроенным `node:zlib`, определение инструментов
собирается вручную. Нужны сервисы `tools` и (для показа картинок) `attachments`.

Код разложен по трём файлам: `plugin.js` — точка входа и пиксель-арт, `proxy.js` — выбор
прокси, `shared.js` — чтение инструкций.

## Как этим пользуется ИИ

1. `help` — читает инструкцию `instructions/pixel-art.<язык>.md`;
2. `new` — выбирает разрешение;
3. `pixels` / `draw` / `fill` — рисует;
4. `preview` — смотрит на себя картинкой и правит, пока не понравится;
5. `dump` — когда нужно посчитать пиксели или сверить координаты без зрения;
6. `save` — отдаёт итоговый PNG человеку.

Инструкция лежит в двух файлах — `instructions/pixel-art.ru.md` и
`instructions/pixel-art.en.md`; она же возвращается действием `help`.

## Ограничения

- Холсты живут в процессе хоста до перезапуска DSH (в файлы они не пишутся,
  пока не вызван `save`).
- Увеличение предпросмотра упирается в лимиты сервиса вложений: если предел
  меньше запрошенного, инструмент сам уменьшит масштаб и скажет об этом.
- Инструмент помечен как небезопасный для параллельных вызовов: холст — общее
  состояние.

## Лицензия

MIT.

---

<a id="english"></a>
# English

**One DeepSeek Harness bundle that does six things:**

| What | How it shows up |
|---|---|
| **Russian UI** | the whole shell translated (2310 strings), switched on automatically |
| **Element scaling** | an `A+` / `A−` control in the sidebar foot, 80 % to **220 %** (5 % steps, 10 % above 160 %) |
| **Drawing** | the `pixel_art` tool: a 4×4…256×256 canvas, per-pixel painting, ×5/×3 previews, PNG export |
| **Proxy** | the `proxy_switch` tool, a **switch in the sidebar foot** and **its own settings page**: address parts, HTTP(S)/SOCKS5, latency check with the exit country |
| **Tariff** | a line under the composer: “Tariff: normal” or “Tariff: peak ×2”, from the system clock |
| **Improvements** | a short-message guard, right-click chat copying, a scheduled dark theme — and their own **Improvements** settings page |

Publishing instructions: [PUBLISH.md](PUBLISH.md). Example output:
![16x16 heart](docs/example-heart-6x.png)

## Drawing: the `pixel_art` tool

| `action` | What it does |
|---|---|
| `help` | returns these instructions (`lang: "ru"` or `"en"`) |
| `new` | creates/resets a canvas: `width`, `height` (4…256), optional `background` |
| `pixels` | paints individual pixels: `[{x, y, color, alpha?}]` |
| `draw` | paints an ASCII grid by palette: `rows` + `palette` (character → colour) |
| `fill` | fills a rectangle `{x, y, w, h, color, alpha?}` |
| `dump` | returns the canvas as a character grid with a palette legend |
| `preview` | returns the canvas as a PNG (×5 by default, ×3 for large canvases) |
| `save` | writes the final 1:1 PNG; with `scale` also an upscaled copy |

Colours: `#rgb`, `#rrggbb`, `#rrggbbaa`, `"r,g,b[,a]"`, a name (`red`, `teal`,
`skin`) or `[r,g,b,a]`. Alpha runs 0…255. Several canvases at once via the
optional `canvas` name.

## Proxy: the `proxy_switch` tool

**No proxy is filled in and none is enabled by default.** No address, no login, no
password: until the user supplies their own, everything goes out directly, exactly as if
the tool were not there. That is deliberate — somebody else's proxy has no place in a
shared package.

**The parts of an address are entered separately** — every proxy differs here:
`protocol`, `host`, `port`, `user`, `password`. A single `proxy` URL string still works.

| `action` | What it does |
|---|---|
| `status` | the current route: mode, address (credentials hidden), bypass list, candidates, the last check, whether `undici` is available, what the environment holds |
| `check` | **latency check**: walks each candidate with a real request through it and reports the round trip, the exit address and the **country**; `"choose": true` switches to the fastest one |
| `set` | switch to your own proxy — **by parts** (`host`, `port`, `user`, `password`, `protocol`) or as one `proxy` URL |
| `env` | take the address from the environment (`HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY`) |
| `off` | return to a direct connection |
| `help` | return the instructions (`lang: "ru"` or `"en"`) |

```json
{"action":"set","protocol":"http","host":"proxy.example.com","port":8080,
 "user":"login","password":"secret","noProxy":["localhost","api.deepseek.com"]}
{"action":"check","targets":[
   {"name":"Home","host":"proxy-a.example.com","port":8080,"user":"u","password":"p"},
   {"name":"Office","host":"proxy-b.example.com","port":3128}]}
{"action":"check","choose":true}
```

**HTTP(S) and SOCKS5** are supported (a SOCKS5 proxy has no bypass list). There is a
dedicated settings page: Settings -> Proxy. Credentials are hidden in answers (`http://***@host:8080`). A switch applies at
once to every in-process request (models, search, HTTP MCP) and, unless `export_env` is
off, reaches the environment of child processes (`curl`/`git`, stdio MCP).

To apply an address on every DSH start, and to keep a candidate list for the latency
check, put both into the plugin entry config (empty by default):

```yaml
- insert:
    - id: rus-image-percent-gen
      name: 'rus-image-percent-gen'
      config:
        proxy:
          url: 'http://user:password@proxy-a.example.com:8080'   # applied at startup
          candidates:                                            # what check tests
            - 'http://user:password@proxy-a.example.com:8080'
            - 'http://user:password@proxy-b.example.com:8080'
          noProxy: ['localhost', '127.0.0.1']
          exportEnv: true
```

```json
{"action":"check"}                  // who answers, and how fast
{"action":"check","choose":true}    // and switch to the fastest
```

If the profile already carries a dedicated proxy plugin with a settings card (for example
`@memef1f1y/dsh-plugin-proxy`), keep only one of them enabled: both write the same global
dispatcher.

The in-process proxy needs the `undici` package (declared as a dependency, installed
automatically from npm). When it is missing, `set`/`env`/`check` say so plainly.

## Tariff: the line under the composer

Under the composer, beside the speed and cache-hit pills, the bundle shows **which tariff
applies right now**: “Tariff: normal” or “Tariff: peak ×2”, computed from the user's system
clock.

DeepSeek charges exactly double during peak hours: **Monday to Friday, 01:00–04:00 and
06:00–10:00 UTC**; every other hour, weekends included, bills at half the peak rate. The line
converts those windows into your local time — the tooltip lists them (for example
`04:00–07:00 · 09:00–13:00` in Moscow) together with the next switch — and refreshes itself
every 20 seconds, so midnight, the start of a peak window and the weekend need no reload.

Chinese public holidays (which also bill off-peak) are not taken into account: that is a
calendar, not a schedule.

```text
● Tariff: normal        — right now, Saturday
● Tariff: peak ×2       — Monday, 04:00–07:00 and 09:00–13:00 (MSK)
```

## Improvements: a guard, copying, a dark theme

![The guard panel](docs/example-guard.png)

**A guard against wasted tokens.** When the composer holds fewer than 5 letters (the
threshold is configurable), sending first asks “Are you sure you want to send this?” with
**Cancel** and **Send**. It asks at most once every 5 minutes — otherwise a conversation of
“ok” and “yes” would be nothing but questions. It covers both Enter and the send button,
and **Send** replays exactly the action you just took.

**Right-click copying.** Right-click a message for two items: “Copy message” and “Copy the
whole conversation”. Action buttons and hidden hints stay out of the copy, and the full
transcript labels the messages “You” and “AI”.

**Scheduled dark theme.** Pick a window (“Dark from … until …”) in local time — it may
cross midnight (say 20:00 → 08:00). Inside the window the dark theme is on, outside it the
light one, and the switch fades over 10 seconds (configurable; 0 switches instantly). The
schedule is checked every 20 seconds and when the tab regains focus; a manual theme choice
is not fought until the next window boundary.

All three live on **Settings → Improvements**: toggles, the letter threshold, how often the
question may appear, the dark window and the transition length.

```sh
dsh plugin --profile desktop add rus-image-percent-gen
```

There is exactly one external dependency, `undici` (needed only for the proxy; npm installs
it automatically). PNG encoding uses the built-in `node:zlib` and the tool definitions are
assembled by hand. Only the `tools` service is required, plus `attachments` for showing
pictures. The instructions live in `instructions/*.md` and are also returned by
`action: "help"`. The code is split into `plugin.js` (entry plus pixel art), `proxy.js`
(the proxy tool) and `shared.js` (instruction loading).

MIT © 2026 Daymix
