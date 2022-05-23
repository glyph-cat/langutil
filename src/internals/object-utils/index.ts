import { EMPTY_OBJECT } from '../../constants'

export function propertyExists(
  obj: Record<string, unknown>,
  key: string
): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Allows you to access object properties by dot notation.
 * @param data The data that you wish to access it's value by dot notation.
 * @param path The key of the item in dot notation.
 * @see https://stackoverflow.com/a/6491621
 * @returns The value of item at the specified path.
 */
export function getItemByPath(
  data: Record<string, unknown>,
  path: string
): unknown {
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  const keyStack = path.split('.')
  for (let i = 0, n = keyStack.length; i < n; ++i) {
    const key = keyStack[i]
    if (propertyExists(data, key)) {
      data = data[key] as Record<string, unknown>
    } else {
      return EMPTY_OBJECT
    }
  }
  return data
}
