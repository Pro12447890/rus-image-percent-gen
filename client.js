/**
 * Russian localization and QHD display scaling for the DeepSeek Harness Web UI.
 *
 * Registers the `ru` language and its dictionaries with the Client locale
 * service, defaults the interface to Russian once, and scales the whole
 * interface through a `zoom` factor that the General settings row can tune.
 */
window.__ModuleLoader__.load({
  id: 'rus-image-percent-gen',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const LANGUAGE = { id: 'ru', label: 'Русский', fallback: 'en' };
    const DICTIONARIES = {"conversation":{"ask.answered":"{answered}/{total} с ответом","ask.cancelled":"отменён","ask.cancelledDetail":"Этот набор вопросов был отменён до отправки ответов.","ask.closed":"закрыт","ask.closedDetail":"Вопрос закрыт; его результат — в переписке ниже.","ask.interrupted":"прерван","ask.interruptedDetail":"Этот набор вопросов был прерван до отправки ответов.","ask.pending":"продолжен; ответ всё ещё доступен","ask.pendingDetail":"На эти ожидающие вопросы ещё можно ответить из поля ввода.","ask.reopen":"Ответить","ask.review":"Посмотреть ответы","ask.rowTitle":"Задать вопрос","ask.skipped":"Без ответа","ask.waiting":"ожидание","attachment.directoryDesktopOnly":"Папки можно добавлять только в приложении; в браузере добавляйте отдельные файлы","attachment.dropBlocked":"Сейчас нельзя добавлять файлы и изображения","attachment.dropDesc":"Лимит изображений: до {count} изображений по {size}","attachment.dropTitle":"Перетащите сюда файлы или изображения, чтобы добавить их","attachment.pathUnavailable":"Не удалось получить путь к папке; перетащите её снова","attachment.pathUnsupported":"Путь содержит символы, которые нельзя передать в ссылке; переименуйте и повторите","attachment.pending":"Ожидающие вложения","attachment.scrollLeft":"Прокрутить вложения влево","attachment.scrollRight":"Прокрутить вложения вправо","bash.failed":"Сбой","bash.running":"Выполняется","bash.stopped":"Остановлено","command.attachmentsUnsupported":"/{command} не принимает вложения; сначала удалите их","context.aria":"использовано {percent} контекста","context.messages":"Сообщения","context.system":"Системный промпт","context.tools":"Определения инструментов","context.used":"контекста использовано","detail.agent.reply":"Ответ агента","detail.agents.count":"{count} агентов","detail.days":"{count} д","detail.empty":"Нет результатов","detail.event.neighbors":"Соседние события","detail.field.agent":"ID агента","detail.field.agents":"Агенты запущены","detail.field.availability":"Доступность","detail.field.bestMatch":"Лучшее совпадение","detail.field.callId":"ID вызова","detail.field.content":"Содержимое","detail.field.context":"Контекст","detail.field.currentPackage":"Текущий пакет","detail.field.data":"Данные","detail.field.dependencies":"Зависимости","detail.field.depth":"Глубина","detail.field.diagnostics":"Диагностика","detail.field.exitCode":"Код выхода","detail.field.id":"ID","detail.field.inputSchema":"Схема ввода","detail.field.job":"ID задачи","detail.field.latestRun":"Последний запуск","detail.field.message":"Сообщение","detail.field.messageId":"ID сообщения","detail.field.methods":"Методы","detail.field.model":"Модель","detail.field.nextPackage":"Следующий пакет","detail.field.outputSchema":"Схема вывода","detail.field.owner":"Владелец","detail.field.packages":"Пакеты","detail.field.parent":"Родитель","detail.field.pid":"ID процесса","detail.field.platform":"Платформа","detail.field.previousStatus":"Предыдущий статус","detail.field.processGroup":"Группа процессов","detail.field.props":"Свойства","detail.field.provider":"Провайдер","detail.field.ready":"Готово","detail.field.registrations":"Регистрации","detail.field.result":"Результат","detail.field.revision":"Ревизия","detail.field.role":"Роль","detail.field.root":"Корень","detail.field.seq":"Последовательность событий","detail.field.signal":"Сигнал","detail.field.source":"Источник","detail.field.step":"Шаг","detail.field.surface":"Статус записи","detail.field.target":"Целевое событие","detail.field.task":"Задача","detail.field.time":"Время","detail.field.turn":"Ход","detail.field.type":"Тип","detail.field.warnings":"Предупреждения","detail.field.writeScopes":"Области записи","detail.goal.active":"Активна","detail.goal.blocked":"Заблокирована","detail.goal.complete":"Завершена","detail.goal.disarmed":"Ожидает продолжения","detail.goal.empty":"Нет цели","detail.goal.paused":"Приостановлена","detail.goal.reason":"Блокер","detail.goal.rounds":"Раунды","detail.hours":"{count} ч","detail.jobs.count":"{count} фоновых задач","detail.location":"Строка {line}, столбец {column}","detail.locations.count":"{count} мест","detail.matches.capped":"Достигнут лимит результатов; сузьте поиск, чтобы увидеть больше","detail.matches.count":"{count} совпадений","detail.minutes":"{count} мин","detail.models.title":"Доступные модели","detail.moreInInspect":"Ещё {count} элементов доступно в Inspect","detail.no":"Нет","detail.none":"Нет","detail.output.lines":"Строки {begin}–{end} из {total}","detail.output.truncated":"Вывод обрезан","detail.plugins.count":"{count} динамических плагинов","detail.providers.count":"{count} провайдеров Inspect","detail.ralph.limit":"Достигнут лимит раундов","detail.ralph.reportedBlocker":"Исполнитель сообщил о блокере","detail.ralph.reportedComplete":"Исполнитель сообщил о завершении","detail.receipt.alreadyFinished":"Уже завершено","detail.receipt.cancel":"Запрошена отмена","detail.receipt.closed":"Закрыто","detail.receipt.closing":"Закрывается","detail.receipt.delivered":"Сообщение доставлено","detail.receipt.interrupt":"Запрошено прерывание","detail.receipt.signal":"Сигнал доставлен","detail.receipt.started":"Запущено","detail.recordedResult":"Записанный результат","detail.report.nextSteps":"Оставшаяся работа","detail.schedule.count":"{count} напоминаний","detail.schedule.cron":"Cron {expression} ({zone})","detail.schedule.daily":"Ежедневно в {time} ({zone})","detail.schedule.deleted":"Удалено","detail.schedule.empty":"Нет напоминаний","detail.schedule.every":"Каждые {interval}","detail.schedule.frequency":"Повтор","detail.schedule.once":"Один раз","detail.schedule.overdue":"Просрочено, ожидает возобновления сессии","detail.schedule.scheduled":"Запланировано","detail.schedule.weekly":"Еженедельно по {days} в {time} ({zone})","detail.schedule.when":"Запланировано на","detail.seconds":"{count} с","detail.state":"Статус","detail.status.accepted":"Принято","detail.status.completed":"Завершено","detail.status.deleted":"Удалено","detail.status.exited":"Завершён","detail.status.failed":"Сбой","detail.status.idle":"Простой","detail.status.inactive":"Неактивен","detail.status.killed":"Отменено","detail.status.provisioning":"Подготовка","detail.status.queued":"В очереди","detail.status.ready":"Готово","detail.status.running":"Выполняется","detail.tasks.count":"{count} командных задач","detail.tasks.nextPage":"Доступны другие задачи; следующий курсор — {cursor}","detail.terminals.count":"{count} терминалов","detail.todo.completed":"Завершено","detail.todo.empty":"Список задач пуст","detail.todo.in_progress":"В работе","detail.todo.pending":"Ожидает","detail.trace.ancestors":"Сессии-предки","detail.trace.derived":"Производные события","detail.trace.descendants":"Сессии-потомки","detail.trace.replacedBy":"Заменено на","detail.trace.replacementChain":"Цепочка замен","detail.trace.replaces":"Заменённые события","detail.trace.sources":"Исходные события","detail.wait.changed":"Обнаружено изменение","detail.wait.noProgress":"Нет активных субагентов","detail.wait.timeout":"Время ожидания истекло","detail.wait.title":"Активность субагентов","detail.weekday.1":"Пн","detail.weekday.2":"Вт","detail.weekday.3":"Ср","detail.weekday.4":"Чт","detail.weekday.5":"Пт","detail.weekday.6":"Сб","detail.weekday.7":"Вс","detail.weekday.join":", ","detail.workflow.script":"Скрипт рабочего процесса","detail.yes":"Да","details.running":"Выполняется…","diff.collapseAria":"Свернуть diff","diff.expandAria":"Развернуть ещё {count} строк diff","diff.expandRest":"… ещё {count} строк","error.sessionInUse":"Эта сессия уже используется, возможно, другим запущенным экземпляром DSH (например, dsh web или приложением). Закройте другие экземпляры DSH и повторите попытку.","file.label":"Файл","file.notStaged":"Файл не завершил загрузку; добавьте его снова и повторите","file.pending":"Ожидающие файлы","file.remove":"Удалить файл {name}","file.retry":"Повторить загрузку {name}","file.sessionUnavailable":"Сессия недоступна; файлы нельзя загрузить","file.stillUploading":"Файлы ещё загружаются; отправьте после завершения","file.uploadFailed":"Загрузка не удалась; нажмите, чтобы повторить","file.uploading":"Загрузка…","hero.chooseWorkspace":"Выбрать рабочую область","hero.headline":"В неизвестность","hero.preview":"Предпросмотр","hint.goal":"опишите цель для длительной задачи","hint.goal.active":"цель активна — изменить / приостановить / возобновить / очистить","hint.plan":"опишите задачу, чтобы создать план","image.closePreview":"Закрыть предпросмотр оригинала изображения","image.dimensionTooLarge":"Стороны изображения должны быть не больше {size}px; уменьшите его и повторите","image.fileTooLarge":"Каждое изображение должно быть меньше {size}","image.label":"Изображение","image.loadFailed":"Изображение не загрузилось; нажмите, чтобы повторить","image.loading":"Загрузка изображения…","image.modelUnsupported":"Текущая модель не поддерживает изображения; переключитесь на поддерживающую модель","image.openOriginal":"Открыть оригинал","image.openOriginalLabel":"{label}, нажмите, чтобы открыть оригинал","image.original":"Оригинал изображения","image.pending":"Ожидающие изображения","image.preview":"Предпросмотр оригинала изображения","image.remove":"Удалить изображение {name}","image.sendFailed":"Не удалось отправить изображения ({reason}); добавьте их снова и повторите","image.tooMany":"Сообщение может содержать до {count} изображений","image.tooManyPixels":"Слишком высокое разрешение изображения; сожмите его и повторите","image.totalTooLarge":"Изображения превышают {size} в сумме; удалите часть и повторите","image.unsupportedType":"Поддерживаются только изображения PNG, JPG, WebP и GIF","input.commands":"Добавить файлы или выполнить команды","input.file":"Файл","input.send":"Отправить сообщение","input.send.queue":"Поставить сообщение в очередь","input.send.steer":"Направить сообщение","input.stop":"Остановить генерацию","placeholder.default":"Сообщение или задача, / команды, @ файлы или сессии","placeholder.hero":"Опишите, что хотите создать, / команды, @ файлы или сессии","placeholder.parentOffline":"Родительская сессия офлайн; отправка недоступна, но запуск можно остановить","placeholder.plan":"опишите задачу, чтобы создать план","placeholder.steerQueue":"Cmd/Ctrl+Enter направляет все сообщения из очереди","placeholder.unavailable":"Сессия недоступна","placeholder.workspace":"Выберите рабочую область, чтобы начать","queue.cancelEdit":"Отменить редактирование","queue.count":"{n} сообщений в очереди","queue.edit":"Изменить сообщение в очереди","queue.edit.unsupported":"Содержит нетекстовое содержимое; редактирование пока не поддерживается","queue.editFailed":"Не удалось изменить: возможно, это сообщение уже начало отправляться.","queue.file":"Файл {name} в очереди","queue.image":"Изображение сообщения в очереди","queue.remove":"Удалить сообщение из очереди","queue.removeFailed":"Не удалось удалить: возможно, это сообщение уже начало отправляться.","queue.save":"Сохранить сообщение в очереди","queue.sending":"Отправка…","queue.steer":"Направить сообщение из очереди","queue.steer.unavailable":"Направление доступно только во время работы агента","queue.steerFailed":"Не удалось направить. Повторите попытку.","read.collapseAria":"Свернуть содержимое","read.expandAria":"Развернуть ещё {count} строк","read.expandRest":"… ещё {count} строк","read.window":"Показано {shown} из {total} строк","row.failed":"Сбой","row.input":"IN","row.inspect":"Inspect","row.output":"OUT","row.preparing":"Подготовка вызова инструмента","row.running":"Выполняется","row.stopped":"Остановлено","search.collapseAria":"Свернуть результаты","search.expandAria":"Развернуть ещё {count} строк результатов","search.expandRest":"… ещё {count} строк","search.matches":"{shown} совпадений · {files} файлов","search.matches.truncated":"Показано {shown} из {total} совпадений · {files} файлов","search.noResults":"Нет результатов","search.paths":"{shown} путей","search.paths.truncated":"Показано {shown} из {total} путей","session.hierarchy":"Иерархия сессий","settings.enter.description":"Что делают Enter и кнопка отправки, пока агент работает; Cmd/Ctrl+Enter использует другое поведение","settings.enter.queue":"Очередь","settings.enter.steer":"Направление","settings.enter.title":"Поведение отправки при занятости","shortcut.complementary":"Использовать дополнительное действие «Очередь / Направление»","shortcut.mention":"Открыть меню ссылок","shortcut.newline":"Новая строка","shortcut.slash":"Открыть меню команд","terminal.collapseAria":"Свернуть вывод","terminal.done":"Готово","terminal.exitCode":"код выхода {code}","terminal.expandAria":"Развернуть оставшиеся {n} строк вывода","terminal.expandRest":"… ещё {n} строк","terminal.failed":"Сбой","terminal.noExitCode":"нет кода выхода","terminal.noOutput":"Нет вывода","terminal.running":"Выполняется","terminal.sendInput":"(отправить ввод)","terminal.session":"Терминал {sessionId}","terminal.signal":"сигнал {signal}","todo.completed":"{done}/{total} завершено","todo.diff.added":"{count} добавлено","todo.diff.addedItem":"Добавлено","todo.diff.compare":"Изменения с прошлого списка","todo.diff.initial":"Исходный список","todo.diff.movedItem":"Порядок изменён","todo.diff.noChanges":"В списке нет изменений","todo.diff.removed":"{count} удалено","todo.diff.removedItem":"Удалено","todo.diff.unavailable":"Прошлый список недоступен","todo.diff.unchanged":"{count} без изменений","todo.diff.updated":"{count} обновлено","todo.diff.updatedItem":"Статус изменён","todo.progress.active":"{active} в работе","todo.progress.done":"{done} завершено","todo.progress.pending":"{pending} ожидает","todo.rowTitle":"Обновить список задач","todo.status.completed":"Завершено","todo.status.inProgress":"В работе","todo.status.pending":"Ожидает","todo.title":"Задачи","tool.autoReviewNotExecuted":"Инструмент не был выполнен. Причина: {reason}","tool.autoReviewReasonFallback":"Автопроверка не разрешила это действие","tool.autoReviewRejected":"Отклонено автопроверкой","tool.preparing.content":"Подготовка содержимого {kilobytes}KB","tool.title.bash":"Bash","tool.title.closeTerminal":"Закрыть терминал","tool.title.code":"Код","tool.title.createGoal":"Создать цель","tool.title.createSchedule":"Создать напоминание","tool.title.createTeamTask":"Создать командную задачу","tool.title.deleteSchedule":"Удалить напоминание","tool.title.edit":"Изменить","tool.title.findDefinition":"Найти определение","tool.title.findImplementation":"Найти реализацию","tool.title.findReferences":"Найти ссылки","tool.title.generic":"Вызов инструмента","tool.title.getGoal":"Просмотреть цель","tool.title.getTeamTask":"Прочитать командную задачу","tool.title.glob":"Glob","tool.title.grep":"Grep","tool.title.hoverSymbol":"Изучить символ","tool.title.inspect":"Запросить окружение Cordis","tool.title.inspectPlugins":"Изучить плагины","tool.title.inspectProviders":"Изучить провайдеры","tool.title.interruptAgent":"Прервать агента","tool.title.killJob":"Отменить фоновую задачу","tool.title.listAgents":"Список субагентов","tool.title.listJobs":"Список фоновых задач","tool.title.listModels":"Список моделей","tool.title.listSchedules":"Список напоминаний","tool.title.listTeamTasks":"Список командных задач","tool.title.listTerminals":"Список терминалов","tool.title.lsp":"Запросить символы кода","tool.title.openTerminal":"Открыть терминал","tool.title.pwsh":"Pwsh","tool.title.queryRuntime":"Запросить среду выполнения","tool.title.ralph":"Запустить цикл ralph","tool.title.read":"Чтение","tool.title.readEvent":"Прочитать событие","tool.title.readImage":"Прочитать изображение","tool.title.readJob":"Прочитать вывод задачи","tool.title.readTerminal":"Прочитать терминал","tool.title.removeCordis":"Удалить плагин Cordis","tool.title.runCordis":"Запустить плагин Cordis","tool.title.search":"Поиск","tool.title.searchEvents":"Искать события","tool.title.searchSessions":"Искать сессии","tool.title.sendMessage":"Отправить сообщение","tool.title.signalTerminal":"Подать сигнал терминалу","tool.title.spawnTeammate":"Создать напарника","tool.title.stopCordis":"Остановить плагин Cordis","tool.title.subagent":"Создать субагента","tool.title.traceEvent":"Проследить событие","tool.title.traceSession":"Проследить сессию","tool.title.updateGoal":"Обновить цель","tool.title.updateSchedule":"Обновить напоминание","tool.title.updateTeamTask":"Обновить командную задачу","tool.title.waitAgent":"Ждать субагента","tool.title.webFetch":"Загрузить","tool.title.webSearch":"Поиск","tool.title.workflow":"Запустить рабочий процесс","tool.title.write":"Запись","web.contentTruncated":"Содержимое обрезано","web.http":"HTTP","web.noResults":"Ничего не найдено","web.sourcesTruncated":"Список источников обрезан"},"trajectory":{"attachment.imageName":"Изображение {index}","attachment.list":"Вложения","block.label":"Блок #{index} {type}","block.openSummary":"Открыть сводку вызова инструмента блока #{index}","block.openSummaryTitle":"Открыть сводку вызова инструмента","code.copyOutput":"Копировать вывод","code.copySource":"Копировать код","code.originalJson":"Исходный JSON","code.output":"Вывод","code.running":"Выполняется…","code.source":"Код","column.input":"Ввод","column.model":"Модель","column.output":"Вывод","column.think":"Размышление","column.time":"Время","column.tools":"Инструменты","details.assistantMessage":"Сообщение ассистента","details.close":"Закрыть подробности","details.compacted":"Сжато","details.error":"Ошибка","details.event":"Подробности события","details.failure.auth":"Ключ API недействителен","details.hierarchy":"Иерархия","details.model":"Модель","details.provider":"Провайдер","details.purpose":"Назначение","details.resize":"Изменить размер подробностей","details.resizeTitle":"Перетащите, чтобы изменить размер. Двойной щелчок — сбросить.","details.result":"Результат","details.retry":"Повторить","details.retryDelay":"Задержка повтора","details.scheduled":"Запланировано","details.source":"Источник","details.status":"Статус","details.subtoolCalls":"Вызовы субинструментов","details.toolCall":"Вызов инструмента","details.toolCalls":"Вызовы инструментов","group.compaction":"Сжатие {seq}","group.message":"Сообщение","group.step":"Шаг {step}","history.clickToLoadEarlier":"Нажмите, чтобы загрузить более раннюю историю","history.loadEarlier":"Загрузить более раннюю историю","history.loadingEarlier":"Загрузка более ранней истории…","history.loadingEarlierAria":"Загрузка более ранней истории…","history.loadingTrajectory":"Загрузка траектории…","kind.assistant":"АССИСТЕНТ","kind.compacted":"СЖАТО","kind.context":"КОНТЕКСТ","kind.message":"Сообщение","kind.sub":"Суб","kind.subtool":"СУБИНСТРУМЕНТ","kind.system":"СИСТЕМА","kind.tool":"ИНСТРУМЕНТ","kind.user":"ПОЛЬЗОВАТЕЛЬ","layout.compacted":"Контекст сжат","layout.compacting":"Сжатие контекста…","layout.compactionFailed":"Не удалось выполнить сжатие","layout.compactionInterrupted":"Сжатие было прервано до завершения.","layout.fileAttachments":"Файлы ×{count}","layout.imageCount":"Изображения ×{count}","layout.initialSystemPrompt":"Исходный системный промпт","layout.systemPromptAndToolsUpdated":"Системный промпт и инструменты обновлены","layout.systemPromptUpdated":"Системный промпт обновлён","layout.toolAdded":"Инструмент добавлен: {name}","layout.toolCallOnly":"Только вызов инструмента","layout.toolRemoved":"Инструмент удалён: {name}","layout.toolUpdateNotice":"Инструменты обновлены","layout.toolsAdded":"Добавлено: {names}","layout.toolsAddedCount":"Добавлено: {count}","layout.toolsChanged":"Добавлено: {added}, удалено: {removed}","layout.toolsRemoved":"Удалено: {names}","layout.toolsRemovedCount":"Удалено: {count}","layout.toolsUpdated":"Инструменты обновлены","options.json":"JSON параметров запроса","options.notRecorded":"Параметры не записаны","record.json":"JSON","record.namedParametersJson":"JSON параметров {name}","record.noContent":"Нет содержимого","record.noOutput":"Нет вывода","record.noPayload":"Полезные данные не записаны","record.noResult":"Результат не записан","record.outputJson":"JSON результата","record.parameters":"Параметры","record.parametersJson":"JSON параметров","record.payloadJson":"JSON полезных данных","record.resultJson":"JSON результата","record.schemaUnavailable":"Схема недоступна","record.systemPrompt":"Системный промпт","record.systemPromptMissing":"В этом запросе нет системного промпта","record.thinking":"Размышления","record.toolCallOnly":"(только вызов инструмента)","record.tools":"Инструменты","record.toolsMissing":"В этом запросе нет инструментов","record.wrapLines":"Переносить строки","request.collapsedAssistant":"ассистент","request.collapsedSummary":"Свёрнутая сводка: {kind}, {summary}","request.collapsedTurn":"ход","request.compaction":"Сжатие · {section}","request.compactionPurpose":"Сжатие","request.label":"Запрос #{request}","request.labelCompaction":"Запрос #{request} · Сжатие","request.noContent":"нет содержимого","request.retryProgress":"{retry} из {maximum}","request.rowAria":"{request}{kind}, {content}","request.rowAriaCompaction":"Запрос {request}, сжатие","request.rowPrefix":"Запрос {request}, ","section.betweenTurns":"Между ходами","source.goal":"Цель","source.goalRound":"Цель · Раунд {round}","source.messageJson":"JSON источника сообщения","source.notRecorded":"Источник не записан","source.plugin":"Плагин","source.pluginNamed":"Плагин · {plugin}","source.unknown":"Неизвестно","source.user":"Пользователь","status.completed":"Завершено","status.failed":"Ошибка","status.pending":"В ожидании","summary.steps.one":"{count} шаг","summary.steps.other":"{count} шагов","summary.toolCalls.one":"{count} вызов инструмента","summary.toolCalls.other":"{count} вызовов инструментов","tab.diff":"Различия","tab.options":"Параметры","tab.payload":"Полезные данные","tab.preview":"Предпросмотр","tab.raw":"Исходное","tab.rawOutput":"Исходный вывод","tab.result":"Результат","tab.schema":"Схема","tab.source":"Источник","tab.summary":"Сводка","tab.systemPrompt":"Системный промпт","tab.timing":"Тайминг","tab.tools":"Инструменты","tab.usage":"Использование","timeline.aria":"Хронология траектории","timeline.noTimingData":"Нет данных о тайминге","timeline.overviewAria":"Обзор хронологии; перетащите по горизонтали, чтобы приблизить события","timeline.started":"Начало {time}","timeline.total":"Всего {duration}","timeline.ttftDecoding":"TTFT {ttft} · Декодирование {decoding}","timing.duration":"Длительность","timing.durationTooShort":"Слишком малая длительность","timing.firstTokenUnavailable":"Первый токен недоступен","timing.generation":"Генерация","timing.notAvailable":"Недоступно","timing.notRecorded":"Не записано","timing.outputTokensUnavailable":"Выходные токены недоступны","timing.request":"Тайминг запроса","timing.sessionTimestamps":"Метки времени сессии","timing.sessionTimestampsRunning":"Метки времени сессии (выполняется)","timing.showLocalTime":"Показывать местное время","timing.showUnixTimestamp":"Показывать метку времени Unix","timing.source":"Источник тайминга","timing.started":"Начало","timing.stepStartUnavailable":"Начало шага недоступно","timing.throughput":"Пропускная способность","timing.totalDuration":"Общая длительность","timing.ttft":"TTFT","timing.usageUnavailable":"Использование недоступно","toolbar.actualTime":"Фактическое время","toolbar.aria":"Панель траектории","toolbar.calls":"Вызовы","toolbar.collapseCalls":"Свернуть вызовы","toolbar.collapseTurns":"Свернуть ходы","toolbar.duration":"Длительность","toolbar.expandCalls":"Развернуть вызовы","toolbar.expandTurns":"Развернуть ходы","toolbar.search":"Поиск по траектории","toolbar.searchPlaceholder":"Поиск","toolbar.turns":"Ходы","toolbar.useActualDuration":"Использовать фактическую длительность","toolbar.useEqualWidth":"Одинаковая ширина операций","turn.label":"Ход {turn}","unit.milliseconds":"{value} ms","unit.seconds":"{value} s","unit.tokens":"{value} tok","unit.tokensPerSecond":"{value} tok/s","usage.cacheCreated":"Создано в кэше","usage.cached":"Из кэша","usage.content":"Содержимое","usage.input":"Ввод","usage.notReported":"Использование не сообщено","usage.other":"Прочее","usage.output":"Вывод","usage.reasoning":"Рассуждения","usage.sessionCumulative":"Всего за сессию","usage.thisRequest":"Этот запрос","usage.tokens":"Токены","view.trajectory":"Траектория"},"pluginManager":{"addPlugin":"Добавить плагин","backToList":"Назад к плагинам","backToPackage":"Назад к {name}","bundlesTitle":"Установленные","cancel":"Отмена","close":"Закрыть","configureRow":"Настроить {name}","confirmUninstall":"Удалить","confirmUninstallDescription":"После удаления всё, что он предоставляет, исчезнет.","confirmUninstallTitle":"Удалить «{name}»?","crumbRoot":"Плагины","empty":"Плагины пока не установлены.","enableToggle":"Включить {name}","error":"Не удалось прочитать все плагины, возможно, из-за проблемы с сетью","failedDisable":"Не удалось отключить: {reason}","failedEnable":"Не удалось включить: {reason}","failedRowDisable":"Не удалось отключить компонент: {reason}","failedRowEnable":"Не удалось включить компонент: {reason}","failedUninstall":"Не удалось удалить: {reason}","infoDescription":"Настраивайте официальные плагины, устанавливайте другие плагины и управляйте ими здесь. Список встроенных плагинов и состояние среды выполнения — в разделе «Настройки» → «Встроенные плагины».","infoLabel":"О плагинах","installApplying":"Применяется конфигурация, подождите…","installApplyingCancellationError":"Отмена не подтверждена. Установка выполняется; дождитесь её результата. {reason}","installApprovalCaution":"Разрешайте только доверенные пакеты.","installApprovalConsequence":"После разрешения скрипты выполняются здесь с вашими правами, а разрешение сохраняется в этом профиле.","installApprovalDescription":"У этих пакетов есть скрипты установки, которые pnpm не выполнил.","installApprovalTitle":"Скриптам установки нужно разрешение","installApproveAndRetry":"Разрешить эти скрипты и повторить","installAttempt":"{previous} не смог отдать пакет; повтор через {registry} (реестр {index} из {total})","installAttemptBadge":"Попытка {index} · {registry}","installAwaitingAcceptance":"Ожидание принятия установки хостом. После подтверждения отмена будет повторена автоматически.","installBackgroundApplying":"Установка выполняется, отменить её нельзя. Посмотреть ход установки.","installBackgroundDone":"Установка завершена. Посмотреть подробности установки.","installBackgroundFailed":"Установка не удалась. Посмотреть подробности установки.","installBackgroundUnconfirmed":"Состояние установки не подтверждено. Подробности — в данных установки.","installBackgroundUnknown":"Результат установки недоступен. Проверьте список плагинов.","installCancel":"Отменить установку","installCancelAndEdit":"Отменить установку и вернуться к редактированию","installCancelUnconfirmed":"Остановка установки не подтверждена. Повторите отмену или дождитесь результата установки. {reason}","installCancelled":"Установка отменена; плагин не включён, скачанные файлы могли остаться","installCancelledShort":"Отменено","installCancelling":"Остановка установки…","installChangeRegistry":"Сменить реестр","installChecking":"Проверка…","installClose":"Готово","installCloseCancels":"Отменить установку и закрыть","installDescription":"Введите имя пакета плагина, адрес репозитория GitHub или путь к локальному каталогу.","installDetailsHide":"Скрыть подробности установки","installDetailsShow":"Показать подробности установки","installDoneApproved":"Скрипты установки разрешены для {names}","installDoneNothing":"Установка завершена, новых зависимостей нет.","installDoneRestart":"Установлено; загрузится при следующем запуске.","installEdit":"Изменить","installEditAria":"Вернуться к редактированию","installEnableNow":"Включить сейчас","installFailedTitle":"Не удалось установить плагин","installFailureBuildBlocked":"Скрипты установки зависимости требуют вашего разрешения, чтобы продолжить установку","installFailureBuildBlockedManual":"pnpm заблокировал скрипты установки; разрешите их в allowBuilds файла pnpm-workspace.yaml и повторите","installFailureDiskFull":"Диск заполнен; установка остановлена","installFailureGeneric":"Во время установки что-то пошло не так; подробности укажут, что именно","installFailureIntegrity":"Скачанный пакет не прошёл проверку целостности","installFailureNetwork":"Не удалось подключиться к сети","installFailureNetworkAll":"Ни один реестр недоступен (проверены: {registries}). Проверьте сеть или прокси, либо смените реестр и повторите.","installFailureNetworkHost":"Не удалось подключиться к {host}. Адрес GitHub или ссылка .tgz не загружаются через реестр: эта машина должна иметь к ним прямой доступ или доступ через прокси. Если плагин также опубликован в npm, введите вместо этого имя его пакета.","installFailureNoMatchingVersion":"Нет версии, подходящей под запрос","installFailureNotFound":"Такой плагин не найден","installFailurePermission":"Нет прав на запись; плагин нельзя установить","installFailurePnpmMissing":"pnpm не найден, поэтому установить ничего нельзя","installFailureTimeout":"Время установки истекло","installGitTemplateHint":"Замените это на фактический адрес репозитория Git.","installGithubFailedDescription":"Попробуйте другой источник установки.","installGithubFailedTitle":"Нет доступа к GitHub","installGithubTimeoutTitle":"Время подключения к GitHub истекло","installGuideExampleLabel":"Пример: ","installGuideFill":"Использовать пример","installGuideFillAria":"Использовать пример {example}","installGuideHide":"Скрыть руководство","installGuideIdExample":"dsh-plugin-whale-pet","installGuideIdHint":"Имя пакета плагина — это имя пакета npm (например, dsh-xxx или @author/plugin): часть после dsh plugin add или pnpm add в команде установки из README стороннего плагина.","installGuideIdTitle":"Введите имя пакета npm для плагина","installGuideSafety":"Устанавливайте только доверенные плагины: они работают с вашими правами и могут повредить DeepSeek Harness или раскрыть ваши данные.","installGuideToggle":"Руководство по установке и примеры","installLocation":"Устанавливается в {dir}","installPackageLabel":"Имя пакета плагина","installPathTemplateHint":"Замените это на фактический путь к локальному каталогу плагина.","installProblemInstalled":"Этот плагин уже установлен. Чтобы обновить его, удалите и установите заново","installProblemInvalid":"Это не имя пакета и не адрес, которые можно установить: {reason}","installProblemNetwork":"Не удалось подключиться к реестру плагинов; проверьте сеть и повторите","installProblemNetworkAll":"Ни один реестр недоступен (проверены: {registries}); проверьте сеть или прокси, либо смените реестр","installProblemNotBundle":"Этот пакет не объявляет набор, поэтому его нельзя установить как плагин: {reason}","installProblemNotFound":"Такой плагин не найден","installProblemNotPackage":"Путь не существует или не является допустимым пакетом плагина","installProblemShipped":"Этот плагин входит в состав DSH; при обновлении DSH он обновится","installProblemUnknown":"Не удалось найти плагин: {reason}","installReconcile":"Проверить состояние установки","installResultUnconfirmed":"Результат установки не получен. Проверьте состояние установки. {reason}","installRetry":"Повторить","installRun":"Установить","installSpecLabel":"Имя пакета или адрес","installSpecPlaceholder":"например, dsh-plugin-whale-pet","installStarting":"Подготовка установки…","installSubjectGit":"Репозиторий Git","installSubjectPath":"Локальный каталог","installSubjectTarball":"Архив tar","installTitle":"Добавить плагин","installTryAnotherWay":"Попробовать другой способ","installUnconfirmedTitle":"Состояние установки не подтверждено","installUnknownDescription":"У хоста нет активной установки с этим id запроса. Проверьте список плагинов перед повторной попыткой.","installUnknownTitle":"Результат установки недоступен","installUpgradeNotice":"Установленные плагины пока не обновляются автоматически. Чтобы обновить плагин, удалите его и установите новую версию. В следующих выпусках обновление станет удобнее.","installUseGithubMirror":"Использовать зеркало для Китая","installVersion":"Версия {version}","installViewTask":"Посмотреть установку","installedTitle":"Установленные","installingTitle":"Установка плагина…","intro":"Устанавливайте, включайте и настраивайте плагины","loading":"Чтение плагинов…","metadataError":"Ошибка метаданных пакета: {error}","officialTitle":"Официальные","openDetail":"Открыть {name}","overriddenNotice":"{name} сохранён, но конфигурация с более высоким приоритетом переопределяет его, поэтому он не действует","panel":"Плагины","partOff":"Выкл.","partToggle":"Включить компонент {name}","partsCountFailed":"{count} с ошибкой","partsCountOff":"{count} выкл.","partsCountRunning":"{count} запущено","partsCountTotal":"всего {count}","partsEmpty":"Этот набор плагинов не содержит компонентов.","partsFilter":"Фильтр компонентов","partsFilterEmpty":"Нет подходящих компонентов.","partsLabel":"Компоненты","reasonAmbiguousInstall":"По изменению зависимостей нельзя определить, какой пакет был установлен.","reasonBundleInUse":"Другая конфигурация всё ещё использует компоненты этого набора; сначала отключите их.","reasonIncompatibleInstall":"Установите версию плагина, совместимую с этим DSH.","reasonIncompatibleInstalled":"Удалите его и установите версию, совместимую с этим DSH.","reasonIncompatibleVersion":"{plugin} несовместим с DSH {runtime} (требуется {peers}); его запуск может привести к сбоям или потере данных.","reasonIncompatibleVersionUnnamed":"Этот плагин несовместим с текущей версией DSH; его запуск может привести к сбоям или потере данных.","reasonInvalidSpec":"Введите допустимое имя пакета или адрес.","reasonLabel":"Причина","reasonManagementRequired":"Он нужен для управления плагинами; его нельзя отключить или удалить.","reasonNotBundle":"Этот пакет не объявляет набор, поэтому им нельзя управлять как плагином.","reasonNotRemovable":"Этот пакет не принадлежит профилю или нужен для управления плагинами.","reasonOperationError":"Хост сообщил об ошибке.","reasonStaleApproval":"Ожидающие подтверждения скриптов изменились; запустите установку снова, чтобы обновить их.","reasonStopProfile":"Этот профиль работает без HMR; остановите его и удалите пакет командой dsh plugin.","reasonUnaddressable":"Патч профиля не может однозначно адресовать этот элемент.","reasonUnknownPlugin":"Такого плагина нет.","refresh":"Обновить","refreshError":"Не удалось обновить. Повторите попытку.","registryCustom":"Свой адрес","registryCustomHint":"Введите адрес внутреннего или частного реестра npm, начинающийся с http:// или https://. Если требуется вход, сохраните учётные данные в ~/.npmrc на этой машине.","registryCustomInvalid":"Введите адрес, начинающийся с http:// или https://","registryCustomPlaceholder":"https://npm.example.com/","registryDefault":"Реестр по умолчанию","registryLegend":"Реестр npm, из которого скачивается плагин","registryListSeparator":", ","registryNpmmirror":"Зеркало для Китая","registryOfficial":"Официальный реестр npm","registryToggle":"Реестр","restartNotice":"Изменение вступит в силу при следующем запуске","retry":"Повторить","rowPhaseActive":"Работает","rowPhaseFailed":"Проблема","rowPhaseLoading":"Загрузка","rowPhasePending":"Ожидание зависимостей","rowPhaseUnloading":"Выгрузка","rowStateIdle":"Не запущен","sentenceSeparator":" ","statusBeta":"Экспериментальный","statusProblem":"Проблема","terminalCollapse":"Свернуть","terminalCollapseAria":"Свернуть вывод","terminalCopied":"Скопировано","terminalCopy":"Копировать","terminalDone":"Готово","terminalExitCode":"код выхода {code}","terminalExpand":"… ещё {n} строк","terminalExpandAria":"Развернуть оставшиеся {n} строк вывода","terminalFailed":"Сбой","terminalNoExitCode":"нет кода выхода","terminalNoOutput":"Нет вывода","terminalRunning":"Выполняется","terminalSignal":"сигнал {signal}","title":"Плагины","unavailable":"Этот экземпляр работает без управляемого профиля, поэтому устанавливать и переключать плагины здесь нельзя.","uninstall":"Удалить","uninstallLabel":"Удалить {name}","versionTag":"v{version}"},"chat":{"chat.deepDiving":"Глубокий анализ","chat.deepDivingFor":"Глубокий анализ: {duration} ···","chat.loadError":"Не удалось загрузить историю: {message} ({code})","chat.loadOlder":"Загрузить раннее","chat.loadingHistory":"Загрузка истории…","chat.toBottom":"Вниз","chat.turnNavigation.jump":"Перейти к ходу {turn}","chat.turnNavigation.jumpLoad":"Загрузить и перейти к ходу {turn}","chat.turnNavigation.label":"Навигация по ходам","chat.turnNavigation.turn":"Ход {turn}","clock.md":"{m}/{d}","clock.ymd":"{y}-{m}-{d}","command.done":"Завершено","command.failed":"Команда не выполнена","command.running":"Выполняется…","command.title":"Команда","duration.compactMinutes":"{minutes}м{seconds}с","duration.compactSeconds":"{seconds}с","duration.hourUnit":" ч ","duration.milliseconds":"{milliseconds}ms","duration.minuteUnit":" мин ","duration.secondUnit":"с","fileOpen.title":"Не удалось открыть файл","fileOpen.unknown":"Не удалось открыть этот файл","image.close":"Закрыть просмотр изображения","image.dialog":"Просмотр изображения","image.failed":"Просмотр изображения недоступен","image.loading":"Загрузка изображения…","image.open":"Открыть изображение полностью","json.truncated":"… усечено, всего символов: {total}","message.accountStopped":"Задача остановлена","message.branch":"Ответвить в новый диалог","message.branchUnavailable":"Доступно только для последнего сообщения завершённого хода","message.compaction":"Контекст сжат","message.compaction.commandTitle":"compact","message.compaction.completed":"Сжато элементов истории: {items} (~{tokens} токенов)","message.compaction.expand":"Показать сводку сжатия","message.compaction.running":"Сжатие контекста…","message.compaction.unavailable":"Сводка сжатия недоступна","message.context.catalog.more":"… ещё {count}","message.context.catalog.replaced":"Каталог замен","message.context.instructions.added":"добавлены","message.context.instructions.loaded":"загружены","message.context.instructions.removed":"удалены","message.context.instructions.updated":"обновлены","message.context.recall.counts":"сохранено {retained} · пропущено {omitted}","message.context.recall.truncated":"усечено","message.context.relay.from":"Из сессии {session}","message.context.snapshot.supersedes":"Заменяет предыдущие снимки","message.contextInjection":"Внедрение контекста","message.contextRecall":"Восстановление сессии","message.extraBlock":"Дополнительный блок содержимого","message.failure.accountSignInRequired":"Войдите в DeepSeek и убедитесь, что адресат запроса поддерживает аутентификацию аккаунта.","message.failure.accountSignedOut":"Остановлено из-за выхода из DeepSeek.","message.failure.auth":"API-ключ недействителен","message.failure.quota":"Квота запросов исчерпана.","message.maxTokens":"Достигнут лимит токенов вывода","message.maxTokens.hint":"Ответ был прерван; предыдущий вывод сохранён в диалоге. Отправьте «continue», чтобы модель продолжила.","message.referenceSeparator":", ","message.referenceSummary":"Упомянута сессия · {labels}","message.retry.active":"Повтор запроса к модели","message.retry.cancelled":"Повтор запроса к модели отменён","message.retry.delay":"Задержка повтора: ","message.retry.failure":"Причина сбоя: ","message.retry.scheduled":"Ожидание повтора запроса к модели","message.retry.started":"Запрос к модели повторён","message.retry.status":"{label} ({retry}/{maximum}) · {seconds}с","message.stepProcess.code":"Запуск кода","message.stepProcess.comma":", ","message.stepProcess.commands":"Запуск команд","message.stepProcess.done.code":"Запущен код","message.stepProcess.done.commands":"Запущены команды","message.stepProcess.done.edit":"Файлы изменены","message.stepProcess.done.plan":"План обновлён","message.stepProcess.done.questions":"Заданы вопросы","message.stepProcess.done.read":"Файлы прочитаны","message.stepProcess.done.readImage":"Изображения прочитаны","message.stepProcess.done.search":"Выполнен поиск по коду","message.stepProcess.done.subagents":"Субагенты скоординированы","message.stepProcess.done.thinking":"Анализ завершён","message.stepProcess.done.tools":"Вызваны инструменты","message.stepProcess.done.webFetch":"Открыты веб-страницы","message.stepProcess.done.webSearch":"Выполнен поиск в интернете","message.stepProcess.done.write":"Файлы записаны","message.stepProcess.edit":"Изменение файлов","message.stepProcess.joinTwo":"{first} и {second}","message.stepProcess.more":"{title} и др.","message.stepProcess.plan":"Обновление плана","message.stepProcess.prepare.code":"Подготовка к запуску кода","message.stepProcess.prepare.commands":"Подготовка к запуску команд","message.stepProcess.prepare.edit":"Подготовка к изменению файлов","message.stepProcess.prepare.plan":"Подготовка к обновлению плана","message.stepProcess.prepare.questions":"Подготовка вопросов","message.stepProcess.prepare.read":"Подготовка к чтению файлов","message.stepProcess.prepare.readImage":"Подготовка к чтению изображений","message.stepProcess.prepare.search":"Подготовка к поиску по коду","message.stepProcess.prepare.subagents":"Подготовка к координации субагентов","message.stepProcess.prepare.tools":"Подготовка вызовов инструментов","message.stepProcess.prepare.webFetch":"Подготовка к открытию веб-страниц","message.stepProcess.prepare.webSearch":"Подготовка к поиску в интернете","message.stepProcess.prepare.write":"Подготовка к записи файлов","message.stepProcess.questions":"Ожидание ваших действий","message.stepProcess.read":"Чтение файлов","message.stepProcess.readImage":"Чтение изображений","message.stepProcess.search":"Поиск по коду","message.stepProcess.sharedPrefix":"","message.stepProcess.subagents":"Координация субагентов","message.stepProcess.thinking":"Анализ запроса","message.stepProcess.tools":"Вызов инструментов","message.stepProcess.webFetch":"Открытие веб-страниц","message.stepProcess.webSearch":"Поиск в интернете","message.stepProcess.write":"Запись файлов","message.stopped":"Остановлено","message.systemPrompt":"Системная инструкция","message.systemPromptUpdate":"Обновление системной инструкции","message.think":"Думать","message.tokensPerSecond":"{tps} ток/с","message.toolAdded":"Инструмент добавлен: {name}","message.toolRemoved":"Инструмент удалён: {name}","message.toolsAdded":"Добавлено: {names}","message.toolsAddedCount":"добавлено: {count}","message.toolsChanged":"добавлено: {added}, удалено: {removed}","message.toolsRemoved":"Удалено: {names}","message.toolsRemovedCount":"удалено: {count}","message.toolsUpdated":"Инструменты обновлены","message.trigger.agent":"Получено сообщение задачи","message.trigger.explanation":"Это уведомление вызвало данный ответ.","message.trigger.github":"Получено событие GitHub","message.trigger.goal":"Продолжение цели","message.trigger.job":"Фоновая задача обновлена","message.trigger.plugin":"Статус плагина обновлён","message.trigger.request":"Запрошено выполнение","message.trigger.schedule":"Автоматическая задача","message.trigger.subagent":"Статус подзадачи обновлён","message.trigger.team":"Получено сообщение команды","message.trigger.webhook":"Получено внешнее событие","message.turnError":"Этот ход завершился с ошибкой","message.turnProcess.failed":"Ошибка","message.turnProcess.messages.one":"{count} сообщение","message.turnProcess.messages.other":"{count} сообщений","message.turnProcess.separator":" · ","message.turnProcess.subagents.one":"{count} субагент","message.turnProcess.subagents.other":"{count} субагентов","message.turnProcess.thoughtForAWhile":"Думал некоторое время","message.turnProcess.took":"Завершено за ","message.turnProcess.toolCalls.one":"{count} вызов инструмента","message.turnProcess.toolCalls.other":"{count} вызовов инструментов","message.turnProcess.worked":"Завершено","message.turnUsage.cacheHit":"Попадание в кэш","message.turnUsage.cacheRead":"Ввод из кэша","message.turnUsage.cacheWrite":"Запись в кэш","message.turnUsage.consumed":"Использовано {total}","message.turnUsage.count":"{count} ток","message.turnUsage.input":"Ввод без кэша","message.turnUsage.model":"Провайдер / модель","message.turnUsage.output":"Вывод","message.turnUsage.reasoning":" (рассуждения: {tokens})","message.turnUsage.title":"Расход за ход","message.unknownBlock":"Неизвестный блок содержимого","message.unknownSurface":"Неизвестное событие интерфейса: {type}","number.groupSeparator":",","row.failed":"Ошибка","row.running":"Выполняется","settings.links.description":"Выберите, где открывать веб-ссылки","settings.links.newTab":"Браузер по умолчанию","settings.links.sidebar":"Боковая панель приложения","settings.links.title":"Открывать ссылки из чата в","settings.performance.compact":"Компактно","settings.performance.description":"Выберите, сколько сведений о производительности и использовании показывать","settings.performance.detailed":"Подробно","settings.performance.title":"Производительность и использование","settings.transcript.compact":"Компактный","settings.transcript.description":"Выберите, насколько подробно показывать вызовы инструментов","settings.transcript.detailed":"Подробный","settings.transcript.standard":"Обычный","settings.transcript.title":"Детали работы","settings.transcript.verbose":"Расширенный","stats.cacheHit":"Попадание в кэш {percent}%","stats.counts":"{turns} ходов, {steps} шагов","stats.dialog.llmTime":"Время LLM","stats.dialog.speed":"Токенов в секунду (TPS)","stats.dialog.title":"Статистика сессии","stats.dialog.toolTime":"Время инструментов","stats.dialog.ttft":"Среднее время до первого токена (TTFT)","stats.dialog.usageTitle":"Использование токенов","view.chat":"Чат"},"schedule.manager":{"card.deleted":"Удалено","card.open":"Открыть","card.openLabel":"Открыть сведения о задаче: {title}","cronForm.atMinute":"В минуту","cronForm.daily":"Каждый день","cronForm.dateOption":"День {day}","cronForm.dates":"По датам","cronForm.frequency":"Частота","cronForm.minuteDecrease":"Уменьшить минуту","cronForm.minuteIncrease":"Увеличить минуту","cronForm.monthly":"Ежемесячно","cronForm.weekly":"Еженедельно","delete.action":"Удалить задачу","delete.cancel":"Отмена","delete.close":"Закрыть подтверждение удаления","delete.confirm":"Подтвердить удаление","delete.description":"Задача перестанет запускаться и будет удалена вместе с сохранёнными записями доставки. Исходная сессия и её сообщения останутся; сообщения в очереди не отзываются.","delete.pending":"Удаление…","delete.title":"Удалить эту задачу?","delivery.collapse":"Свернуть","delivery.cursorError":"Записи были обновлены.","delivery.empty":"Записи о доставке недоступны","delivery.error":"Не удалось загрузить записи о доставке.","delivery.expand":"Развернуть","delivery.label":"Сохранённая запись о доставке","delivery.loadMore":"Загрузить ещё","delivery.loading":"Загрузка записей о доставке…","delivery.notFound":"Эта задача больше недоступна.","delivery.pruned":"Ранние записи о доставке были очищены","delivery.refresh":"Обновить","delivery.retention":"Правила хранения","delivery.retentionBounds":"Каждая задача хранит до {records} записей о доставке за последние {days} дней.","delivery.retentionExplanation":"При сохранении новой записи старые записи за пределами этих ограничений очищаются автоматически. Очистка записей не останавливает задачу.","delivery.retry":"Повторить","detail.close":"Закрыть сведения","detail.frequency":"Частота","detail.id":"ID задачи","detail.instruction":"Инструкция задачи автоматизации","detail.label":"Сведения о задаче","detail.missing":"Задача недоступна. Возможно, она была удалена.","detail.more":"Действия с задачей автоматизации","detail.name":"Название задачи автоматизации","detail.next":"Следующее запланированное время","detail.nextRun":"Следующий запуск","detail.openSession":"Связанная сессия: открыть исходную сессию","detail.openSessionTitle":"Связанная сессия {title}: открыть исходную сессию","detail.records":"Записи о доставке","detail.rule":"Правила","detail.session":"Связанная сессия","detail.sessionArchived":"Исходная сессия находится в архиве.","detail.sessionLoading":"Загрузка сведений об исходной сессии.","detail.sessionUnavailable":"Исходная сессия недоступна.","detail.status":"Состояние","detail.tabs":"Разделы сведений о задаче","empty.action":"Новая задача автоматизации","frequency.every":"Каждые {value} {unit}","frequency.once":"Один раз","list.empty":"Задач пока нет. Задачи, созданные в ваших сессиях, появятся здесь.","list.emptyInactive":"Нет неактивных задач автоматизации","list.error":"Не удалось загрузить задачи.","list.label":"Каталог задач","list.loading":"Загрузка задач…","list.nextPrefix":"Следующее запланированное время: ","list.noMatches":"Нет подходящих задач","list.retry":"Повторить","new.action":"Создать","panel":"Задачи автоматизации","rule.cancel":"Отмена","rule.cron":"Своё расписание","rule.cronInvalid":"Введите cron-выражение из пяти полей, например 0 9 * * 1-5.","rule.cronLabel":"Cron-выражение","rule.daily":"Каждый день","rule.error.conflict":"Задача изменилась до сохранения обновления. В строке показано сохранённое правило; попробуйте снова.","rule.error.notFound":"Эта задача больше недоступна.","rule.error.unknown":"Не удалось подтвердить обновление правила. В строке показано сохранённое правило.","rule.everyHours":"Каждые N часов","rule.everyMinutes":"Каждые N минут","rule.everySeconds":"Каждые N секунд","rule.invalidPrompt":"Введите инструкцию задачи.","rule.invalidTitle":"Введите название задачи не длиннее 120 символов.","rule.once":"Один раз","rule.repeat":"Повтор","rule.save":"Сохранить изменения","rule.saving":"Сохранение…","rule.title":"Время запуска","rule.unsaved":"Несохранённые изменения","rule.weekday":"День недели","rule.weekdayOption":"День недели {weekday}","rule.weekdays":"С понедельника по пятницу","rule.weekly":"Еженедельно","rule.zone.system":" (системная)","search.clear":"Очистить поиск","search.label":"Поиск задач","search.placeholder":"Поиск задач автоматизации","status.active":"Включена","status.inactive":"Неактивна","statusFilter.all":"Все","statusFilter.label":"Состояние задачи","timing.conflict":"Задача изменилась во время редактирования. Ваш черновик сохранён. Отмените и откройте заново после обновления, чтобы изменить актуальное правило.","timing.date":"Дата","timing.error":"Не удалось подтвердить обновление времени. Ваш черновик сохранён. Проверьте задачу перед повторной попыткой.","timing.hour":"Час","timing.inactive":"Неактивные задачи доступны только для чтения. Их время изменить нельзя.","timing.interval":"Повторять каждые","timing.intervalDecrease":"Уменьшить интервал","timing.intervalHint.hour":"Не менее 1 часа. Интервал отсчитывается от создания задачи или последнего изменения правила и не зависит от часовых поясов.","timing.intervalHint.minute":"Не менее 1 минуты. Интервал отсчитывается от создания задачи или последнего изменения правила и не зависит от часовых поясов.","timing.intervalHint.second":"Не менее 60 секунд. Интервал отсчитывается от создания задачи или последнего изменения правила и не зависит от часовых поясов.","timing.intervalIncrease":"Увеличить интервал","timing.invalid":"Введите допустимые дату и время или проверьте поля времени.","timing.invalidInterval":"Введите интервал не менее 1 минуты.","timing.invalidInterval.hour":"Введите интервал не менее 1 часа.","timing.invalidInterval.minute":"Введите интервал не менее 1 минуты.","timing.invalidInterval.second":"Введите интервал не менее 60 секунд.","timing.invalidZone":"Введите допустимый часовой пояс IANA, например Asia/Shanghai.","timing.minute":"Минута","timing.nextMonth":"Следующий месяц","timing.notFound":"Эта задача больше недоступна. Ваш черновик сохранён; отмените, чтобы закрыть редактор.","timing.notFuture":"Выберите дату и время в будущем.","timing.prevMonth":"Предыдущий месяц","timing.second":"Секунда","timing.time":"Время","timing.unit.hour":"часов","timing.unit.minute":"минут","timing.unit.second":"секунд","timing.zone":"Часовой пояс","timing.zoneNoResults":"Нет подходящих часовых поясов","timing.zoneNoStored":"Разовая задача хранит только целевой момент, а не часовой пояс. Дата и время интерпретируются в выбранном часовом поясе.","timing.zoneSearch":"Поиск по смещению UTC, ID IANA или городу","title":"Задачи автоматизации","toast.deleteFailed":"Не удалось удалить задачу.","toast.deleted":"Задача удалена.","tool.invoked":"Вызван {name}"},"settings.models":{"add":"Добавить провайдера моделей","addCatalog":"Сторонний провайдер моделей","addCatalogExhausted":"Все провайдеры из каталога уже настроены.","addCatalogHint":"Выберите OpenAI, Anthropic, Kimi или другого провайдера из встроенного каталога и введите его ключ API.","addCustom":"Свой API моделей","addCustomHint":"Подключите ретранслятор, собственный сервер или любой другой адрес API, совместимый с OpenAI или Anthropic, указав базовый URL, протокол и модели.","addCustomUnavailable":"Нет доступного протокола API для указания.","addMode":"Способ добавления","addModel":"Добавить модель","advancedHint":"Остальные поля находятся в cordis.patch.yml; измените этот раздел напрямую.","apply":"Применить","applying":"Применение…","baseUrl":"Базовый URL","baseUrlDefault":"По умолчанию у провайдера","cancel":"Отмена","close":"Закрыть","conflict":"Кто-то другой изменил эти настройки, пока карточка была открыта. Закройте её и откройте заново, чтобы изменить текущие значения.","contextWindow":"Окно контекста","contextWindowPlaceholder":"Используется значение провайдера по умолчанию","create":"Создать провайдера","creating":"Создание…","credentialConfigured":"Ключ API настроен","credentialMissing":"Ключ API отсутствует","customAnthropicBaseUrlPlaceholder":"https://gateway.example","customApi":"Протокол API","customApiUnset":"Не выбран","customBaseUrlInvalid":"Введите допустимый URL HTTP или HTTPS.","customBaseUrlPlaceholder":"https://gateway.example/v1","customDisplayName":"Отображаемое имя","customNeedsBaseUrl":"Для своего провайдера нужен базовый URL.","customNeedsModels":"Для своего провайдера нужна хотя бы одна модель.","customRoute":"ID провайдера","customRouteHint":"Идентификатор из строчных букв, начинающийся с буквы, который однозначно называет этого провайдера в запросах и служит именем его учётных данных.","customRouteInvalid":"Начните со строчной буквы; далее строчные буквы, цифры и дефисы.","customRouteTaken":"Этот ID уже используется другим провайдером.","customTag":"Свой","customized":"Изменённые настройки","deepSeekAccount":"Аккаунт DeepSeek","deepSeekBaseUrl":"https://api.deepseek.com/anthropic","deepSeekEndpointHint":"Используйте адрес API, совместимый с Anthropic Messages.","deleteConfirm":"Удалить {provider}","deleteDescription":"Удаление {provider} убирает его конфигурацию. Используемые им учётные данные управляются в другом месте и будут сохранены.","deleteDescriptionWithCredential":"Удаление {provider} убирает его конфигурацию и сохранённый ключ API.","deleteTitle":"Удалить {provider}?","deleting":"Удаление {provider}…","edit":"Изменить","editProvider":"Изменить {provider}","fetchAdopt":"Добавить выбранные","fetchDescription":"Это модели, доступные у данного провайдера. Выберите те, которые нужно добавить.","fetchDeselectAll":"Снять выделение","fetchEmpty":"Провайдер не вернул список моделей. Добавьте их вручную.","fetchModels":"Получить доступные модели","fetchNeedsBaseUrl":"Сначала введите базовый URL, затем получите список.","fetchNoMatches":"Нет подходящих моделей.","fetchSearch":"Поиск моделей","fetchSelectAll":"Выбрать все","fetchTitle":"Выберите модели для добавления","fetching":"Запрос к провайдеру…","intro":"Введите ключи API, чтобы использовать модели следующих провайдеров.","keyBlank":"Введите ключ API или оставьте поле пустым, чтобы сохранить текущий.","keyBlankNew":"Введите ключ API или оставьте поле пустым, если этот провайдер использует другую аутентификацию.","keyEnvLocked":"Задан средой запуска (только чтение)","keyIllegalCharacters":"Этот ключ API имеет недопустимый формат. Проверьте его.","keyInput":"Ключ API","keyPlaceholder":"Введите ключ API","keyPlaceholderNative":"Введите ключ API или оставьте поле пустым для аутентификации через среду","keyRequired":"Введите ключ API, чтобы продолжить.","keyStored":"Настроен — введите новое значение для замены","loadFailed":"Не удалось загрузить каталог провайдеров","maxTokens":"Максимум выходных токенов","maxTokensPlaceholder":"Используется значение провайдера по умолчанию","model":"Модель","modelAdvanced":"Параметры модели","modelCapacityInvalid":"Ёмкость должна быть числом, при необходимости с суффиксом K или M.","modelContextInvalid":"Окно контекста должно быть положительным числом, например 131072, 256K или 1M.","modelDuplicate":"Каждый ID модели может встречаться один раз.","modelId":"ID модели","modelIdDuplicate":"ID модели должен быть уникальным.","modelIdRequired":"Требуется ID модели.","modelInputImage":"Изображение","modelInputText":"Текст","modelInputTypes":"Типы входных данных","modelMaxTokensInvalid":"Максимум выходных токенов должен быть положительным числом, например 8192, 64K или 1M.","modelName":"Отображаемое имя","modelNameInvalid":"Отображаемое имя не может быть пустым.","modelNamePlaceholder":"Если пусто, используется ID модели","models":"Модели","modelsCustomized":"Изменённый каталог моделей","modelsEmpty":"В списке выбора не будет моделей. ID вне списка всё равно можно отправлять напрямую.","modelsInherited":"Используются значения адаптера по умолчанию","nav":"Модели","onboardingDescription":"Настройте официального провайдера DeepSeek, чтобы начать работу.","onboardingLater":"Настроить позже","onboardingSave":"Сохранить и продолжить","onboardingSaving":"Сохранение…","onboardingTitle":"Добавьте ключ API, чтобы начать","protocolAnthropicMessages":"Anthropic Messages","protocolOpenAiCompletions":"OpenAI Chat Completions","protocolOpenAiResponses":"OpenAI Responses","provider":"Провайдер","readOnly":"Документ настроек доступен только для чтения в этом развёртывании.","remove":"Удалить","removeModel":"Удалить модель","removeProvider":"Удалить {provider}","resetModels":"Восстановить значения по умолчанию","retry":"Повторить","savedProvider":"{provider} сохранён.","settingsPathUnresolvable":"неразрешимый путь настроек","title":"Модели","welcomeBody":"DeepSeek Harness 0.2 всё ещё находится в предварительной версии, и многие области требуют дальнейшего улучшения и доработки. Мы рады отзывам и предложениям от всех разработчиков и пользователей. Новое настольное приложение теперь рассчитано на широкий круг пользователей, а расширенные функции для разработчиков можно включить в настройках. Продуктовые функции и API плагинов DeepSeek Harness, как ожидается, будут быстро развиваться и со временем постепенно стабилизируются.\n\nМы надеемся вместе с пользователями и разработчиками по всему миру исследовать пределы интеллекта, опираясь на открытую, переиспользуемую и компонуемую инфраструктуру. Приглашаем всех воплощать свои идеи с помощью DeepSeek Harness и участвовать в сообществе, обогащая экосистему плагинов.","welcomeContinue":"Продолжить","welcomeError":"Не удалось сохранить подтверждение. Попробуйте ещё раз.","welcomeTitle":"Уведомление о предварительной версии"},"deliverables":{"changes.added":"+{count}","changes.all":"Все {count} файлов","changes.binary":"двоичный","changes.collapse":"Свернуть","changes.collapseAria":"Свернуть изменённые файлы","changes.deleted":"-{count}","changes.expandAria":"Показать все {count} изменённых файлов","changes.openReview":"Проверить изменения этого хода в боковой панели","changes.oversized":"слишком большой","changes.singleTitle":"Изменён {name}","changes.title":"Изменено {count} файлов","changes.viewDiff":"Показать изменения в {name}","diff.binary":"Двоичный файл; изменения нельзя показать","diff.coarse":"Сравнение строк заняло слишком много времени; показана полная замена файла","diff.created":"Создан в этом ходе","diff.deleted":"Удалён в этом ходе","diff.error":"Не удалось прочитать изменения","diff.loading":"Чтение изменений…","diff.missing":"Содержимое изменений этого хода больше недоступно","diff.oversized":"Файл слишком большой; изменения нельзя показать","diff.truncated":"Показаны первые {count} строк","diff.unchanged":"Обе стороны содержат одинаковые строки","presented.all":"Все {count} файлов","presented.collapse":"Свернуть","presented.collapseAria":"Свернуть переданные файлы","presented.directoryError":"Не удалось открыть содержащую папку. Попробуйте ещё раз.","presented.directoryOpened":"Запрошено открытие содержащей папки","presented.directoryOpening":"Открытие содержащей папки…","presented.error":"Не удалось открыть. Нажмите, чтобы повторить.","presented.expandAria":"Показать все {count} переданных файлов","presented.file":"Файл","presented.hostError":"Не удалось прочитать сведения о рабочем столе хоста","presented.nativeUnavailable":"Для этого файла нет доступного пути на хосте. Просмотрите его в боковой панели.","presented.opened":"Открытие запрошено","presented.opening":"Открытие…","presented.preview":"Просмотр в боковой панели","presented.previewButton":"Открыть {name} в боковой панели","presented.previewCard":"Просмотреть {name} в боковой панели","presented.retry":"Повторить","presented.revealError":"Не удалось показать в файловом менеджере. Попробуйте ещё раз.","presented.revealed":"Запрошен показ в файловом менеджере","presented.revealing":"Показ в файловом менеджере…","presented.unavailable":"На этом хосте нет рабочего стола для открытия файлов и папок во внешних приложениях. Файлы по-прежнему можно просматривать в боковой панели.","review.nowrap":"Отключить перенос строк","review.openFile":"Открыть весь файл в боковой панели","review.openFileAria":"Открыть {name} в боковой панели","review.selectFile":"Выберите файл для проверки","review.split":"Переключить на разделённый вид","review.splitAria":"Разделённый вид","review.title":"Проверка · ход {turn}","review.unified":"Переключить на единый вид","review.wrap":"Включить перенос строк","review.wrapAria":"Перенос строк","row.error":"Не удалось передать","row.inspect":"Проверить вызов","row.ok":"Передано","row.preparing":"Подготовка результатов","row.running":"Передача","row.stopped":"Прервано","row.title":"Показать файлы"},"settings.account":{"accountInfo":"Подробнее об учётной записи","addApiKey":"Добавить API Key","backToHarness":"Вернуться в DeepSeek Harness","balance":"Пополненный баланс","balanceSignedOut":"Войдите, чтобы увидеть","balanceUnavailable":"Смотреть на платформе","bonusBalance":"Начисленный баланс","bonusNoticeTitle":"Бонус начислен","browserDescription":", затем откройте её в браузере, чтобы завершить вход.","browserPrompt":"Страница не открылась автоматически? ","browserTitle":"Ожидание входа","cancel":"Отмена","close":"Закрыть","completing":"Завершение входа…","contactUs":"Обратная связь","copiedLink":"Ссылка скопирована","copyFailed":"Не удалось скопировать","copyLink":"Скопировать ссылку для входа","expired":"Вход истёк. Попробуйте ещё раз.","failed":"Не удалось выполнить операцию. Попробуйте ещё раз.","failureTitle":"Не удалось войти","initializing":"Начало входа…","loading":"Загрузка…","loginDescription":"Войдите в свою учётную запись DeepSeek или добавьте API Key, чтобы начать. Ваши проекты и файлы хранятся локально.","loginTitle":"Начните работу","menu":"Меню учётной записи","modelSignInRequired":"Модель недоступна. Войдите и попробуйте ещё раз.","more":"Ещё","nav":"Учётная запись","onboardingArtworkLocale":"ru","onboardingBack":"Назад","onboardingBrand":"DeepSeek Harness","onboardingCompact":"Только результаты","onboardingCompactDescription":"Показывать только результаты в простом и понятном интерфейсе","onboardingContinue":"Продолжить","onboardingCredit":"Добавить кредиты","onboardingCreditDescription":"DeepSeek Harness списывает кредиты в зависимости от токенов, использованных моделями и инструментами. Добавьте кредиты заранее, чтобы задачи выполнялись без перерывов. Ваш баланс расходуется только пока агент работает над задачей.","onboardingDetailed":"Все подробности","onboardingDetailedDescription":"Показывать весь процесс для удобной отладки и поиска неполадок","onboardingDevelopment":"Программирование и разработка","onboardingDevelopmentDescription":"Правка кода, отладка, выполнение команд, работа с файлами проекта и многое другое","onboardingEnter":"Открыть приложение","onboardingFundedTopUp":"Добавить кредиты","onboardingGoTopUp":"Добавить кредиты","onboardingIntroduction":"DeepSeek Harness работает в локальной папке и с помощью инструментов читает и записывает файлы на вашем компьютере. Он помогает изучать и упорядочивать информацию, создавать документы и таблицы, писать код, устранять неполадки и многое другое.","onboardingKeepSetting":"Продолжить настройку","onboardingLater":"Далее","onboardingLoading":"Загрузка настроек…","onboardingNoCreditDescription":"DeepSeek Harness не может начинать новые задачи без кредитов. Вы можете добавить их позже в разделе «Настройки» → «Учётная запись».","onboardingNoCreditTitle":"Пропустить добавление кредитов?","onboardingOffice":"Офисная и творческая работа","onboardingOfficeDescription":"Работа с документами, упорядочивание данных, создание презентаций и многое другое","onboardingProcess":"Сколько подробностей вы хотите видеть?","onboardingProcessDescription":"Это меняет только отображение хода работы, а не возможности DeepSeek Harness.","onboardingPurposeDescription":"Мы настроим интерфейс и инструменты под ваш стиль работы.","onboardingPurposePrefix":"С чем вы хотите","onboardingPurposeSuffix":"работать?","onboardingRetry":"Повторить","onboardingSaveFailed":"Не удалось сохранить настройки. Попробуйте ещё раз.","onboardingSkip":"Пропустить","onboardingSkipDescription":"Вы в любой момент можете изменить отображение хода работы, производительности и использования или включить инструменты программирования в разделе «Настройки» → «Общие».","onboardingSkipTitle":"Пропустить настройку?","onboardingStandard":"Ключевые подробности","onboardingStandardDescription":"Акцент на результатах, показаны только самые важные шаги и действия","onboardingStart":"Начать работу","onboardingTopUp":"Добавить кредиты","onboardingUnderstood":"Понятно","onboardingWelcome":"Добро пожаловать в","open":"Открыть браузер","platformFailed":"Не удалось выполнить операцию. Попробуйте ещё раз.","platformRetry":"Повторить","profileUnavailable":"Сведения об учётной записи пока недоступны.","quotaDescription":"DeepSeek Harness не может начать новую задачу с этой учётной записью, когда баланс недоступен. Хотите пополнить баланс? Это также можно сделать позже в разделе «Настройки» → «Учётная запись».","quotaTitle":"Баланс недоступен","quotaTopUp":"Пополнить","retry":"Войти снова","sessionExpired":"Вы вышли из учётной записи, войдите снова.","settings":"Настройки","settingsSignedOutDescription":"Войдите в DeepSeek Harness, чтобы получить свой выделенный API Key","settingsSignedOutTitle":"Вы не вошли в DeepSeek Harness","signIn":"Войти","signInDescription":"Используйте свою учётную запись DeepSeek, чтобы начать.","signOut":"Выйти","signOutDescription":"Выход не удалит данные. Вы сможете снова войти в эту учётную запись.","signOutRunningDescription":"Сейчас выполняются задачи. Выход прервёт их. Выйти сейчас?","signOutUnknownDescription":"Не удалось проверить выполняемые задачи. Выход может прервать задачи, использующие эту учётную запись. Выйти сейчас?","signedIn":"Вы вошли в DeepSeek","signedOut":"Вы не вошли","timeoutDescription":"Войдите снова, чтобы продолжить.","timeoutTitle":"Время входа истекло","topUp":"Пополнить","usage":"Смотреть использование","waiting":"Продолжите в браузере"},"workspace":{"actions.archive":"В архив","actions.newSession":"Новая сессия","actions.newSession.aria":"Новая сессия в {name}","actions.pin":"Закрепить","actions.session.aria":"Действия с сессией {name}","actions.unarchive":"Вернуть из архива","actions.unpin":"Открепить","actions.workspace.aria":"Действия с рабочей областью {name}","archive.confirm.action":"Остановить и архивировать","archive.confirm.activity":"Работа, которая будет остановлена","archive.confirm.desc":"В «{title}» ещё есть незавершённая работа. Архивирование сначала остановит её; позже вы сможете восстановить сессию с помощью фильтра «Все беседы (показывать архив)» в боковой панели, а остановленная работа не возобновится сама.","archive.confirm.jobs.one":"{n} фоновая задача: {names}","archive.confirm.jobs.other":"{n} фоновых задач: {names}","archive.confirm.listSeparator":", ","archive.confirm.other.one":"{n} другой элемент работы ({kind})","archive.confirm.other.other":"{n} других элементов работы ({kind})","archive.confirm.pending":"Остановка и архивирование…","archive.confirm.schedules.one":"{n} запланированное напоминание: {names}","archive.confirm.schedules.other":"{n} запланированных напоминаний: {names}","archive.confirm.subagents.one":"{n} работающий субагент: {names}","archive.confirm.subagents.other":"{n} работающих субагентов: {names}","archive.confirm.title":"Остановить и архивировать эту сессию?","archive.confirm.turn":"Текущий ход","conflict.named":"Рабочая область с именем «{name}» уже существует.","date.ymd":"{y}-{m}-{d}","defaultWorkspace.failed":"Не удалось создать рабочую область по умолчанию. Выберите папку с помощью пункта «Выбрать рабочую область».","delete.desc":"Это удалит «{name}» из списка рабочих областей. Папка и журналы сессий сохранятся. Её сессии появятся в разделе «Без группы».","delete.pending":"Удаление рабочей области…","delete.workspace":"Удалить рабочую область","empty.noMatches":"Нет совпадений","empty.none":"Сессий пока нет","empty.noneArchived":"Архивных сессий пока нет","empty.viewOthers":"Посмотреть другие сессии","field.sessionName":"Имя сессии","field.workspaceName":"Имя рабочей области","filterBy.label":"Фильтр сессий","folderError.retry":"Выбрать снова","folderError.title":"Не удалось открыть папку","group.ungrouped":"Без группы","groupBy.flat":"Одним списком","groupBy.label":"Группировать по","groupBy.workspace":"Рабочая область","groupBy.workspaceTree":"Дерево рабочих областей","hover.copied":"Скопировано","hover.created":"Создано {time}","menu.addWorkspace":"Добавить рабочую область…","menu.archiveSession":"Архивировать сессию","menu.fork":"Ответвить сессию","menu.pinSession":"Закрепить сессию","menu.unarchiveSession":"Вернуть сессию из архива","menu.unpinSession":"Открепить сессию","orderBy.label":"Сортировать по","orderBy.manual":"Вручную","orderBy.updated":"Последнее обновление","picker.loading":"Загрузка рабочих областей…","rename":"Переименовать","rename.session.title":"Переименовать сессию","rename.workspace.title":"Переименовать рабочую область","row.archived":"В архиве","row.pinned":"Закреплено","search.clear":"Очистить поиск","search.hasMore":"Показаны первые {n} результатов. Уточните запрос.","search.noMatches":"Нет подходящих сессий","search.pending":"Поиск по истории сессий…","search.placeholder":"Поиск по именам сессий","search.results.aria":"Результаты поиска","search.sessions.aria":"Поиск сессий","section.sessions":"Сессии","section.workspaces":"Рабочие области","session.new":"Новая сессия","session.untitled":"Без названия","sessions.collapse":"Показать меньше","sessions.count.one":"{n} сессия","sessions.count.other":"{n} сессий","sessions.expand":"Показать ещё {n} сессий","shortcut.directoryBusy":"Выбор или добавление рабочей области","shortcut.forkFailed":"Не удалось ответвить сессию. Попробуйте ещё раз.","shortcut.noCompletedTurn":"В этой сессии нет завершённых ходов","shortcut.noPicker":"Выбор папки недоступен","shortcut.noSession":"Сначала выберите сессию","status.compact.answer":"Ответ","status.compact.approval":"Подтверждение","status.compact.planReview":"Проверка плана","status.completed":"Завершено","status.idle":"Без действий","status.planReview":"План ожидает проверки","status.running":"Выполняется","status.subagentsRunning.one":"{n} субагент работает","status.subagentsRunning.other":"{n} субагентов работают","status.waitingAnswer":"Ожидание ответа","status.waitingApproval":"Ожидание подтверждения","time.ago":"{t} назад","time.days":"{n} дн.","time.hours":"{n} ч","time.minutes":"{n} мин","time.months":"{n} мес.","time.now":"сейчас","time.years":"{n} г.","toast.archived":"Сессия архивирована. Вы можете ","toast.archivedFilter":"отфильтровать архивные сессии","toast.archivedNotOpenable":"Архивные сессии нельзя открыть. Верните её из архива для просмотра.","toast.archivedOr":" или ","toast.archivedUndo":"отменить","toast.createFailed":"Не удалось создать сессию: {message}","toast.pinFailed":"Не удалось закрепить. Попробуйте позже.","toast.stoppedAndArchived":"Сессия остановлена и архивирована. Вы можете ","toast.unpinFailed":"Не удалось открепить. Попробуйте позже.","viewOptions.hideArchived":"Скрыть архив","viewOptions.label":"Параметры вида","viewOptions.onlyArchived":"Только архив","viewOptions.showArchived":"Все беседы (показывать архив)","workspace.add":"Добавить рабочую область"},"common":{"back":"Назад","brand.localBuild":"DSH Local Build","cancel":"Отмена","close":"Закрыть","codeBlock.title":"Блок кода","codeBlock.unwrap":"Не переносить строки","codeBlock.wrap":"Переносить строки","collapse":"Свернуть","copied":"Скопировано","copy":"Копировать","copy.compactJson":"Копировать сжатый JSON","copy.failed":"Не удалось скопировать","copy.json":"Копировать JSON","copy.optionsHint":"{action}; правый щелчок — варианты копирования","copy.path":"Копировать путь свойства","copy.prettyJson":"Копировать форматированный JSON","copy.value":"Копировать значение","delete":"Удалить","edit":"Изменить","expand":"Развернуть","json.label":"JSON","load.failed":"Не удалось загрузить","loading":"Загрузка…","markdown.footnotes":"Сноски","markdown.truncatedCharacters":"… обрезано на {total} символах","more":"Ещё","next":"Далее","none":"Нет","number.million":"{value} млн","number.thousand":"{value} тыс.","ok":"ОК","previous":"Назад","retry":"Повторить","save":"Сохранить","search":"Поиск","skip":"Пропустить","submit":"Отправить","submitting":"Отправка…","truncated":"Обрезано","unknown":"Неизвестно","workspace.defaultName":"Рабочая область по умолчанию"},"cordis":{"a11y.defining":"Определение плагина","a11y.failed":"Не удалось определить","a11y.preparing":"Подготовка вызова инструмента Cordis","a11y.stopped":"Определение прервано","action.approve":"Разрешить","action.approveOnce":"Разрешить только эту версию","action.approvePlugin":"Разрешить будущие версии этого плагина","action.decline":"Отклонить","action.inspect":"Просмотреть","action.remove":"Удалить","action.retry":"Повторить","action.rollback":"Откатить","action.run":"Запустить","action.stop":"Остановить","body.clientCode":"Клиент","body.copied":"Скопировано","body.copy":"Копировать","body.hostCode":"Хост","body.output":"Результат","body.source":"Исходный код плагина","panel.approvals.aria":"Подтверждения Cordis","panel.current":"Текущий: {packageId}","panel.empty":"Плагины пока не определены","panel.group.current":"Эта сессия","panel.group.others":"Другие сессии","panel.hint":"Управление запуском — в панели Cordis над разделом «Настройки»","panel.loading":"Чтение…","panel.next":"Следующий: {packageId}","panel.plugins.aria":"Плагины Cordis","panel.readFailed":"Не удалось прочитать инвентарь плагинов: {message}","panel.runningCount":"запущено: {count}","panel.title":"Плагины Cordis","panel.trigger":"Плагин Cordis","panel.version":"Версия","purpose.missing":"(назначение не указано)","render.failedAbdicated":"Сбой отрисовки в {slot}; восстановлен интерфейс по умолчанию:","render.failedHeld":"Сбой отрисовки в {slot}:","row.defineTitle":"Зарегистрировать плагин Cordis","row.removeTitle":"Удалить плагин Cordis","row.runTitle":"Запустить плагин Cordis","row.stopTitle":"Остановить плагин Cordis","row.updateTitle":"Обновить плагин Cordis","run.removed":"Этот пакет больше не существует","run.superseded":"Ниже доступна карточка более нового запуска","status.awaitingApproval":"Ожидает подтверждения","status.clientPending":"Клиент готов к активации","status.failed":"Сбой запуска","status.idle":"Готов","status.removed":"Удалён","status.running":"Выполняется","status.superseded":"Доступен новый запуск"},"job":{"count.idle.one":"{count} фоновая задача","count.idle.other":"{count} фоновых задач","count.live.one":"{count} фоновая задача выполняется","count.live.other":"{count} фоновых задач выполняется","duration.hours":"{hours} ч {minutes} мин","duration.minutes":"{minutes} мин {seconds} с","duration.seconds":"{seconds} с","duration.title.done":"Заняло {duration}","duration.title.live":"Выполняется {duration}","kill.confirm":"Нажмите ещё раз для подтверждения","kill.confirmAction":"Подтвердить остановку","kill.failed":"Не удалось остановить","kill.stop":"Остановить задачу {label}","list.aria":"Фоновые задачи","output.error":"поток вывода прерван: {error}","output.gap":"… ранний вывод отброшен …","row.collapseAria":"Скрыть вывод в реальном времени для {label}","row.expandAria":"Показать вывод в реальном времени для {label}","section.clear":"Очистить","section.live":"Выполняется","section.settledCount":"Завершено {count}","status.completed":"завершено","status.failed":"сбой","status.killed":"отменено","status.running":"выполняется","status.stopping":"остановка","terminal.collapse":"Свернуть","terminal.collapseAria":"Свернуть вывод","terminal.copied":"Скопировано","terminal.copy":"Копировать","terminal.done":"готово","terminal.exitCode":"код выхода {code}","terminal.expand":"Показать ещё {n} строк","terminal.expandAria":"Развернуть {n} скрытых строк вывода","terminal.failed":"сбой","terminal.noExitCode":"нет кода выхода","terminal.noOutput":"(нет вывода)","terminal.running":"выполняется","terminal.signal":"сигнал {signal}"},"settings.pluginInventory":{"active":"Работает","clientSyncFailed":"Часть плагинов не удалось синхронизировать на этой странице. Включение на хосте не изменилось.","clientSyncRetry":"Повторить для страницы","clientSyncing":"Синхронизация плагинов на этой странице…","condition":"Отключён, когда","conditionalTag":"Условный","configuration":"Конфигурация","countUnit":"плагинов","disabledTag":"Отключён","empty":"Плагины недоступны.","emptySearch":"Подходящих плагинов нет.","enabledIn":"Включён в","enabledTag":"Включён","error":"Плагины временно недоступны.","failed":"Не удалось запустить","failedCountLabel":"сбоев","failedTag":"Сбой","fromPreset":"Из","globalSubtitle":"Общие для системы и всех сессий","globalTitle":"Глобальные плагины","loading":"Чтение плагинов…","loadingPhase":"Загрузка","matchesInOtherPresets":"Ещё {count} совпадений в других наборах: ","metadataError":"Ошибка метаданных пакета: {error}","moduleLabel":"Модуль","pending":"Ожидание зависимостей","presetEnabledTag":"Через наборы","presetOptionBroken":"{name} (не удалось загрузить)","presetOptionDefault":"{name} (по умолчанию)","presetProvidedDetail":"Отключён глобально; наборы агента предоставляют его каждой сессии","presetSubtitle":"Собираются для каждой сессии наборами агента","presetTitle":"Плагины сессии","retry":"Повторить","runtime":"Состояние","search":"Поиск плагинов","switcherLabel":"Выберите набор агента для просмотра","tab":"Список плагинов","unloading":"Выгрузка","unobserved":"Не запущен","viewInPreset":"Показать в группе набора"},"shortcuts":{"application":"Приложение","approval":"Область подтверждения","cancel":"Отмена","clear":"Удалить","clear-search":"Очистить поиск","close":"Закрыть сочетания клавиш","close-confirmation":"Закрыть подтверждение","conflict":"Уже используется в «{commands}»","description":"Просмотр и изменение доступных сочетаний клавиш и действий ввода","desktop-document":"userData/keybindings.json","desktop-reload":"перезапустите Harness","dismiss":"Закрыть меню или верхний диалог","edit-label":"Изменить сочетание клавиш для {command}","empty":"Подходящих сочетаний клавиш нет","future":"Конфигурация сочетаний клавиш в {location} создана более новой версией. Обновите Harness и повторите попытку.","global-hint":"Открывать из любого места","input":"Поле ввода сообщения","invalid":"Конфигурация сочетаний клавиш в {location} повреждена. Сделайте резервную копию, исправьте конфигурацию, затем {reload}.","macos-web-help":"Используйте Command+/, Command+,, Command+Backslash, Control+Backquote, Command+Option+клавиша или Command+Shift+клавиша. Поддерживаются также комбинации с тремя или четырьмя разными модификаторами. Сочетания браузера или системы могут не доходить до страницы.","menus":"Меню и диалоги","modified-count":"Изменено: {count}","modifier-required":"Включите в комбинацию Command, Ctrl или Alt.","move":"Перемещение по меню","native-failed":"Не удалось защитить запись клавиш в приложении. Выйдите из записи и повторите попытку.","not-ready":"Сочетания клавиш не готовы. Повторите попытку.","open":"Открыть сочетания клавиш","read":"Не удалось прочитать {location}. Проверьте права доступа, затем {reload}.","record":"Нажмите сочетание клавиш","record-help":"Отпустите клавиши для сохранения. Tab переключает действия; Esc отменяет.","reserved":"Эта комбинация зарезервирована для системных действий или действий редактирования текста.","reset":"Вернуть значение по умолчанию","reset-all":"Вернуть все значения по умолчанию","reset-description":"Вернуть сочетания клавиш по умолчанию для этой платформы. Все изменённые или удалённые сочетания будут восстановлены. Другие платформы не затрагиваются.","reset-failed":"Не удалось вернуть значения по умолчанию. Ваши сочетания клавиш не изменились. Повторите попытку.","reset-saved":"Сочетания клавиш по умолчанию восстановлены","reset-title":"Вернуть все сочетания клавиш по умолчанию?","retry-save":"Повторить сохранение","review":"Я просмотрел последнюю конфигурацию","saved":"Изменено","search":"Поиск сочетаний клавиш","select":"Выбор пункта меню","settings":"Сочетания клавиш","stale":"Конфигурация сочетаний клавиш или доступные команды изменились. Просмотрите последние привязки перед сохранением.","title":"Сочетания клавиш","too-many-keys":"Удерживайте не более двух клавиш, не считая модификаторов. Отпустите клавиши и повторите попытку.","unbound":"Нет сочетания","unsupported-browser":"Этот браузер пока не поддерживает такую комбинацию.","unsupported-key":"Эта клавиша не поддерживается.","using-accepted":"Активны последние успешно прочитанные привязки.","using-defaults":"Активны привязки по умолчанию.","view":"Изменить сочетания клавиш","web-document":"запись dsh.keybindings.v1 в localStorage этого сайта","web-help":"Комбинации браузера: Mod+/, Mod+Shift+,, Mod+Shift+.. Mod — это Command на Mac и Ctrl на других системах.","web-reload":"перезагрузите страницу","windows-web-help":"Используйте Ctrl+/, Ctrl+,, Ctrl+Alt+клавиша или Ctrl+Shift+клавиша. Поддерживаются также комбинации с тремя или четырьмя разными модификаторами. Сочетания браузера или системы могут не доходить до страницы.","write-failed":"Не удалось сохранить. Ваши прежние сочетания клавиш и текущий черновик сохранены. Повторите попытку."},"subagent":{"activity.completed":"завершён","activity.inactive":"не выполняется","activity.running":"выполняется","branch.collapse":"Свернуть потомков {label}","branch.expand":"Развернуть потомков {label}","count.running.one":"{count} субагент выполняется","count.running.other":"{count} субагентов выполняется","count.total.one":"{count} субагент","count.total.other":"{count} субагентов","duration.days":"{days} д","duration.daysHours":"{days} д {hours} ч","duration.exactDays":"{days} д {hours} ч {minutes} мин {seconds} с","duration.exactTitle":"Общее время активности: {duration}","duration.hours":"{hours} ч {minutes} мин {seconds} с","duration.minutes":"{minutes} мин {seconds} с","duration.months":"~{months} мес","duration.monthsDays":"~{months} мес {days} д","duration.seconds":"{seconds} с","duration.years":"~{years} г","duration.yearsMonths":"~{years} г {months} мес","load.error":"Не удалось загрузить субагентов","loading.label":"Загрузка субагентов…","mode.continuable":"продолжаемый","mode.oneShot":"одноразовый","mode.unknown":"режим неизвестен","open.sidebar":"Открыть в боковой панели","open.sidebar.aria":"Открыть {label} в боковой панели","readonly.body":"Родительская сессия не в сети; откройте её снова, чтобы продолжить отправку сообщений.","readonly.oneShot.body":"Одноразовые задачи не принимают продолжений; здесь доступна полная запись выполнения.","readonly.oneShot.title":"Запись одноразового субагента","readonly.title":"Этот субагент пока доступен только для чтения","readonly.unknown.body":"Откройте дочернюю сессию, чтобы определить, можно ли её продолжить.","retry":"Повторить","sidebar.chat":"Чат","switcher.aria":"Переключить субагента: {title}","tokens.million":"{value} млн токенов","tokens.thousand":"{value} тыс. токенов","tokens.total":"{value} токенов","tree.aria":"Сессии субагентов"},"command":{"description.compact":"Сжать старую историю беседы","description.export":"Скачать журнал этой сессии как ZIP-архив","description.feedback":"Оставить отзыв об этой сессии","description.goal":"Задать или посмотреть цель долгой задачи","description.permission":"Переключить пресет разрешений (режим песочницы + политика подтверждений)","description.plan":"Войти в режим планирования или выйти из него","label.compact":"Сжать","label.export":"Экспорт","label.feedback":"Отзыв","label.goal":"Цель","label.permission":"Разрешение","label.plan":"План","listbox.aria":"Совпадений для /{command}","notice.attachmentsUnsupported":"/{command} не принимает вложения; сначала удалите их","overlay.aria":"Параметры /{command}","search.aria":"Фильтр параметров","search.placeholder":"Поиск…","section.add":"Добавить","section.commands":"Команды","status.applying":"Применяю…","status.empty":"Нет параметров","status.loading":"Загружаю параметры…","token.compact":"compact","token.export":"export","token.feedback":"feedback","token.goal":"goal","token.permission":"permission","token.plan":"plan"},"model":{"action.reload":"Обновить","command.description":"Выбрать модель для этой беседы","command.label":"Модель","effort.providerDefault":"По умолчанию","empty.efforts":"Эта модель не задаёт уровни усилия рассуждений.","empty.models":"Модели недоступны.","error.action":"Не удалось выполнить действие с моделью: {message}","error.sessionInUse":"Эта сессия уже используется — возможно, другим запущенным экземпляром DSH (например, dsh web или настольным приложением). Закройте другие запущенные экземпляры DSH и повторите попытку.","menu.aria":"Модель и усилие рассуждений","menu.effort":"Усилие","menu.model":"Модель","option.loadError":"Не удалось загрузить каталог: {message}","provider.account":"Аккаунт DeepSeek","search.clear":"Очистить поиск","search.empty":"Подходящих моделей нет.","search.placeholder":"Поиск моделей…","status.loading":"Обновляю список моделей…","trigger.aria":"Выбрать модель, текущая {model}","trigger.ariaEffort":"Выбрать модель, текущая {model}, усилие рассуждений {effort}","trigger.fallback":"Выбрать модель","trigger.loading":"Загружаю модели…","trigger.selectAria":"Выбрать модель","warning.groupLoad":"Не удалось загрузить {name}: {message}"},"question":{"action.next":"Далее","action.skip":"Пропустить","custom.placeholder":"Введите свой ответ","error.incomplete":"Сначала ответьте на этот вопрос.","error.resubmit":"Ответ не пришёл до продолжения работы; отправьте его снова.","error.unanswered":"Выберите вариант или введите свой ответ.","error.unavailable":"Сейчас отправить нельзя; попробуйте через минуту.","nav.cancel":"Закрыть все вопросы","nav.close":"Закрыть панель — открыть её снова можно из вызова инструмента","nav.maximize":"Развернуть карточку вопроса","nav.minimize":"Свернуть карточку вопроса","nav.next":"Следующий вопрос","nav.prev":"Предыдущий вопрос","option.recommended":"Рекомендуется","plan.approve":"Утвердить","plan.decline":"Отклонить","plan.discuss":"Запросить правки","plan.header":"Проверка плана","reply.answerLabel":"Ответ: ","reply.close":"Закрыть подробности вопроса","reply.label":"Ответить на предыдущие вопросы","reply.open":"Открыть подробности вопроса","reply.skipped":"Пропущено","review.skipped":"Этот вопрос был пропущен.","review.status":"Есть ответ","status.sent":"Ответ отправлен; панель не удалось закрыть.","wait.continued":"Работа продолжилась — вы всё ещё можете ответить","wait.countdown":"Продолжу через {seconds} с","wait.held":"Жду вашего ответа","wait.paused":"Приостановлено · осталось {seconds} с","wait.takeTime":"Не торопить"},"settings":{"close":"Закрыть","connection.connected":"Подключено","connection.connecting":"Переподключение","connection.error":"Нет связи","connection.reconnect":"Связь потеряна, переподключиться сейчас","connection.restart":"Идёт переподключение, переподключиться сейчас","desktop.update.available":"Обновить","desktop.update.checkFailed":"Не удалось проверить обновления. Попробуйте позже.","desktop.update.checkNetworkFailed":"Не удалось проверить обновления. Проверьте соединение и повторите попытку.","desktop.update.checking":"Проверяю обновления…","desktop.update.downloadDetail":"Скачиваю обновление: {percent}%\nЦелевая версия: {version}","desktop.update.downloadFailed":"Не удалось скачать обновление. Попробуйте ещё раз.","desktop.update.downloadNetworkFailed":"Не удалось скачать обновление. Проверьте соединение и повторите попытку.","desktop.update.installFailed":"Не удалось установить обновление. Попробуйте позже.","desktop.update.installNetworkFailed":"Не удалось установить обновление. Проверьте соединение и повторите попытку.","desktop.update.installing":"Готовлю перезапуск…","desktop.update.progress":"{percent}%","desktop.update.ready":"Установить и перезапустить","desktop.update.retry":"Повторить обновление","desktop.update.stopFailed":"Не удалось безопасно остановить задачи. Обновление не установлено. Попробуйте позже.","desktop.update.tasksChanged":"Запустились новые задачи. Подтвердите ещё раз, чтобы остановить задачи и обновить.","desktop.update.tasksUnavailable":"Состояние задач недоступно. Повторите обновление, когда рабочая область будет готова.","desktop.update.verifying":"Проверяю файлы обновления…","desktop.update.versionDetail":"{label}: {version}","developerTools.description":"Показывает траекторию, различия кода и все пресеты агента","developerTools.error":"Не удалось сохранить. Попробуйте ещё раз.","developerTools.title":"Показывать режим разработки","general.currentVersion":"Текущая версия: {version}","general.nav":"Общие","openDocument":"Открыть файл конфигурации","openDocument.error":"Не удалось открыть файл конфигурации","shortcut.open":"Открыть настройки","title":"Настройки","trigger":"Настройки"},"settings.agentPreset":{"brokenBadge":"Не удалось загрузить","builtInGroup":"Встроенные","close":"Закрыть","creatorDraft":"Пусть агент поможет создать пресет","customGroup":"Пользовательские","headerHint":"Пресет агента, выбранный при запуске этой задачи","inUse":"По умолчанию для новых задач","nav":"Пресеты агента","noDescription":"Без описания.","presetCordisDescription":"Настраивайте DSH через беседу. Пусть агент пишет плагины, добавляющие возможности или интерфейс, либо объединяйте инструменты и промпты, создавая свой режим.","presetCordisName":"Режим создателя","presetMinimalDescription":"Агент работает только с инструментом терминала. Полезно для проверки и сравнения его базовых возможностей.","presetMinimalName":"Минимальный режим","presetPtcDescription":"Включает все возможности стандартного режима. Лучше подходит для задач, где инструменты вызываются пакетами, а результаты затем фильтруются, упорядочиваются, дедуплицируются, подсчитываются или суммируются.","presetPtcName":"Режим PTC","presetStandardDescription":"Работа с кодом, файлами и информацией. Подходит для большинства задач: поиск, редактирование, команды терминала и другие инструменты доступны по мере надобности.","presetStandardName":"Стандартный режим","seatHint":"Выберите пресет агента для новой задачи","sectionIntro":"Выберите инструменты агента и то, как он работает. Для повседневных задач используйте стандартный режим, а для расширения возможностей DSH — режим создателя.","setDefault":"Сделать пресетом по умолчанию для новых задач","switchRefused":"Не удалось переключиться на {name}: {reason}","view":"Посмотреть конфигурацию"},"settings.subagent":{"overridden":"Переопределено","readOnly":"В этом развёртывании настройки хранятся только для чтения.","reset":"Сбросить по умолчанию","save":"Сохранить","saveFailed":"Развёртывание не приняло эти значения; они оставлены вам для исправления.","saving":"Сохраняю…","subagentCapacityHelp":"Общее число активных субагентов под одним главным агентом на всех уровнях рекурсии. Главный агент не учитывается. При достижении предела новые запросы на запуск отклоняются.","subagentCapacityHelpLabel":"О пределе параллелизма субагентов","subagentCapacityInvalid":"Введите целое число не меньше 1.","subagentDepthHelp":"Ограничивает число уровней субагентов, которые может создавать агент.","subagentDepthHelpLabel":"О максимальной глубине рекурсии","subagentDepthInvalid":"Введите целое число не меньше 0.","subagentDepthOne":"Субагентов может создавать только главный агент","subagentDepthOverride":"Если инструмент задаёт свою максимальную глубину рекурсии, приоритет у этой настройки.","subagentDepthZero":"Отключить субагентов","subagentDescription":"Настройте глубину рекурсии, число и модели субагентов.","subagentLimitsTitle":"Пределы","subagentMaxActive":"Предел параллелизма субагентов","subagentMaxDepth":"Максимальная глубина рекурсии","subagentModelSelectionAllowed":"Модели, доступные агентам","subagentModelSelectionChoose":"Если включено, агенты могут выбирать провайдера, модель и усилие рассуждений для каждого субагента из разрешённых моделей ниже. Действует только для новых сессий.","subagentModelSelectionConflict":"Настройки изменены в другом месте. Отмените черновик и повторите попытку.","subagentModelSelectionEmpty":"Сейчас ни один провайдер не объявляет моделей.","subagentModelSelectionLoadFailed":"Не удалось загрузить модели.","subagentModelSelectionLoading":"Загружаю модели…","subagentModelSelectionOff":"Субагенты используют настроенные значения по умолчанию или наследуют модель родительского агента. Сохранённые наборы моделей сохраняются.","subagentModelSelectionPartial":"Некоторые провайдеры моделей не загрузились; сохранённые наборы по-прежнему можно удалить.","subagentModelSelectionRequired":"Выберите хотя бы одну модель перед сохранением.","subagentModelSelectionRetry":"Повторить","subagentModelSelectionTitle":"Выбор моделей","subagentModelSelectionToggle":"Разрешить агентам выбирать модели для субагентов","subagentModelSelectionUnavailable":"Сейчас недоступно","subagentModelSelectionUnavailableGroup":"Сохранено, но сейчас недоступно","subagentTitle":"Субагент","unavailable":"Этот плагин не загружен, поэтому сейчас его нельзя настроить."},"sidebarBrowser":{"address.changed":"URL изменился","address.placeholder":"Введите адрес HTTP(S)","address.unknown":"Страница перешла; этот носитель не может прочитать её новый URL.","back":"Назад","error.application-origin":"Встроенный браузер не может открыть само приложение DSH.","error.credentials":"Адрес не может содержать имя пользователя или пароль.","error.empty":"Введите адрес.","error.invalid":"Этот адрес неверен или слишком длинный.","error.protocol":"Поддерживаются только адреса HTTP и HTTPS; для локальных файлов используйте предпросмотр документов.","external":"Открыть в системном браузере","forward":"Вперёд","go":"Перейти","guide.description":"Просмотр веб-страниц","guide.title":"Браузер","load.failed":"Страница не загрузилась; обновите её или откройте в системном браузере.","load.failed.detail":"Не удалось загрузить страницу ({code}): {description}","loading":"Открываю…","reload":"Обновить","restore.action":"Восстановить страницу","restore.previous":"Открытая ранее","sandbox.disable":"Отключить ограничения песочницы","sandbox.enable":"Восстановить ограничения песочницы","sandbox.warning":"Ограничения песочницы отключены; страница может управлять приложением верхнего уровня, а также использовать загрузки, модальные диалоги и блокировку ввода.","shortcut.noSession":"Сначала откройте сессию","start":"Введите адрес HTTP(S), чтобы начать просмотр","type.label":"Браузер"},"sidebarDocumentPreview":{"autoRefresh":"Автообновление","autoRefresh.disable":"Отключить автообновление","autoRefresh.enable":"Включить автообновление","changed":"Файл изменился, показано прежнее содержимое.","error.notFound":"Файл не найден. Возможно, он перемещён или удалён.","error.notRegularFile":"Это не обычный файл, показывать нечего.","error.notText":"Предпросмотр для этого типа файлов пока недоступен.","error.tooLarge":"Эта страница превышает предел {limit} и не может быть прочитана.","error.unavailable":"Не удалось прочитать: {message}","loadMore":"Загрузить ещё","loading":"Отрисовываю документ…","openWith":"Открыть с помощью","reload":"Прочитать файл заново","reloadNow":"Обновить","rendererUnavailable":"Предпросмотр {name} недоступен.","resourceUnavailable":"Служба файловых ресурсов недоступна.","retry":"Повторить","unsupportedFile":"Предпросмотр для этого типа файлов пока недоступен.","viewer.text":"Обычный текст","wrap.aria":"Перенос строк","wrap.disable":"Отключить перенос строк","wrap.enable":"Включить перенос строк"},"sidebarRight":{"chrome.collapse":"Свернуть боковую панель","chrome.collapseAria":"Свернуть правую боковую панель","chrome.exitFullscreen":"Выйти из полноэкранного режима","chrome.expand":"Открыть боковую панель","chrome.expandAria":"Открыть правую боковую панель","chrome.toFullscreen":"Во весь экран","command.budget":"Больше двух областей нельзя","command.close":"Закрыть текущую страницу или окно","command.collapsed":"Сначала разверните правую боковую панель","command.empty":"Сначала откройте страницу","command.float":"Это действие недоступно в плавающей панели","command.fullscreen":"Переключить панель во весь экран","command.noFocus":"Сначала выберите область правой боковой панели","command.noRefresh":"Эту страницу нельзя обновить","command.noSession":"Сначала выберите сессию","command.refresh":"Обновить текущую страницу","command.stale":"Страница изменилась; выберите её снова","command.toggle":"Переключить правую боковую панель","command.width":"Недостаточно ширины для разделения, расширьте боковую панель","dock.addTab":"Новая вкладка","dock.closeFloat":"Закрыть","dock.closeTab":"Закрыть","dock.dockFloat":"Вернуть в боковую панель","dock.drop.bottom":"Добавить область снизу","dock.drop.center":"Переместить сюда","dock.drop.left":"Добавить область слева","dock.drop.right":"Добавить область справа","dock.drop.top":"Добавить область сверху","dock.emptyPane":"Пустая область","dock.splitPane":"Разделить","dock.splitPaneDisabled":"Больше двух областей нельзя","dock.splitPaneNarrow":"Недостаточно ширины для разделения, расширьте боковую панель","tab.guide.title":"Начало","tab.unavailable":"Пока нечего показать содержимое такого типа."},"sidebarTerminal":{"attachmentEnded":"Соединение с терминалом прервано. Переподключитесь, чтобы продолжить.","cleanupFailed":"Терминал «{title}» не удалось завершить: {message}","closed":"Терминал закрыт.","connecting":"Подключаюсь…","control":"Взять управление","creating":"Запускаю…","description":"Выполнение команд в рабочей области сессии","disconnected":"Соединение потеряно.","exited":"Процесс завершён ({code})","failed":"Ошибка терминала: {message}","inputFull":"Буфер ввода заполнен. Переподключитесь и повторите попытку.","invalidOutput":"Не удалось получить экран терминала. Переподключитесь, чтобы восстановить его.","loading":"Читаю окружение терминала…","missingTerminal":"Этот терминал больше не существует. Откройте новый терминал.","new":"Новый терминал","readonly":"Это представление доступно только для чтения.","reconnect":"Переподключиться","recoveryFailed":"Не удалось восстановить терминал: {message}","rename":"Имя терминала","retry":"Повторить","retryRecovery":"Повторить восстановление терминала","shell":"Выбрать оболочку","shellEmpty":"Оболочки недоступны","shellLoading":"Загружаю оболочки…","shortcut.noSession":"Сначала выберите сессию","terminalLimit":"Достигнут предел числа терминалов. Закройте неиспользуемые терминалы и повторите попытку. Завершённые терминалы тоже учитываются в пределе.","title":"Терминал","unavailable":"Недоступно"},"approval":{"allowOnce":"Разрешить один раз","detail.aria":"Подробности подтверждения","escalation":"Инструмент {toolName} запрашивает привилегированное выполнение","reject":"Отклонить","waiting":"Ожидание подтверждения"},"directory-browser":{"browser.cancel":"Отмена","browser.create":"Создать","browser.createIn":"Новая папка в «{name}»","browser.editPath":"Изменить путь","browser.folderName":"Имя папки","browser.home":"Домашняя","browser.loading":"Загрузка…","browser.newFolder":"Новая папка","browser.open":"Открыть","browser.showHidden":"Показывать скрытые файлы","browser.title":"Выбор папки рабочей области","browser.truncated":"Слишком много папок для списка; показано только начало.","browser.untitledFolder":"Папка без названия"},"feedback":{"action.dislike":"Плохой ответ","action.dislikeActive":"Убрать оценку","action.like":"Хороший ответ","action.likeActive":"Убрать оценку","category.instruction-following":"Понимание и выполнение инструкций","category.other":"Другое","category.product-interaction":"Возможности и взаимодействие","category.resource-cost":"Расход ресурсов и стоимость","category.security-privacy-permission":"Безопасность, приватность и разрешения","category.service-stability":"Стабильность и скорость","category.task-result":"Результат задачи","dialog.categories":"Категория отзыва","dialog.detail":"Подробности отзыва","dialog.hint":"Добавьте подробности, чтобы помочь нам стать лучше. В отправку войдёт журнал текущей беседы.","dialog.title":"Отправить отзыв","error.conflict":"Этот отзыв изменён в другом месте; показано последнее состояние","error.generic":"Не удалось сохранить отзыв","error.load":"Не удалось загрузить отзыв","error.noteTooLarge":"Описание слишком длинное; сократите его и отправьте снова","toast.recorded":"Спасибо за отзыв"},"goal":{"action.cancel":"Отменить изменение","action.clear":"Очистить цель","action.edit":"Изменить цель","action.pause":"Приостановить цель","action.resume":"Возобновить цель","action.save":"Сохранить цель","commandInput.aria":"Ввод команды","objective.aria":"Задача цели","phase.active":"Активная цель","phase.active.disarmed":"Неактивная цель","phase.blocked":"Заблокированная цель","phase.paused":"Цель на паузе"},"open-in-app":{"app.explorer":"Файлы","app.filemanager":"Файлы","app.finder":"Finder","app.terminal":"Терминал","open.title":"Открыть в {app}","open.tooltip":"Открыть локально","path.appDefault":"{app} (по умолчанию)","path.appsError":"Не удалось загрузить приложения","path.more":"Другие способы открытия","path.open":"Открыть","path.openError":"Не удалось открыть. Попробуйте снова.","path.reveal":"Показать расположение файла","path.revealError":"Не удалось показать расположение файла. Попробуйте снова.","shortcut.busy":"Открытие рабочей области","shortcut.unavailable":"Текущая рабочая область или локальное приложение недоступны"},"permission.access":{"auto.badge":"EXP","auto.confirm.acknowledge":"Я понимаю эти риски и хочу продолжить","auto.confirm.description":"Автопроверка выполняется без песочницы. Перед каждым вызовом нативного инструмента и внутренним вызовом PTC та же модель, что и у текущего агента, решает, разрешить ли его; вы подтверждаете или отклоняете каждый отклонённый вызов. Эта функция экспериментальная, может ошибочно разрешать или запрещать действия и расходует дополнительные токены.","auto.confirm.enable":"Включить автопроверку","auto.confirm.title":"Включить автопроверку (экспериментально)?","auto.description":"Работа без песочницы после экспериментальной проверки той же моделью каждого вызова нативного инструмента и внутреннего вызова PTC.","auto.label":"Автопроверка","close":"Закрыть","confirm.acknowledge":"Я понимаю риски и хочу продолжить","confirm.cancel":"Отмена","confirm.description":"Полный доступ сокращает число подтверждений и позволяет агенту выполнять больше действий напрямую, включая чувствительные операции, изменение файлов и внешние команды. Используйте его только если доверяете текущей задаче.","confirm.enable":"Включить полный доступ","confirm.title":"Включить полный доступ?","mode":"Режим доступа, текущий: {name}","preset.fullAccess":"Полный доступ","preset.readOnly":"Только чтение","preset.workspaceWrite":"Запись в рабочей области"},"plan":{"chip.exitFailed":"Не удалось выйти из режима планирования","chip.label":"План","chip.on.aria":"Режим планирования включён, нажмите для выключения","chip.on.title":"Режим планирования включён — нажмите для выключения (/plan off)","preview.action":"Открыть","preview.document":"План · Markdown","preview.expired":"Этот временный просмотр плана устарел. Откройте его заново из карточки ожидающей проверки.","preview.failed":"Не удалось загрузить план","preview.full":"Открыть весь план","preview.historyUnavailable":"История сессии недоступна","preview.invalidAddress":"Неверный адрес плана","preview.loading":"Загрузка плана…","preview.notFound":"Этот план не найден","preview.open":"Открыть план в боковой панели","preview.openNamed":"Открыть план: {title}","preview.title":"План","preview.unavailable":"Просмотр плана недоступен"},"reference":{"candidate.noCwd":"(нет рабочей папки)","crumb.root":"Рабочая область","section.files":"Файлы и папки","section.sessions":"Сессии","section.subagents":"Субагенты","time.days":"{n} дн.","time.hours":"{n} ч","time.minutes":"{n} мин","time.months":"{n} мес.","time.now":"сейчас","time.years":"{n} г."},"schedule.catalog":{"delete.action":"Удалить","delete.label":"Удалить напоминание: {title}","delete.pending":"Удаление…","frequency.every":"Каждые {value} {unit}","frequency.once":"Один раз","hover.more":"ещё {count}","list.aria":"Активные напоминания","list.error":"Не удалось загрузить напоминания.","list.loading":"Загрузка напоминаний…","list.nextRun":"Следующий запуск","list.open":"Открыть подробности напоминания: {title}","list.retry":"Повторить","mark.aria":"{count} запланированных задач","trigger.label":"Напоминания","trigger.one":"{count} напоминание","trigger.other":"{count} напоминаний"},"settings.agentLoop":{"description":"Управляйте тем, как агент запускает вызовы инструментов.","invalidNumber":"Введите число или оставьте пустым для значения по умолчанию.","maxParallel":"Параллельные вызовы инструментов","maxParallelHint":"Верхняя граница одновременно выполняемых безопасных для параллелизма вызовов в рамках одного шага.","overridden":"Переопределено","readOnly":"В этой конфигурации настройки хранятся только для чтения.","reset":"Сбросить по умолчанию","save":"Сохранить","saveFailed":"Конфигурация не приняла эти значения; они оставлены вам для исправления.","saving":"Сохранение…","title":"Цикл агента","unavailable":"Этот плагин не загружен, поэтому его нельзя настроить сейчас."},"settings.permission":{"confirm.acknowledge":"Я понимаю риски и хочу продолжить","confirm.cancel":"Отмена","confirm.description":"Полный доступ позволяет новым сессиям сокращать число подтверждений и выполнять больше действий напрямую, включая чувствительные операции, изменение файлов и внешние команды. Используйте его только если доверяете последующим задачам.","confirm.enable":"Включить полный доступ","confirm.title":"Включить полный доступ?","description":"Выберите режим разрешений по умолчанию для новых сессий","loading":"Загрузка","preset.fullAccess":"Полный доступ","preset.readOnly":"Только чтение","preset.workspaceWrite":"Запись в рабочей области","title":"Разрешения","unavailable":"Недоступно"},"settings.plugins":{"empty":"В этой конфигурации нет представлений плагинов.","intro":"Просмотрите плагины, входящие в эту конфигурацию.","nav":"Встроенные плагины","tabs":"Представления плагинов","title":"Встроенные плагины"},"settings.shell":{"description":"Ограничьте время выполнения каждой команды и объём её вывода.","invalidNumber":"Введите число или оставьте пустым для значения по умолчанию.","maxOutputBytes":"Лимит вывода на поток (байты)","maxOutputBytesHint":"Вывод сверх этого объёма сохраняется во временный файл, а не теряется.","overridden":"Переопределено","readOnly":"В этой конфигурации настройки хранятся только для чтения.","reset":"Сбросить по умолчанию","save":"Сохранить","saveFailed":"Конфигурация не приняла эти значения; они оставлены вам для исправления.","saving":"Сохранение…","timeoutMs":"Тайм-аут команды (ms)","timeoutMsHint":"Сколько может выполняться одна команда до её завершения.","title":"Оболочка","unavailable":"Этот плагин не загружен, поэтому его нельзя настроить сейчас."},"settings.theme":{"appearance.dark":"Тёмный","appearance.light":"Светлый","appearance.system":"Системный","appearance.title":"Внешний вид","fontSize.decrease":"Уменьшить размер шрифта","fontSize.description":"Влияет только на содержимое беседы","fontSize.increase":"Увеличить размер шрифта","fontSize.title":"Размер шрифта","fontSize.unit":"px"},"settings.webSearch":{"apiKey":"Ключ API","apiKeyHint":"Хранится вне файла настроек. Оставьте пустым, чтобы сохранить текущий ключ.","apiKeySet":"Ключ настроен.","apiKeyUnset":"Ключ не настроен; искать могут только беседы с моделью DeepSeek Account — через эндпоинт по умолчанию.","baseUrl":"Эндпоинт","baseUrlHint":"Оставьте пустым, чтобы использовать значение провайдера по умолчанию.","description":"Настройте провайдера поиска DeepSeek.","invalidNumber":"Введите число или оставьте пустым для значения по умолчанию.","maxUses":"Максимум поисков на запрос","maxUsesHint":"Сколько раз один запрос может искать, прежде чем должен ответить.","overridden":"Переопределено","readOnly":"В этой конфигурации настройки хранятся только для чтения.","reset":"Сбросить по умолчанию","save":"Сохранить","saveFailed":"Конфигурация не приняла эти значения; они оставлены вам для исправления.","saving":"Сохранение…","title":"Поиск в интернете","unavailable":"Этот плагин не загружен, поэтому его нельзя настроить сейчас."},"sidebar":{"panels.label":"Глобальные панели","session.new":"Новая сессия","session.new.label":"Новая сессия","toggle.collapse":"Свернуть боковую панель","toggle.open":"Открыть боковую панель"},"sidebarExcel":{"charts":"диаграммы","conditionalFormatting":"условное форматирование","encoding":"Не удалось прочитать эту кодировку текста. Сохраните файл как UTF-8 или UTF-16 с BOM и повторите.","featureSeparator":", ","formulaWarning":"Эта книга содержит формулы. Отображаемые результаты могут отсутствовать или быть неточными.","images":"изображения","invalid":"Не удалось открыть эту таблицу. Проверьте её формат, содержимое или защиту паролем.","language":"ru","loading":"Отрисовка документа…","retry":"Повторить","shapes":"фигуры","timeout":"Открытие этой книги заняло слишком много времени. Попробуйте файл меньше.","title":"Таблица","tooLarge":"Эта книга превышает лимит размера для предпросмотра.","unsupportedNotice":"Этот предпросмотр не поддерживает {features} в этой книге. Откройте её в системном приложении для полного просмотра."},"sidebarFiles":{"autoRefresh":"Автообновление","autoRefresh.disable":"Отключить автообновление","autoRefresh.enable":"Включить автообновление","empty":"Пустая папка","entry.other":"Это не файл и не папка, поэтому открыть нельзя.","error.notDirectory":"Это не папка.","error.notFound":"Эта папка исчезла. Возможно, её переместили или удалили.","error.outsideWorkspace":"Эта папка вне рабочей области, поэтому боковая панель её не прочитает.","error.unavailable":"Ошибка чтения: {message}","guide.description":"Просматривайте файлы в рабочей области этой сессии","guide.title":"Файлы рабочей области","loading":"Чтение…","noWorkspace":"У этой сессии нет папки рабочей области.","reload":"Обновить","shortcut.noSession":"Сначала выберите сессию","truncated":"Слишком много записей, показана только часть.","type.label":"Файлы"},"sidebarImage":{"failed":"Не удалось показать это изображение.","loading":"Отрисовка документа…","preview":"Предпросмотр изображения: {name}","title":"Изображение","unsupported":"Для предпросмотра изображения нужно полное содержимое файла."},"sidebarOffice":{"busy":"Предпросмотр Office занят. Попробуйте вскоре снова.","changed":"Файл изменился во время чтения. Откройте предпросмотр заново.","closeDetails":"Закрыть сведения о шрифтах","failed":"Преобразование Office не дало пригодный PDF. Проверьте файл и попробуйте снова.","invalid":"Этот файл Office нельзя просмотреть. Возможно, он повреждён, защищён паролем или имеет неверное расширение.","loading":"Отрисовка документа…","missingFontsCount":"Шрифты: {count}","missingFontsDescription":"Эти шрифты недоступны для предпросмотра. Текст и разметка могут отличаться от исходного документа.","missingFontsTitle":"Отсутствующие шрифты","retry":"Повторить","timeout":"Преобразование Office заняло слишком много времени. Попробуйте снова.","title":"Документ Office","tooLarge":"Файл Office или преобразованный PDF превышает лимит размера для предпросмотра. Уменьшите размер файла или настройте предпросмотр.","unavailable":"Предпросмотр Office недоступен. Включите службу предпросмотра документов на компьютере, где работает DeepSeek Harness.","viewMissingFonts":"Отсутствующих шрифтов: {count}. Нажмите, чтобы посмотреть."},"sidebarPdf":{"failed":"Не удалось показать PDF: {message}","loading":"Отрисовка документа…","pageImage":"Страница PDF {page}","password":"Для этого PDF нужен пароль; предпросмотр файлов с паролем не поддерживается.","rendering":"Отрисовка страницы…","retry":"Повторить","title":"PDF","unsupported":"Для предпросмотра PDF нужно полное содержимое файла.","workerFailed":"Процесс отрисовки PDF не смог продолжить. Повторите попытку."},"skill":{"menu.userOnly":"только пользователь","row.failed":"Не удалось загрузить навык","row.inspect":"Просмотреть","row.instructions":"Инструкции","row.preparing":"Подготовка к загрузке навыка","row.running":"Загрузка навыка","row.stopped":"Загрузка навыка остановлена","row.title":"Навык"},"slash.menu":{"command":"Команды","crumbs.aria":"Навигация по папкам","drill.aria":"Перейти в папку","drill.hint":"Перейти в папку","drill.key":"Tab","loading":"Загрузка…","skill":"Навыки","subagent":"Субагенты","suggestions.aria":"Подсказки триггеров"},"workflowRun":{"member.empty":"Пустое имя участника","member.open":"Открыть {name}","phase.empty":"Пустое имя фазы","phase.unassigned":"Без фазы","run.empty":"Ни один участник не запущен","run.members.one":"{count} участник","run.members.other":"{count} участников","run.title":"{name}","status.cancelled":"Отменено","status.completed":"Завершено","status.failed":"Ошибка","status.interrupted":"Прервано","status.running":"Выполняется","statusCount.cancelled":"Отменено {count}","statusCount.completed":"Завершено {count}","statusCount.failed":"Ошибок {count}","statusCount.interrupted":"Прервано {count}","statusCount.running":"Выполняется {count}"},"documentHtml":{"failed":"Не удалось показать этот HTML-документ.","frame":"Предпросмотр HTML-документа","loading":"Отрисовка документа…","title":"HTML"},"documentMarkdown":{"code.copied":"Скопировано","code.copy":"Копировать","footnotes":"Сноски","viewer.label":"Markdown"},"settings.locale":{"language.title":"Язык"},"settings.sessionLog":{"description":"Помогите улучшить модели и продукты DeepSeek.","failed":"Не удалось сохранить настройку","saved":"Настройка сохранена","title":"Загружать журнал сессии при использовании официального API модели"},"shortcuts.layout":{"toggle":"Показать или скрыть левую боковую панель"},"sidebarCodePreview":{"copied":"Скопировано","copy":"Копировать","title":"Код"}};
    const OWN_NS = 'settings.ruQhd';
    const OWN_EN = {"button.increase":"Increase element sizes","button.decrease":"Decrease element sizes","button.hint":"Interface scale — A+ enlarges every element","button.railHint":"Increase element sizes (right-click to decrease)","proxy.on":"Proxy: on","proxy.off":"Proxy: off","proxy.enable":"Turn the proxy on (route through it)","proxy.disable":"Turn the proxy off (go direct)","proxy.rail":"Proxy","proxy.railOn":"Proxy is on — click to go direct","proxy.railOff":"Proxy is off — click to route through it","proxy.unavailable":"The proxy plugin (dsh-proxy) is not loaded","proxy.wait":"Proxy: ...","proxy.offline":"Proxy: no answer","proxy.offlineHint":"The host half of rus-image-percent-gen does not answer yet. Restart DSH; the address itself is set in Settings -> Proxy.","proxy.hint":"Click to switch the route. The address is set in Settings -> Proxy."};
    const OWN_RU = {"button.increase":"Увеличить размеры элементов","button.decrease":"Уменьшить размеры элементов","button.hint":"Масштаб интерфейса — A+ увеличивает все элементы","button.railHint":"Увеличить размеры элементов (правый клик — уменьшить)","proxy.on":"Прокси: вкл","proxy.off":"Прокси: выкл","proxy.enable":"Включить прокси — запросы пойдут через него","proxy.disable":"Выключить прокси — ходить напрямую","proxy.rail":"Прокси","proxy.railOn":"Прокси включён — нажмите, чтобы ходить напрямую","proxy.railOff":"Прокси выключен — нажмите, чтобы пустить запросы через него","proxy.unavailable":"Плагин прокси (dsh-proxy) не загружен","proxy.wait":"Прокси: …","proxy.offline":"Прокси: нет связи","proxy.offlineHint":"Host-половина rus-image-percent-gen ещё не отвечает. Перезапустите DSH; сам адрес задаётся в Настройках → Прокси.","proxy.hint":"Нажмите, чтобы переключить маршрут. Адрес задаётся в Настройках → Прокси."};
    // Русские подписи для чужих пространств имён (карточка прокси).
    const EXTRA_RU = {"settings.dsh-proxy":{"card.title":"Исходящий прокси (dsh-proxy)","card.desc":"Все исходящие запросы DSH — модели, поиск, MCP — идут через прокси. Переключение применяется сразу после сохранения, перезапуск не нужен.","field.mode":"Режим","mode.direct":"Напрямую (без прокси)","mode.system":"Как в системе","mode.manual":"Вручную (адрес ниже)","field.proxy":"Адрес прокси","field.proxy.tip":"Для режима «Вручную»: http://127.0.0.1:10808 или socks5://127.0.0.1:1080","field.noProxy":"Идти напрямую (список)","field.noProxy.tip":"По одному в строке: localhost, 127.0.0.1, api.deepseek.com","field.exportEnv":"Передать прокси дочерним процессам","field.exportEnv.tip":"Режим «Вручную»: curl/git в терминале и stdio-MCP пойдут через тот же прокси","overridden":"Изменено","reset":"Сбросить","readOnly":"В этом профиле настройки доступны только для чтения.","unavailable":"Плагин сейчас не загружен — настроить его нельзя.","save":"Сохранить","saving":"Сохранение…","saveFailed":"Настройки не приняты, значения оставлены для правки."}};

    const SCALE_KEY = 'dsh-ru-qhd.scale';
    const LOCALE_MARKER = 'dsh-ru-qhd.default-locale-applied';
    const DEFAULT_SCALE = 1.25;
    const MIN_SCALE = 0.8;
    const MAX_SCALE = 2.2;
    const SCALE_STEP = 0.05;
    /* Выше 160 % шаг крупнее: иначе до 220 % идти 19 нажатиями. */
    const COARSE_SCALE_FROM = 1.6;
    const COARSE_SCALE_STEP = 0.1;
    const MIN_FONT = 10;
    const MAX_FONT = 22;

    const SCALE_CSS = [
      'html{zoom:var(--dsh-ui-scale,1)}',
      '.dshRuQhd_sizeGroup{align-items:center;gap:2px;display:inline-flex}',
      '.dshRuQhd_sizeButton{border-radius:var(--dsw-radius-md);background:0 0;border:none;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;font-size:13px;font-weight:500;line-height:1;width:32px;height:32px;justify-content:center;align-items:center;padding:0;display:inline-flex}',
      '.dshRuQhd_sizeButton:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dshRuQhd_sizeButton:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}',
      '.dshRuQhd_sizeValue{color:var(--dsw-alias-label-secondary);font-size:12px;font-variant-numeric:tabular-nums;min-width:34px;text-align:center}',
      '.dshRuQhd_proxyButton{border-radius:var(--dsw-radius-md);background:0 0;border:none;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;font-size:12px;font-weight:500;height:32px;gap:6px;justify-content:center;align-items:center;padding:0 8px;display:inline-flex}',
      '.dshRuQhd_proxyButton:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dshRuQhd_proxyButton:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}',
      '.dshRuQhd_proxyButton:disabled{opacity:.5;cursor:default}',
      '.dshRuQhd_proxyButton[data-rail="true"]{width:32px;padding:0}',
      '.dshRuQhd_proxyDot{border-radius:50%;background:var(--dsw-alias-label-secondary);width:8px;height:8px;display:inline-block}',
      '.dshRuQhd_proxyButton[data-on="true"] .dshRuQhd_proxyDot{background:#22c55e}',
      /* The conversation panel sits right of the sidebar, so the app centres its
         content inside the panel — half a sidebar right of the screen centre.
         A visual shift of the content columns alone (a transform, which changes
         no layout and no measured width) puts that centre back on the screen,
         keeps the sidebar exactly where it was, and leaves the header, its icons
         and the scrollbar at the window edge. It follows the sidebar width, so
         collapsing or resizing the sidebar never moves the chat's centre. */
      '[class*="centerCol"] [class*="_column"]{transform:translateX(calc(-0.5 * var(--dsh-ruqhd-sidebar-width,0px)))}',
      '[class*="RlGAzG_card"]{transform:translateX(calc(-0.5 * var(--dsh-ruqhd-sidebar-width,0px)))}',
      '[class*="Hqq-bq_stack"]{transform:translateX(calc(-0.5 * var(--dsh-ruqhd-sidebar-width,0px)))}',
      /* Захваты ширины чата (тонкая линия, за которую тянут поле) отсчитываются
         от центра панели так же, как содержимое, и потому едут вместе с ним.
         Без этого ползунок остаётся в центре панели — то есть внутри поля
         текста, левее центра экрана. */
      '[class*="_widthHandle"]{transform:translateX(calc(-0.5 * var(--dsh-ruqhd-sidebar-width,0px)))}',
    ].join('');

    /** Clamp a candidate scale into the supported range. */
    function clampScale(value) {
      if (!isFinite(value)) return DEFAULT_SCALE;
      return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 100) / 100));
    }

    /** The persisted scale, or the QHD default. */
    function readScale() {
      try {
        const raw = window.localStorage.getItem(SCALE_KEY);
        if (raw === null) return DEFAULT_SCALE;
        const parsed = parseFloat(raw);
        return isFinite(parsed) ? clampScale(parsed) : DEFAULT_SCALE;
      } catch (error) {
        return DEFAULT_SCALE;
      }
    }

    let currentScale = readScale();
    const scaleListeners = new Set();

    let rectFixInstalled = false;

    /**
     * Keep `--dsh-ruqhd-screen-centre-offset` equal to the sidebar's width, so
     * the centre column's content lands on the window centre. Retries until the
     * shell has rendered, then follows the sidebar as it collapses or resizes.
     */
    function installScreenCentreOffset() {
      const root = document.documentElement;
      const sync = () => {
        const sidebar = document.querySelector('[class*="sidebarCol"]');
        const width = sidebar ? sidebar.getBoundingClientRect().width : 0;
        const offset = width > 0 ? Math.round(width) : 0;
        root.style.setProperty('--dsh-ruqhd-screen-centre-offset', offset + 'px');
        root.style.setProperty('--dsh-ruqhd-sidebar-width', offset + 'px');
        return sidebar;
      };
      let observer;
      let attempts = 0;
      let timer;
      const attach = () => {
        attempts += 1;
        const sidebar = sync();
        if (sidebar && typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(sync);
          observer.observe(sidebar);
          return;
        }
        if (attempts < 40) timer = window.setTimeout(attach, 250);
      };
      attach();
      window.addEventListener('resize', sync);
      return () => {
        if (observer) observer.disconnect();
        if (timer !== undefined) window.clearTimeout(timer);
        window.removeEventListener('resize', sync);
        root.style.removeProperty('--dsh-ruqhd-screen-centre-offset');
        root.style.removeProperty('--dsh-ruqhd-sidebar-width');
      };
    }

    /** Publish the scale to the document, where the plugin stylesheet reads it. */
    function applyScale(scale) {
      if (typeof document === 'undefined') return;
      document.documentElement.style.setProperty('--dsh-ui-scale', String(scale));
    }

    /**
     * A zoomed page reports two incompatible coordinate systems: the rect APIs
     * return zoomed numbers, while `offsetWidth`, `clientWidth` and every CSS
     * length stay unzoomed. Harness UI code mixes the two when it anchors a
     * menu to a trigger or centres content, which under CSS zoom lands those
     * elements outside the window. Dividing the rect results by the scale puts
     * every measurement back into the layout space CSS already uses, so the
     * page behaves like a natively zoomed one.
     */
    function installRectSpaceFix() {
      if (rectFixInstalled || typeof Element === 'undefined' || typeof Range === 'undefined') {
        return () => {};
      }
      rectFixInstalled = true;
      const elementRect = Element.prototype.getBoundingClientRect;
      const elementRects = Element.prototype.getClientRects;
      const rangeRect = Range.prototype.getBoundingClientRect;
      const rangeRects = Range.prototype.getClientRects;
      const scaleRect = (rect) => {
        if (currentScale === 1) return rect;
        return new DOMRect(
          rect.x / currentScale,
          rect.y / currentScale,
          rect.width / currentScale,
          rect.height / currentScale,
        );
      };
      const scaleList = (list) => {
        if (currentScale === 1) return list;
        const out = [];
        for (let index = 0; index < list.length; index += 1) out.push(scaleRect(list[index]));
        out.item = (index) => out[index] ?? null;
        return out;
      };
      Element.prototype.getBoundingClientRect = function () {
        return scaleRect(elementRect.call(this));
      };
      Element.prototype.getClientRects = function () {
        return scaleList(elementRects.call(this));
      };
      Range.prototype.getBoundingClientRect = function () {
        return scaleRect(rangeRect.call(this));
      };
      Range.prototype.getClientRects = function () {
        return scaleList(rangeRects.call(this));
      };
      return () => {
        Element.prototype.getBoundingClientRect = elementRect;
        Element.prototype.getClientRects = elementRects;
        Range.prototype.getBoundingClientRect = rangeRect;
        Range.prototype.getClientRects = rangeRects;
        rectFixInstalled = false;
      };
    }

    let themeService;
    let currentFontSize = 14;
    const fontSizeListeners = new Set();

    /**
     * Translate through this bundle's namespace. Bound once the dictionaries are
     * registered; the settings pages receive `renderSlot` rather than `t`, so
     * they read their copy from here.
     */
    let translate = (key) => key;

    /**
     * Settings section of the proxy plugin (@memef1f1y/dsh-plugin-proxy), read
     * opportunistically: the button simply does not render when that plugin is
     * absent from the profile.
     */

    /** Republish the conversation text size to every mounted control. */
    function publishFontSize(px) {
      currentFontSize = px;
      for (const listener of fontSizeListeners) listener(px);
    }

    /** Subscribe to conversation text size changes; returns the unsubscribe. */
    function subscribeFontSize(listener) {
      fontSizeListeners.add(listener);
      return () => {
        fontSizeListeners.delete(listener);
      };
    }

    /** Write the conversation text size through the theme service. */
    function setFontSize(px) {
      if (!themeService) return;
      const target = Math.min(MAX_FONT, Math.max(MIN_FONT, Math.round(px)));
      if (target === currentFontSize) return;
      themeService.setFontSize(target);
      publishFontSize(target);
    }

    /** One scale step up (+1) or down (−1); coarser once past 160 %. */
    function steppedScale(scale, direction) {
      const step = scale >= COARSE_SCALE_FROM ? COARSE_SCALE_STEP : SCALE_STEP;
      return scale + direction * step;
    }

    /** Write, persist and announce a new scale. */
    function setScale(scale) {
      currentScale = clampScale(scale);
      try {
        window.localStorage.setItem(SCALE_KEY, String(currentScale));
      } catch (error) {
        /* storage may be unavailable; the in-memory value still applies */
      }
      applyScale(currentScale);
      for (const listener of scaleListeners) listener(currentScale);
    }

    /** Subscribe to scale changes; returns the unsubscribe function. */
    function subscribeScale(listener) {
      scaleListeners.add(listener);
      return () => {
        scaleListeners.delete(listener);
      };
    }

    /**
     * The sidebar-foot size control: one button in the collapsed rail, and a
     * decrease / value / increase group when the sidebar is expanded.
     */
    function SizeButton(props) {
      const wide = !!(props && props.wide);
      const [scale, setLocalScale] = React.useState(currentScale);
      React.useEffect(() => subscribeScale(setLocalScale), []);
      const percent = Math.round(scale * 100);
      const enlarge = () => setScale(steppedScale(scale, 1));
      const shrink = () => setScale(steppedScale(scale, -1));
      if (!wide) {
        return h(
          'button',
          {
            type: 'button',
            className: 'dshRuQhd_sizeButton',
            'aria-label': translate('button.increase'),
            title: translate('button.railHint'),
            onClick: enlarge,
            onContextMenu: (event) => {
              event.preventDefault();
              shrink();
            },
          },
          'A+',
        );
      }
      const button = (key, text, onClick) =>
        h(
          'button',
          {
            type: 'button',
            className: 'dshRuQhd_sizeButton',
            'aria-label': translate(key),
            title: translate(key),
            onClick,
          },
          text,
        );
      return h(
        'div',
        { className: 'dshRuQhd_sizeGroup' },
        button('button.decrease', 'A−', shrink),
        h('span', { className: 'dshRuQhd_sizeValue', title: translate('button.hint') }, percent + '%'),
        button('button.increase', 'A+', enlarge),
      );
    }

    /**
     * The proxy switch beside the size control: one click turns our own proxy
     * route on (`POST /api/rus-image-percent-gen/proxy/on` — the address comes
     * from the saved settings) or off (`.../off`). State is read from the same
     * host routes the settings page uses, so the two never disagree, and the
     * button stays visible even when the host half does not answer yet (it then
     * explains that DSH needs a restart).
     */
    const PROXY_API = '/api/rus-image-percent-gen/proxy'

    function ProxyButton(props) {
      const wide = !!(props && props.wide);
      const [state, setState] = React.useState({ status: 'loading', mode: 'direct', on: false });

      const load = React.useCallback(() => {
        return fetch(PROXY_API, { headers: { accept: 'application/json' } })
          .then((response) => response.json())
          .then((data) => {
            if (!data || data.ok !== true) throw new Error((data && data.error) || 'no answer');
            const mode = (data.state && data.state.mode) || 'direct';
            setState({ status: 'ready', mode, on: mode === 'manual' || mode === 'system', label: data.state && data.state.currentLabel });
          })
          .catch(() => setState({ status: 'unavailable', mode: 'direct', on: false }));
      }, []);

      React.useEffect(() => {
        load();
        const timer = setInterval(() => { if (!document.hidden) load(); }, 5000);
        const onVisible = () => { if (!document.hidden) load(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
          clearInterval(timer);
          document.removeEventListener('visibilitychange', onVisible);
        };
      }, [load]);

      const [busy, setBusy] = React.useState(false);
      const toggle = () => {
        if (busy) return;
        setBusy(true);
        const path = state.on ? '/off' : '/on';
        fetch(PROXY_API + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.ok === true) {
              const mode = (data.state && data.state.mode) || 'direct';
              setState({ status: 'ready', mode, on: mode === 'manual' || mode === 'system', label: data.state && data.state.currentLabel });
            } else {
              // Нет адреса или host-половина ещё старая: показываем подсказку.
              setState((prev) => ({ ...prev, error: (data && data.error) || 'error' }));
            }
          })
          .catch(() => setState({ status: 'unavailable', mode: 'direct', on: false }))
          .then(() => setBusy(false));
      };

      const ready = state.status === 'ready';
      const titleKey = state.on ? 'proxy.disable' : 'proxy.enable';
      const label = state.status === 'loading'
        ? translate('proxy.wait')
        : (ready ? translate(state.on ? 'proxy.on' : 'proxy.off') : translate('proxy.offline'));
      return h(
        'button',
        {
          type: 'button',
          className: 'dshRuQhd_proxyButton',
          'data-on': String(state.on),
          'data-status': state.status,
          'data-rail': String(!wide),
          'aria-label': translate(titleKey),
          'aria-pressed': String(state.on),
          title: ready
            ? `${translate(state.on ? 'proxy.railOn' : 'proxy.railOff')}\n${state.label || ''}\n${translate('proxy.hint')}`
            : translate('proxy.offlineHint'),
          disabled: busy || state.status === 'loading',
          onClick: toggle,
        },
        h('span', { className: 'dshRuQhd_proxyDot' }),
        wide ? label : null,
      );
    }

    /* ─── страница настроек прокси (вклеена из source/client/proxy-page.js) ─── */
    /* ─────────────── страница настроек прокси (слот settings.section) ───────────────
   Отдельная страница в «Настройках»: адрес вводится по частям, маршрут
   включается/выключается на месте, кандидаты проверяются настоящим запросом
   (время ответа, внешний IP и страна). Данные живут в host-половине, страница
   только читает и присылает.

   Этот файл вклеивается в client.js генератором tools/build_plugin.py
   (подстановка __PROXY_PAGE__), поэтому здесь доступны LANGUAGE, translate и React.
   ------------------------------------------------------------------------------ */

/* Тексты страницы: язык берём из того же LANGUAGE, что и остальная половина. */
const PP_TEXT = {
  ru: {
    nav: 'Прокси',
    title: 'Исходящий прокси',
    intro: 'Все исходящие запросы Harness — модели, поиск, HTTP-MCP — идут по выбранному здесь маршруту. Адрес хранится в файле профиля, а не в плагине.',
    state: 'Сейчас',
    mode: 'Режим',
    direct: 'напрямую, без прокси',
    current: 'Адрес',
    none: 'не задан',
    enabled: 'Включить прокси',
    enabledHint: 'Выключено — запросы идут напрямую, как будто прокси нет.',
    parts: 'Адрес прокси: части',
    partsHint: 'У каждого прокси свои значения — заполняйте поля, а не одну строку.',
    protocol: 'Протокол',
    host: 'Хост или IP',
    port: 'Порт',
    user: 'Логин',
    password: 'Пароль',
    passwordKeep: 'оставьте пустым, чтобы не менять',
    noProxy: 'Обход (напрямую)',
    noProxyHint: 'Хосты через запятую: localhost, 127.0.0.1, api.example.com. Для SOCKS5 не применяется.',
    exportEnv: 'Отдавать переменные дочерним процессам',
    exportEnvHint: 'curl/git в терминале и stdio-MCP пойдут через тот же прокси.',
    candidates: 'Кандидаты для проверки',
    candidatesHint: 'По одному в строке: Имя | protocol | host | port | логин | пароль. Лишние части можно опустить, а вместо них вставить готовый адрес (http://user:pass@host:8080).',
    save: 'Сохранить и применить',
    off: 'Выключить (напрямую)',
    check: 'Проверить по пингу',
    choose: 'Выбрать быстрейший',
    forget: 'Стереть настройки',
    busy: 'Работаю…',
    results: 'Результат проверки',
    alive: 'живой',
    dead: 'нет ответа',
    country: 'страна',
    exit: 'внешний IP',
    saved: 'Сохранено',
    unsaved: 'Есть несохранённые правки',
    noServer: 'Host-половина не отвечает: страница не может ни прочитать, ни сохранить настройки. Перезапустите DSH.',
    file: 'Файл настроек',
    help: 'Инструкция для ИИ — в инструменте proxy_switch (действие help).',
  },
  en: {
    nav: 'Proxy',
    title: 'Outbound proxy',
    intro: 'Every outbound Harness request — models, search, HTTP MCP — follows the route chosen here. The address lives in your profile file, never in the plugin.',
    state: 'Now',
    mode: 'Mode',
    direct: 'direct, no proxy',
    current: 'Address',
    none: 'not set',
    enabled: 'Enable the proxy',
    enabledHint: 'Off means requests go out directly, as if there were no proxy.',
    parts: 'Proxy address: parts',
    partsHint: 'Every proxy has its own values — fill the fields instead of one string.',
    protocol: 'Protocol',
    host: 'Host or IP',
    port: 'Port',
    user: 'Login',
    password: 'Password',
    passwordKeep: 'leave empty to keep the current one',
    noProxy: 'Bypass (stay direct)',
    noProxyHint: 'Comma-separated hosts: localhost, 127.0.0.1, api.example.com. Not applied to SOCKS5.',
    exportEnv: 'Export variables to child processes',
    exportEnvHint: 'curl/git in the terminal and stdio MCP then use the same proxy.',
    candidates: 'Candidates to check',
    candidatesHint: 'One per line: Name | protocol | host | port | login | password. Extra cells may be dropped, or put a ready-made URL instead (http://user:pass@host:8080).',
    save: 'Save and apply',
    off: 'Switch off (direct)',
    check: 'Check latency',
    choose: 'Pick the fastest',
    forget: 'Erase the settings',
    busy: 'Working…',
    results: 'Check result',
    alive: 'alive',
    dead: 'no answer',
    country: 'country',
    exit: 'exit IP',
    saved: 'Saved',
    unsaved: 'Unsaved changes',
    noServer: 'The host half does not answer: the page can neither read nor save settings. Restart DSH.',
    file: 'Settings file',
    help: 'Instructions for the AI live in the proxy_switch tool (action help).',
  },
}

/** Подписи страницы на текущем языке плагина. */
function ppText() {
  return LANGUAGE && LANGUAGE.id === 'en' ? PP_TEXT.en : PP_TEXT.ru
}

/** Запрос к host-половине страницы. */
async function proxyApi(path, body) {
  const options = body === undefined
    ? { headers: { accept: 'application/json' } }
    : { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }
  let data
  try {
    const response = await fetch('/api/rus-image-percent-gen/proxy' + path, options)
    data = await response.json()
  } catch (error) {
    data = { ok: false, error: String(error && error.message ? error.message : error) }
  }
  return data && typeof data === 'object' ? data : { ok: false, error: 'empty answer' }
}

/**
 * Разобрать строку кандидата. Формат: `Имя | protocol | host | port | логин | пароль`,
 * причём и средние, и последние части можно опускать, а вместо частей принимается
 * готовый адрес: `Имя | http://user:pass@host:8080`.
 */
function ppParseCandidate(line) {
  const text = String(line).trim()
  if (text === '' || text.startsWith('#')) return undefined
  const parts = text.split('|').map((entry) => entry.trim())
  if (parts.length === 1) {
    const single = parts[0]
    if (/^(https?|socks5h?|socks):\/\//i.test(single)) return { url: single }
    const [host, port] = single.split(':')
    return host ? { host, port } : undefined
  }
  const head = parts[0]
  // Вариант «Имя | host» без протокола: вторая часть — не protocol, а хост.
  const hasProtocol = /^(https?|socks5h?|socks)$/i.test(parts[1] ?? '')
  const cells = hasProtocol ? parts.slice(1) : parts.slice(1)
  const name = hasProtocol ? head : head
  const [protocol, host, port, user, password] = hasProtocol ? cells : ['http', ...cells]
  if (/^(https?|socks5h?|socks):\/\//i.test(host ?? '')) return { name: name || undefined, url: host }
  return {
    ...name === '' ? {} : { name },
    protocol,
    host,
    ...port === undefined || port === '' ? {} : { port },
    ...user === undefined || user === '' ? {} : { user },
    ...password === undefined || password === '' ? {} : { password },
  }
}

/** Собрать текст кандидатов из состояния host-половины (пароли не возвращаются). */
function ppCandidatesText(list) {
  return (Array.isArray(list) ? list : [])
    .map((entry) => {
      const cells = [
        entry.name || '',
        entry.protocol || 'http',
        entry.host || (entry.url || ''),
        entry.port === undefined ? '' : String(entry.port),
        entry.user || '',
      ]
      // Хвостовые пустые клетки не пишем, чтобы строка читалась.
      while (cells.length > 1 && cells[cells.length - 1] === '') cells.pop()
      return cells.join(' | ')
    })
    .join('\n')
}

/** Строка состояния маршрута. */
function ppModeLine(state, text) {
  if (!state) return text.busy
  if (state.mode === 'direct') return `${text.mode}: ${text.direct}`
  return `${text.mode}: ${state.mode} — ${state.currentLabel || text.none}`
}

/** Страница настроек прокси. */
function ProxySettingsPage() {
  const text = ppText()
  const [state, setState] = React.useState(null)
  const [results, setResults] = React.useState(null)
  const [note, setNote] = React.useState('')
  const [error, setError] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [offline, setOffline] = React.useState(false)
  const [form, setForm] = React.useState({
    enabled: false,
    protocol: 'http',
    host: '',
    port: '',
    user: '',
    password: '',
    noProxy: '',
    exportEnv: true,
    candidates: '',
  })

  /** Заполнить форму из состояния host-половины. */
  const fill = React.useCallback((next) => {
    if (!next) return
    setState(next)
    const current = next.current || {}
    setForm((prev) => ({
      enabled: next.mode !== 'direct',
      protocol: current.protocol || prev.protocol || 'http',
      host: current.host || '',
      port: current.port === undefined ? '' : String(current.port),
      user: current.user || '',
      password: '',
      noProxy: (next.noProxy || []).join(', '),
      exportEnv: prev.exportEnv !== false,
      candidates: ppCandidatesText(next.candidates),
    }))
  }, [])

  const load = React.useCallback(async () => {
    const data = await proxyApi('')
    if (data.ok !== true) {
      setOffline(true)
      setError(data.error || text.noServer)
      return
    }
    setOffline(false)
    setError('')
    fill(data.state)
  }, [fill, text])

  React.useEffect(() => {
    load()
  }, [load])

  const edit = (key) => (event) => {
    const value = event && event.target ? (event.target.type === 'checkbox' ? event.target.checked : event.target.value) : event
    setForm((prev) => ({ ...prev, [key]: value }))
    setNote(text.unsaved)
  }

  const run = async (work) => {
    setBusy(true)
    setError('')
    try {
      await work()
    } catch (failure) {
      setError(String(failure && failure.message ? failure.message : failure))
    } finally {
      setBusy(false)
    }
  }

  const candidates = () => form.candidates
    .split('\n')
    .map(ppParseCandidate)
    .filter((entry) => entry !== undefined)

  const save = () => run(async () => {
    const data = await proxyApi('/save', {
      enabled: form.enabled,
      mode: form.enabled ? 'manual' : 'direct',
      protocol: form.protocol,
      host: form.host,
      port: form.port === '' ? undefined : Number(form.port),
      user: form.user,
      password: form.password,
      noProxy: form.noProxy,
      exportEnv: form.exportEnv,
      candidates: candidates(),
    })
    if (data.ok !== true) {
      setError(data.error || 'save failed')
      if (data.state) fill(data.state)
      return
    }
    setNote(data.message || text.saved)
    fill(data.state)
  })

  const check = (choose) => run(async () => {
    setResults(null)
    const data = await proxyApi('/check', { choose: choose === true, timeout_ms: 5000 })
    if (data.state) fill(data.state)
    if (data.ok !== true) {
      setError(data.error || 'check failed')
      return
    }
    setResults(data.results || [])
    setNote(data.message || text.saved)
  })

  const off = () => run(async () => {
    const data = await proxyApi('/off', {})
    if (data.state) fill(data.state)
    setNote(data.message || text.saved)
  })

  const forget = () => run(async () => {
    const data = await proxyApi('/forget', {})
    if (data.state) fill(data.state)
    setNote(data.message || text.saved)
  })

  const cell = { display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }
  const label = { fontSize: 13, fontWeight: 600, color: 'var(--dsw-alias-label-primary, #16181d)' }
  const hint = { fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-secondary, #61666b)' }
  const input = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 10px',
    fontSize: 13,
    color: 'var(--dsw-alias-label-primary, #16181d)',
    background: 'var(--dsw-alias-bg-layer-3, #ffffff)',
    border: '1px solid var(--dsw-alias-border-l2, #0000001a)',
    borderRadius: 8,
    outline: 'none',
  }
  const row = { display: 'flex', gap: 12, flexWrap: 'wrap' }
  const button = (primary, disabled) => ({
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 8,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    color: primary ? 'var(--dsw-alias-label-inverse, #ffffff)' : 'var(--dsw-alias-label-primary, #16181d)',
    background: primary ? 'var(--dsw-alias-brand-primary, #4d6bfe)' : 'var(--dsw-alias-bg-layer-3, #ffffff)',
    border: primary ? '1px solid transparent' : '1px solid var(--dsw-alias-border-l2, #0000001a)',
  })
  const card = {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    padding: 16,
    borderRadius: 12,
    border: '1px solid var(--dsw-alias-settings-card-stroke, var(--dsw-alias-border-l2, #0000001a))',
    background: 'var(--dsw-alias-settings-card-fill, var(--dsw-alias-bg-layer-3, #ffffff))',
  }
  const field = (caption, node, note2) => React.createElement('label', { style: cell },
    React.createElement('span', { style: label }, caption),
    node,
    note2 ? React.createElement('span', { style: hint }, note2) : null,
  )

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 2px 18px' } },
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
      React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: 'var(--dsw-alias-label-primary, #16181d)' } }, text.title),
      React.createElement('div', { style: hint }, text.intro),
    ),
    offline ? React.createElement('div', { style: { ...hint, color: 'var(--dsw-alias-label-error, #d92d20)' } }, text.noServer) : null,
    React.createElement('div', { style: card },
      React.createElement('div', { style: { ...hint, fontSize: 13 } }, ppModeLine(state, text)),
      React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement('input', { type: 'checkbox', checked: form.enabled === true, onChange: edit('enabled') }),
        React.createElement('span', { style: label }, text.enabled),
      ),
      React.createElement('div', { style: hint }, text.enabledHint),
    ),
    React.createElement('div', { style: card },
      React.createElement('div', { style: label }, text.parts),
      React.createElement('div', { style: hint }, text.partsHint),
      React.createElement('div', { style: row },
        React.createElement('div', { style: { ...cell, maxWidth: 140 } },
          React.createElement('span', { style: label }, text.protocol),
          React.createElement('select', { style: input, value: form.protocol, onChange: edit('protocol') },
            (state && state.protocols ? state.protocols : ['http', 'https', 'socks5']).map((option) =>
              React.createElement('option', { key: option, value: option }, option)),
          ),
        ),
        React.createElement('div', { style: { ...cell, flex: '1 1 220px' } },
          React.createElement('span', { style: label }, text.host),
          React.createElement('input', { style: input, value: form.host, placeholder: 'proxy.example.com', onChange: edit('host') }),
        ),
        React.createElement('div', { style: { ...cell, maxWidth: 120 } },
          React.createElement('span', { style: label }, text.port),
          React.createElement('input', { style: input, value: form.port, placeholder: '8080', inputMode: 'numeric', onChange: edit('port') }),
        ),
      ),
      React.createElement('div', { style: row },
        React.createElement('div', { style: { ...cell, flex: '1 1 200px' } },
          React.createElement('span', { style: label }, text.user),
          React.createElement('input', { style: input, value: form.user, onChange: edit('user') }),
        ),
        React.createElement('div', { style: { ...cell, flex: '1 1 200px' } },
          React.createElement('span', { style: label }, text.password),
          React.createElement('input', {
            style: input,
            type: 'password',
            value: form.password,
            placeholder: state && state.current && state.current.hasPassword ? text.passwordKeep : '',
            onChange: edit('password'),
          }),
        ),
      ),
    ),
    React.createElement('div', { style: card },
      field(text.noProxy, React.createElement('input', { style: input, value: form.noProxy, placeholder: 'localhost, 127.0.0.1', onChange: edit('noProxy') }), text.noProxyHint),
      React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement('input', { type: 'checkbox', checked: form.exportEnv !== false, onChange: edit('exportEnv') }),
        React.createElement('span', { style: label }, text.exportEnv),
      ),
      React.createElement('div', { style: hint }, text.exportEnvHint),
    ),
    React.createElement('div', { style: card },
      field(text.candidates,
        React.createElement('textarea', { style: { ...input, minHeight: 96, resize: 'vertical', fontFamily: 'ui-monospace, Consolas, monospace' }, value: form.candidates, onChange: edit('candidates') }),
        text.candidatesHint),
      React.createElement('div', { style: row },
        React.createElement('button', { style: button(true, busy), disabled: busy, onClick: save }, text.save),
        React.createElement('button', { style: button(false, busy), disabled: busy, onClick: () => check(false) }, text.check),
        React.createElement('button', { style: button(false, busy), disabled: busy, onClick: () => check(true) }, text.choose),
        React.createElement('button', { style: button(false, busy), disabled: busy, onClick: off }, text.off),
        React.createElement('button', { style: button(false, busy), disabled: busy, onClick: forget }, text.forget),
      ),
      busy || note ? React.createElement('div', { style: hint }, busy ? text.busy : note) : null,
      error ? React.createElement('div', { style: { ...hint, color: 'var(--dsw-alias-label-error, #d92d20)' } }, error) : null,
      results && results.length > 0 ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
        React.createElement('div', { style: label }, text.results),
        results.map((entry, index) => React.createElement('div', { key: index, style: hint },
          `${entry.name ? entry.name + ' — ' : ''}${entry.label || ''} — ${entry.ok ? `${text.alive}, ${entry.ms} ms` : `${text.dead} (${entry.error || ''})`}`
          + (entry.exit ? `, ${text.exit} ${entry.exit}` : '')
          + (entry.country ? `, ${text.country} ${entry.country}${entry.countryCode ? ' (' + entry.countryCode + ')' : ''}` : ''),
        )),
      ) : null,
      state && state.settingsFile ? React.createElement('div', { style: hint }, `${text.file}: ${state.settingsFile}`) : null,
      React.createElement('div', { style: hint }, text.help),
    ),
  )
}

/** Зарегистрировать страницу настроек прокси в слоте settings.section. */
function registerProxySettingsPage(ctx) {
  try {
    return ctx.slots.inject('settings.section', () => {
      try {
        return ctx.slots.register(
          { name: 'settings.section', id: 'rus-image-percent-gen-proxy', order: 210, label: ppText().nav },
          ProxySettingsPage,
        )
      } catch (failure) {
        console.error('rus-image-percent-gen: cannot register the proxy settings page:', failure)
        return () => {}
      }
    })
  } catch (failure) {
    console.error('rus-image-percent-gen: cannot inject into settings.section:', failure)
    return () => {}
  }
}


    return {
      inject: ['locale', 'slots'],
      apply(ctx) {
        // Прокси здесь свой собственный: кнопка и страница говорят с host-половиной
        // этого же плагина, чужие секции настроек не нужны.
        ctx.effect(() => {
          const tag = document.createElement('style');
          tag.dataset.plugin = 'rus-image-percent-gen';
          tag.textContent = SCALE_CSS;
          document.head.appendChild(tag);
          applyScale(currentScale);
          return () => {
            tag.remove();
            document.documentElement.style.removeProperty('--dsh-ui-scale');
          };
        }, 'ru-qhd: scale stylesheet');

        ctx.effect(() => installRectSpaceFix(), 'ru-qhd: rect coordinate space');
        ctx.effect(() => installScreenCentreOffset(), 'ru-qhd: screen-centred content');

        ctx.effect(() => {
          const disposers = [ctx.locale.addLanguage(LANGUAGE)];
          for (const ns of Object.keys(DICTIONARIES)) {
            disposers.push(ctx.locale.register(ns, 'ru', DICTIONARIES[ns]));
          }
          disposers.push(ctx.locale.register(OWN_NS, 'en', OWN_EN));
          disposers.push(ctx.locale.register(OWN_NS, 'ru', OWN_RU));
          for (const ns of Object.keys(EXTRA_RU)) {
            disposers.push(ctx.locale.register(ns, 'ru', EXTRA_RU[ns]));
          }
          return () => {
            for (const dispose of disposers) dispose();
          };
        }, 'ru-qhd: language and dictionaries');
        translate = ctx.locale.bind(OWN_NS);

        // Default the interface to Russian once per browser; a later explicit
        // language choice is left alone. The host-backed preference can arrive
        // after plugin activation, so this keeps re-asserting for a short while.
        let settled = false;
        let attempts = 0;
        const preferRussian = () => {
          if (settled) return;
          try {
            if (window.localStorage.getItem(LOCALE_MARKER) === '1') {
              settled = true;
              return;
            }
          } catch (error) {
            /* treat unreadable storage as "not applied yet" */
          }
          if (ctx.locale.getSnapshot().active === 'ru') {
            settled = true;
            try {
              window.localStorage.setItem(LOCALE_MARKER, '1');
            } catch (error) {
              /* nothing else to do */
            }
            return;
          }
          if (attempts >= 20) {
            settled = true;
            return;
          }
          attempts += 1;
          try {
            ctx.locale.setLocale('ru');
          } catch (error) {
            settled = true;
            console.error('dsh-ru-qhd: cannot select Russian', error);
          }
        };
        ctx.effect(() => ctx.locale.subscribe(preferRussian), 'ru-qhd: default language');

        // The zoom already enlarges everything, so the conversation text is
        // brought back to the physical size it had before scaling. Applied once,
        // so a later choice on the Sizes page is never fought.
        const FONT_MARKER = 'dsh-ru-qhd.content-font-balanced';
        try {
          themeService = ctx.get('theme');
          if (themeService) {
            publishFontSize(themeService.getTheme().fontSize);
            ctx.on('theme/change', (snapshot) => {
              if (snapshot && typeof snapshot.fontSize === 'number') {
                publishFontSize(snapshot.fontSize);
              }
            });
            let balanced = false;
            try {
              balanced = window.localStorage.getItem(FONT_MARKER) === '1';
            } catch (error) {
              balanced = false;
            }
            if (!balanced) {
              const target = Math.min(
                MAX_FONT,
                Math.max(MIN_FONT, Math.round(currentFontSize / currentScale)),
              );
              if (target !== currentFontSize) setFontSize(target);
              try {
                window.localStorage.setItem(FONT_MARKER, '1');
              } catch (error) {
                /* nothing else to do */
              }
            }
          }
        } catch (error) {
          console.error('ru-qhd: cannot read the conversation font size', error);
        }
        preferRussian();

        // The size control lives in the sidebar foot, so nothing of this bundle
        // renders inside the Settings panel: its code path stays untouched.
        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            {
              name: 'sidebar.footer.action',
              id: 'ru-qhd-size',
              order: 10,
              locale: OWN_NS,
              inject: () => ({ t: translate }),
            },
            SizeButton,
          ),
        );

        // The proxy switch sits beside it; it hides itself when the proxy
        // plugin is not composed.
        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            {
              name: 'sidebar.footer.action',
              id: 'ru-qhd-proxy',
              order: 20,
              locale: OWN_NS,
              inject: () => ({ t: translate }),
            },
            ProxyButton,
          ),
        );

        // Отдельная страница «Прокси» в настройках: адрес по частям, включение
        // маршрута, проверка кандидатов по пингу со страной выхода.
        registerProxySettingsPage(ctx);
      },
    };
  },
});
