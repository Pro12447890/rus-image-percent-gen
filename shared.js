/**
 * Общие помощники плагина rus-image-percent-gen.
 *
 * Файлы инструкций нужны обоим инструментам — `pixel_art` читает
 * `instructions/pixel-art.<язык>.md`, `proxy_switch` — `instructions/proxy.<язык>.md`,
 * поэтому чтение живёт в отдельном модуле.
 */
import { readFile } from 'node:fs/promises'

/** Кэш файлов инструкций (`pixel-art` / `proxy`, ru/en). */
const instructionCache = new Map()

/**
 * Прочитать файл инструкций рядом с плагином.
 * @param lang - `ru` или `en` (по умолчанию ru).
 * @param kind - имя файла без языка: `pixel-art` или `proxy`.
 * @returns текст инструкции.
 */
export async function readInstructions(lang, kind = 'pixel-art') {
  const chosen = lang === 'en' ? 'en' : 'ru'
  const cacheKey = `${kind}.${chosen}`
  if (instructionCache.has(cacheKey)) return instructionCache.get(cacheKey)
  const file = new URL(`./instructions/${kind}.${chosen}.md`, import.meta.url)
  const text = await readFile(file, 'utf8')
  instructionCache.set(cacheKey, text)
  return text
}
