import { IS_DEBUG_ENV } from '../../constants'
import {
  LangutilKeyword,
  LangutilKeywordIsolated,
  LangutilLanguage,
  LangutilLanguageIsolated,
  LangutilLocalizedValue,
  LangutilStringMapParam,
} from '../../schema'
import stringMap, { warnIfPlaceholdersArePresent } from '../string-map'
import { WarningDebouncer } from '../warning-debouncer'

export function baseLocalizer<D>(
  dictionary: D,
  language: LangutilLanguage<D>,
  keyword: LangutilKeyword<D>,
  param: LangutilStringMapParam,
  pushWarning: WarningDebouncer | undefined
): LangutilLocalizedValue<D> {

  let localizedValue: LangutilLocalizedValue<D>
  let isLocalizationSuccessful: boolean

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
    localizedValue = `${keyword}`.toUpperCase()
    if (IS_DEBUG_ENV) {
      pushWarning(
        language as LangutilLanguageIsolated,
        keyword as LangutilKeywordIsolated
      )
    }
  }

  return localizedValue
}
