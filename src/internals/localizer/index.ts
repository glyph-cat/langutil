import { IS_DEBUG_ENV } from '../../constants'
import { stringmap, warnIfPlaceholdersArePresent } from '../../api/stringmap'
import {
  LangutilKeyword,
  LangutilLanguage,
  LangutilLocalizedValue,
  LangutilStringmapParam,
} from '../../schema'
import { propertyExists } from '../object-utils'
import { WarningDebouncer } from '../warning-debouncer'

/**
 * The internal or "base" function, which all other variations of the
 * "localize" function stem from.
 * @param dictionary - The source of localizations.
 * @param language - The language to localize to.
 * @param keyword - The keyword to be localized.
 * @param param - Extra parameters to be inserted into the localized value.
 * @param warningDebouncer - A {@link WarningDebouncer}.
 * @returns The localized value.
 * @internal
 */
export function baseLocalizer<D>(
  dictionary: D,
  language: LangutilLanguage<D>,
  keyword: LangutilKeyword<D>,
  param: LangutilStringmapParam,
  warningDebouncer: WarningDebouncer | undefined
): LangutilLocalizedValue<D> {

  let localizedValue: LangutilLocalizedValue<D>
  let localizationIsSuccessful: boolean

  if (dictionary[language]) {
    const dL = dictionary[language]
    const kw = keyword as keyof D[keyof D]
    if (propertyExists(dL as unknown as Record<string, unknown>, kw as string)) {
      localizedValue = dL[kw]
      localizationIsSuccessful = true
    }
  }

  if (localizationIsSuccessful) {
    // Apply params
    if (typeof localizedValue === 'string') {
      if (param) {
        // If param is provided, do mapping, warning for leftover
        // placeholders will be shown in `stringmap`
        localizedValue = stringmap(localizedValue, param)
      } else {
        // Otherwise, perform a check in case placeholders are
        // present but there are no params provided
        warnIfPlaceholdersArePresent(localizedValue)
      }
      // NOTE: Any remaining placeholders are left as is so that they can
      // be spotted easily and urge for necessary fixes to be applied
    }
  } else {
    localizedValue = String(keyword).toUpperCase()
    if (IS_DEBUG_ENV) {
      warningDebouncer.M$pushWarning(
        language as LangutilLanguage,
        keyword as LangutilKeyword
      )
    }
  }

  return localizedValue
}
