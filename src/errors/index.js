import { IS_DEBUG_ENV } from '../constants'

export function formatErrorCode(code, ...args) {
  return `LangutilErr${code}-${args.join(',')}`
}

export function ERROR_STRINGMAP_INVALID_PARAM_TYPE(param) {
  const typeofParam = typeof param
  if (IS_DEBUG_ENV) {
    return `Expected 'param' to be an array or object but got ${typeof typeofParam}`
  } else {
    return formatErrorCode(1, typeofParam)
  }
}

export function ERROR_SET_LANGUAGE_OPTIONS_INVALID_TYPE(options) {
  const typeofOptions = typeof options
  if (IS_DEBUG_ENV) {
    return `Expected 'options' to be an object but got ${typeofOptions}`
  } else {
    return formatErrorCode(2, typeofOptions)
  }
}

export function ERROR_DICTIONARY_INVALID_TYPE(dictionary) {
  const typeofDictionary = typeof dictionary
  if (IS_DEBUG_ENV) {
    return `Expected dictionary to be an object but got ${typeofDictionary}`
  } else {
    return formatErrorCode(3, typeofDictionary)
  }
}

export function ERROR_CLASHING_LANGSTATE_PROP(componentDisplayName) {
  if (IS_DEBUG_ENV) {
    return `Prop conflict for 'langState' in ${componentDisplayName}`
  } else {
    return formatErrorCode(4, componentDisplayName)
  }
}
