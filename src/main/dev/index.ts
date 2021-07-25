/* eslint-disable no-console */
import { IS_DEBUG_ENV } from '../../constants'

type DevConsoleMethods = 'info' | 'log' | 'warn' | 'error';

if (IS_DEBUG_ENV) {
  // eslint-disable-next-line no-var
  var onlyOnceCache: Record<DevConsoleMethods, Record<string, boolean>> = {
    log: {},
    info: {},
    warn: {},
    error: {},
  }
}

export function devPrint(type: DevConsoleMethods, message: string): void {
  if (IS_DEBUG_ENV) {
    console[type](`[Development] ${message}`)
  }
}

export function devPrintOnce(
  type: DevConsoleMethods,
  key: string,
  message: string
): void {
  if (IS_DEBUG_ENV) {
    if (!onlyOnceCache[type][key]) {
      onlyOnceCache[type][key] = true
      console[type](`[Development] ${message}`)
    }
  }
}

export function deprecationWarn(key: string, message: string): void {
  devPrintOnce('warn', key, `Deprecation warning: ${message}`)
}

export function displayStringArray(array: Array<string>): string {
  if (array.length <= 0) {
    return '[]'
  } else {
    return `['${array.join('\', \'')}']`
  }
}
