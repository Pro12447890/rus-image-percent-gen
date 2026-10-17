# Как выложить этот плагин, чтобы его скачали другие

В этой папке лежит **готовый к публикации** пакет `rus-image-percent-gen`. Он содержит
всё сразу: русский интерфейс, масштаб элементов 80–220 %, инструмент рисования
`pixel_art` и выбор прокси `proxy_switch` (с проверкой по пингу и страной выхода).

Личного прокси в пакете **нет** — адрес никогда не входит в файлы, его задаёт тот, кто
установил плагин. Это проверяется автотестом (`tmp\pixel-test.mjs`), иначе публикация
утекла бы чужой прокси.

---

## 0. Проверка перед публикацией (2 минуты)

```powershell
cd D:\Documents\deepseek-harness\default-workspace\plugin\rus-image-percent-gen

# 1. Синтаксис всех модулей
node --check plugin.js ; node --check proxy.js ; node --check shared.js ; node --check client.js

# 2. Что именно уедет в пакет (должно быть 10 файлов, без node_modules и lock-файла)
node <путь>\pnpm.mjs pack      # или: npm pack
tar -tzf rus-image-percent-gen-1.4.0.tgz
```

В архиве обязаны быть: `package.json`, `plugin.js`, `proxy.js`, `shared.js`,
`client.js`, `cordis.patch.yml`, `icon.svg`, `LICENSE`, `README.md`,
`instructions/*.md` (4 файла).

## 1. Вариант «npm» — чтобы ставилось одной командой

Так плагин смогут поставить все: `dsh plugin --profile <профиль> add rus-image-percent-gen`.

```powershell
# 1. Аккаунт: https://www.npmjs.com/signup (бесплатно)
# 2. Вход (спросит логин, пароль и код из письма/приложения)
npm login

# 3. Свободно ли имя? Если команда показала версию — имя занято, см. ниже про scope
npm view rus-image-percent-gen version

# 4. Публикация (из папки плагина)
npm publish --access public

# 5. Проверка, что пакет виден миру
npm view rus-image-percent-gen version dist.tarball
```

**Если имя занято** — публикуйте под своим scope и поправьте имя в двух местах:
`package.json` (`"name": "@ваш-логин/rus-image-percent-gen"`) и `cordis.patch.yml`
(`name: '@ваш-логин/rus-image-percent-gen'`). Установка тогда:

```sh
dsh plugin --profile desktop add @ваш-логин/rus-image-percent-gen
```

**Каждая новая публикация — новая версия** (npm не примет тот же номер дважды):

```powershell
npm version patch     # 1.4.0 -> 1.4.1 (или minor/major)
npm publish --access public
```

## 2. Вариант «GitHub» — если npm не нужен

```powershell
# в папке плагина
git init
git add .
git commit -m "rus-image-percent-gen 1.4.0"
git branch -M main
git remote add origin https://github.com/ВАШ-ЛОГИН/rus-image-percent-gen.git
git push -u origin main
git tag v1.4.0 ; git push --tags
```

Другие ставят так:

```sh
dsh plugin --profile desktop add github:ВАШ-ЛОГИН/rus-image-percent-gen
dsh plugin --profile desktop add github:ВАШ-ЛОГИН/rus-image-percent-gen#v1.4.0
```

Требования к репозиторию: `package.json` в корне, публичный доступ, лицензия, README.

## 3. Куда «зарегистрировать», чтобы нашли

| Где | Что сделать |
|---|---|
| **Маркет внутри DSH** | Настройки → Плагины → Маркет: после публикации в npm плагин ищется по имени `rus-image-percent-gen` и ставится в один клик |
| **dsh-plugin.org** | Страница Submit — форма со ссылкой на репозиторий/пакет; после проверки появляется карточка с описанием и командой установки |
| **awesome-deepseek-harness** | Pull request в список: одна строка с названием, ссылкой и кратким описанием |
| **GitHub-тема** | В репозитории указать тему `dsh-plugin` (и `deepseek-harness`) — по ней ищут в GitHub |

Что повышает шансы попасть в подборки: понятный README с примерами, лицензия MIT,
работающая установка «в один шаг», скриншоты/примеры результата и отсутствие личных
данных в пакете.

## 4. Что проверить после публикации (у себя, в чистом профиле)

```sh
dsh plugin --profile test add rus-image-percent-gen     # или github:…
dsh plugin --profile test list
```

1. Интерфейс на русском, кнопка масштаба `A+`/`A−` в подвале панели, масштаб до 220 %.
2. Инструмент `pixel_art` виден агенту: `{"action":"help"}` отдаёт инструкцию.
3. Инструмент `proxy_switch`: `{"action":"status"}` показывает `mode: direct`
   и **пустой** адрес — прокси по умолчанию не вписан.
4. `{"action":"check","targets":[{"name":"тест","host":"…","port":8080,"user":"…","password":"…"}]}`
   показывает время ответа, внешний IP и **страну**.
5. В подвале панели виден переключатель прокси, а в «Настройках» — страница **«Прокси»**: части адреса, включение, проверка
   кандидатов по пингу и файл настроек в профиле.
5. Клиентская половина (русский + масштаб) подхватывается после перезапуска DSH;
   страницу достаточно обновить (Ctrl+R).

## 5. Чего не делать

- Не вписывать свой прокси в файлы пакета (только в конфиг своего профиля) — иначе он
  уедет всем, кто поставит плагин.
- Не публиковать `node_modules`, `.tgz` и lock-файл: список файлов задан полем `files`.
- Не менять версию задним числом: npm хранит все опубликованные версии навсегда.

## 6. Реестр dsplugin.app (vbarter/dsh-plugin-registry) — точные требования

Проверено по README реестра 15.10.2026. Условия попадания в каталог:

1. **Публичный репозиторий GitHub** — `github.com/Pro12447890/rus-image-percent-gen`.
2. **Топик `dsh-plugin`** на репозитории (Settings → Topics). Реестр каждые 2 часа ищет
   `topic:dsh-plugin` и читает корневой `package.json`.
3. В манифесте — **`dsh.bundle`** с относительным `patch` без `..` (у нас
   `./cordis.patch.yml`) либо `dsh.plugin`. Тогда манифест помечается `shape_validated`.

Два пути:

* **Автопоиск** — после появления топика запись добавится сама (`source: discovered`),
  реестр откроет PR `discover/sync`, мейнтейнер его смёржит.
* **Заявка (curated)** — Issue с шаблоном `plugin_submission.yml` (поля `repo_url`,
  `owner_repo`, `notes`, метка `submission`). Бот проверит манифест и откроет PR
  `submission/<номер>`.

Всё это делает скрипт `tools\publish-plugin.ps1` в рабочей папке (создать репозиторий,
поставить топики, залить ветку и тег, подать заявку). Перед запуском — один раз
`gh auth login`.

## 7. Обсуждения DeepSeek Harness

~~Отдельного API у Discussions нет, поэтому текст вставляется руками.~~ **Уточнено
15.10.2026:** API есть — мутация `createDiscussion` в GraphQL, работает через
`gh api graphql`; а для авторов плагинов в `deepseek-ai/deepseek-harness` заведена
отдельная категория **Show Your Plugins!** (`show-your-plugins`), а не «закреплённая
тема». Текст объявления, который был опубликован:

> **rus-image-percent-gen** — один бандл для DSH: русский интерфейс (2310 строк),
> масштаб элементов 80–220 %, инструмент `pixel_art` (холст 4×4…256×256, покраска по
> пикселям, предпросмотр ×5/×3, экспорт PNG) и управление прокси (`proxy_switch`:
> HTTP(S)/SOCKS5, проверка по пингу со страной выхода, своя страница настроек и
> переключатель в подвале панели). Адрес прокси в пакете не хранится.
>
> Установка: `dsh plugin --profile desktop add github:Pro12447890/rus-image-percent-gen`
> (или `add rus-image-percent-gen` после публикации в npm).

## 8. Состояние публикации (15.10.2026) — всё выполнено

**Официального реестра плагинов у DSH нет.** В README `deepseek-ai/deepseek-harness`
единственный механизм обнаружения описан так: *«Add the `dsh-plugin` topic to your
plugin repository for discoverability»*. То есть «попасть в реестр» = поставить
**GitHub-топик** `dsh-plugin`; каталоги `dsh-plugin.org` и `dsplugin.app` сторонние и
сканируют именно этот топик.

| Шаг | Результат |
|---|---|
| Репозиторий | https://github.com/Pro12447890/rus-image-percent-gen (public, MIT) |
| Топики | `dsh-plugin`, `dsh`, `deepseek-harness`, `cordis-plugin`, `pixel-art`, `proxy`, `socks5` |
| Описание в блоке About | из `package.json`, 226 знаков |
| Поиск GitHub | `topic:dsh-plugin rus-image-percent-gen` → 1 результат, наш |
| Заявка в dsh-plugin.org | https://github.com/dshplugin/dsh-plugin-hub/issues/220 — листинг появляется сам по топику, раз в сутки |
| Заявка в dsplugin.app | https://github.com/vbarter/dsh-plugin-registry/issues/373 → бот: `action: curated`, «Manifest validated» → PR https://github.com/vbarter/dsh-plugin-registry/pull/374 (mergeable, ждёт мейнтейнера) |
| Discussions DSH | https://github.com/deepseek-ai/deepseek-harness/discussions/9815 — категория **Show Your Plugins!** |

Две ловушки, оплаченные этой публикацией:

1. **Метку `submission` стороннему автору не поставить** — `AddLabelsToLabelable`
   требует прав triage. Но воркфлоу `ingest-submission.yml` срабатывает и на
   `issues: opened`, поэтому заявка обрабатывается и без метки (метку ставит сама
   issue-форма шаблона).
2. **Топики и Issues недоступны через git.** SSH-мост переносит коммиты, но не
   метаданные репозитория; для них нужен `gh auth login` (одноразовый код через
   браузер, не PAT).

`tools\publish-plugin.ps1` после этой публикации **не нужен**: репозиторий создан,
топики стоят, заявки поданы.
