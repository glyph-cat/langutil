import { IS_DEBUG_ENV } from '../constants'
import stringMap, { warnIfPlaceholdersArePresent } from '../string-map'

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
  if (typeof localizedValue === 'string') {
    if (param) {
      // If param is provided, do mapping, warning for leftover
      // placeholders will be shown in `stringMap`
      localizedValue = stringMap(localizedValue, param)
    } else {
      // Otherwise, perform a check in case placeholders are
      // present but there are no params provided
      warnIfPlaceholdersArePresent(localizedValue)
    }
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
