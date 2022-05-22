import { IS_DEV_ENV } from '../../constants'

/**
 * @internal
 */
export function devError(message: string): void {
  if (IS_DEV_ENV) {
    // eslint-disable-next-line no-console
    console.error(message)
  }
}

/**
 * @internal
 */
export function devInfo(message: string): void {
  if (IS_DEV_ENV) {
    // eslint-disable-next-line no-console
    console.info(message)
  }
}

/**
 * @internal
 */
export function devWarn(message: string): void {
  if (IS_DEV_ENV) {
    // eslint-disable-next-line no-console
    console.warn(message)
  }
}

/**
 * @internal
 */
export function displayStringArray(array: Array<string>): string {
  // eslint-disable-next-line quotes
  return array.length <= 0 ? '[]' : `['${array.join("', '")}']`
}
