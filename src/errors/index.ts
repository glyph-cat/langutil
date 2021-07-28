/* eslint functional/no-throw-statement: "error" */
// NOTE: The functions here only return errors.
// The errors should then be thrown in the parent function that calls them.
import { IS_DEBUG_ENV } from '../constants'

export function __formatErrorCode(
  code: number,
  ...args: Array<unknown>
): string {
  const PREFIX = 'LangutilE'
  if (args.length > 0) {
    return `${PREFIX}${code}-${args.join(',')}`
  } else {
    return `${PREFIX}${code}`
  }
}

export function TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE(
  param: unknown
): TypeError {
  const typeofParam = typeof param
  return new TypeError(
    IS_DEBUG_ENV
      ? `Expected \`param\` to be an array or object but got ${typeofParam}`
      : __formatErrorCode(1, typeofParam)
  )
}

export function TYPE_ERROR_DICTIONARY_INVALID_TYPE(
  dictionary: unknown
): TypeError {
  const typeofDictionary = typeof dictionary
  return new TypeError(
    IS_DEBUG_ENV
      ? `Expected \`dictionary\` to be an object but got ${typeofDictionary}`
      : __formatErrorCode(2, typeofDictionary)
  )
}

export function SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP(
  componentDisplayName: string
): SyntaxError {
  return new SyntaxError(
    IS_DEBUG_ENV
      ? `Prop conflict for \`langutilState\` in <${componentDisplayName}/>`
      : __formatErrorCode(3, componentDisplayName)
  )
}
