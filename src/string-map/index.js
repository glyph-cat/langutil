import { IS_DEBUG_ENV } from '../constants'
import { devPrint } from '../dev-log'
import { ERROR_STRINGMAP_INVALID_PARAM_TYPE } from '../errors'
import getRandomHash from '../get-random-hash'

const globalArrayPlaceholderPattern = /(%p)/g
const globalObjectPlaceholderPattern = /{:[a-z][a-z0-9.]*}/gi

/**
 * @description Substitutes all occurence of a key in the string with a random hash,
 * which the hash can be later be swapped into another value.
 * @param {string} str
 * @param {RegExp} rgx
 * @returns {[newStr: string, swapper: string]} The substituted string and the swapper used.
 */
export function substituteWithUniqueSwapper(str, rgx) {
  // %p is escaped with %%p, and {:key} with {::key}
  // A random hash that temporarily substitutes %%p and {::key} makes it possible
  // Random hash cannot be subset of the original string
  let hashLength = 2
  let swapper = '%q'
  while (str.includes(swapper)) {
    swapper = getRandomHash(hashLength++)
  }
  str = str.replace(rgx, swapper)
  return [str, swapper]
}

/**
 * @description Allows you to access object properties by dot notation.
 * @param {object} data The data that you wish to access it's value by dot notation.
 * @param {string} path The key of the item in dot notation.
 * @see https://stackoverflow.com/a/6491621
 * @returns {any}
 */
export function getItemByPath(data, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  const keyStack = path.split('.')
  for (let i = 0, n = keyStack.length; i < n; ++i) {
    const key = keyStack[i]
    if (key in data) {
      data = data[key]
    } else {
      return
    }
  }
  return data
}

/**
 * @description Substitutes each element in an array into a given string.
 * @param {string} newStr String to modify
 * @param {Array} arr Array to use
 * @returns {string} The mapped string.
 */
export function stringMapArray(str, arr) {
  const swapperSpecs = substituteWithUniqueSwapper(str, /(%%p)/g)
  let newStr = swapperSpecs[0]
  const swapper = swapperSpecs[1]

  // Detect real placeholders and substitute them with parameters
  const placeholderCount =
    newStr.match(globalArrayPlaceholderPattern)?.length || 0

  if (arr.length < placeholderCount) {
    devPrint(
      'warn',
      `Found ${placeholderCount} placeholders but ${arr.length} value(s) are supplied in '${str}'`
    )
  }

  // Avoid getting undefined values in case `placeholderCount !== arr.length`
  let maximumLoopCount = Math.min(placeholderCount, arr.length)
  for (let i = 0; i < maximumLoopCount; i++) {
    newStr = newStr.replace(/(%p)/, arr[i])
  }

  // Restore escaped %p
  newStr = newStr.replace(new RegExp(`(${swapper})`, 'g'), '%p')

  return newStr
}

/**
 * @description Replaces all {:placeholder} in `string` with `data.placeholder`.
 * @param {string} str The original string containing {:placeholders}.
 * Use double-colon such as {::placeholder} to escape from swapping.
 * @param {object} obj The supplementary data where its items will be swapped
 * into the string.
 * @returns {string} The mapped string.
 */
export function stringMapObject(str, obj) {
  let newString = `${str}`
  // 1. Get array of placeholders
  const rawPlaceholders = newString.match(globalObjectPlaceholderPattern)
  // 2. Remove duplicates
  const placeholders = Array.from(new Set(rawPlaceholders))
  // 3. For each placeholder, replace them with _data
  for (const p of placeholders) {
    const rgx = new RegExp(p, 'g')
    // 4. remove the '{:' and '}'
    const _p = p.replace(/^{:/, '').replace(/}$/, '')
    // Data is accessed based on dot notation only when needed instead of
    // accessing it by flattening out the children
    const valueToSwap = getItemByPath(obj, _p)
    if (valueToSwap) {
      newString = newString.replace(rgx, `${valueToSwap}`)
    }
  }
  newString = newString.replace(/{::/g, '{:') // level-down
  return newString
}

/**
 * @description A convenience wrapper around `stringMapArray` and `stringMapObject`
 * @param {string} str
 * @param {Array|object} param
 * @returns {string}
 */
export default function stringMap(str, param) {
  // NOTE: Only escaped placeholders relevant to the param type provided
  // will be level-downed. This means {::key} will not be level-downed if
  // the provided param type is an array.
  if (Array.isArray(param)) {
    const mappedString = stringMapArray(str, param)
    warnIfPlaceholdersArePresent(mappedString)
    return mappedString
  } else if (typeof param === 'object') {
    const mappedString = stringMapObject(str, param)
    warnIfPlaceholdersArePresent(mappedString)
    return mappedString
  } else {
    throw new TypeError(ERROR_STRINGMAP_INVALID_PARAM_TYPE(param))
  }
}

/**
 * @param {string} str
 * @returns {boolean|undefined}
 */
export function warnIfPlaceholdersArePresent(str) {
  if (IS_DEBUG_ENV) {
    let shouldWarn = false
    if (
      str.match(globalArrayPlaceholderPattern) ||
      str.match(globalObjectPlaceholderPattern)
    ) {
      shouldWarn = true
    }
    if (shouldWarn) {
      devPrint('warn', `Leftover placeholders found in '${str}'`)
    }
    return shouldWarn
  }
}
