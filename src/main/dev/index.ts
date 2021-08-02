/* eslint-disable no-console */
import { IS_DEBUG_ENV } from '../../constants'

type DevConsoleMethods = keyof typeof console

function devPrint(type: DevConsoleMethods, message: string): void {
  if (IS_DEBUG_ENV) {
    console[type](`[Development] ${message}`)
  }
}

export function devInfo(message: string): void {
  devPrint('info', message)
}

export function devWarn(message: string): void {
  devPrint('warn', message)
}

export function displayStringArray(array: Array<string>): string {
  // eslint-disable-next-line quotes
  return array.length <= 0 ? '[]' : `['${array.join("', '")}']`
}
