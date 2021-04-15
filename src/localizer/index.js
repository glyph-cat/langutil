import { IS_DEBUG_ENV } from '../constants'
import stringMap from '../string-map'

export function baseLocalizer(
  dictionary,
  language,
  keyword,
  param,
  debouncedWarning
) {
  let localizedValue, isLocalizationSuccessful

  if (dictionary[language] && dictionary[language][keyword]) {
    localizedValue = dictionary[language][keyword]
    isLocalizationSuccessful = true
  }

  // Apply params
  if (typeof localizedValue === 'string' && param) {
    localizedValue = stringMap(localizedValue, param)
    // NOTE: Any remaining placeholders are left as is so that they can
    // be spotted easily and urge for necessary fixes to be applied
  }

  if (!isLocalizationSuccessful) {
    localizedValue = keyword.toUpperCase()
    if (IS_DEBUG_ENV) {
      debouncedWarning.pushWarning(language, keyword)
    }
  }

  return localizedValue
}
