import { LangutilDictionaryIsolated, LangutilLanguage } from '../../schema'

export function getResolvedLanguageAnyToMany<D = LangutilDictionaryIsolated>(
  ul: Array<LangutilLanguage> | LangutilLanguage,
  al: Array<LangutilLanguage<D>>
): LangutilLanguage<D> | null {
  if (Array.isArray(ul)) {
    return getResolvedLanguageManyToMany(ul, al)
  } else {
    return getResolvedLanguageOneToMany(ul, al)
  }
}

export function getResolvedLanguageManyToMany<D = LangutilDictionaryIsolated>(
  unconfirmedLanguageStack: Array<LangutilLanguage>,
  availableLanguageStack: Array<LangutilLanguage<D>>
): LangutilLanguage<D> | null {

  if (!unconfirmedLanguageStack || unconfirmedLanguageStack.length <= 0) {
    return null
  } // Early exit

  for (let i = 0; i < unconfirmedLanguageStack.length; i++) {
    const resolvedLanguage = getResolvedLanguageOneToMany(
      unconfirmedLanguageStack[i],
      availableLanguageStack
    )
    if (resolvedLanguage) { return resolvedLanguage } // Early exit
  }

  return null // Last resort

}

/**
 * @returns The resolved language.
 */
export function getResolvedLanguageOneToMany<D = LangutilDictionaryIsolated>(
  unconfirmedLanguage: LangutilLanguage,
  availableLanguageStack: Array<LangutilLanguage<D>>
): LangutilLanguage<D> | null {

  if (!unconfirmedLanguage) { return null } // Early exit

  for (const originalAvailableLanguage of availableLanguageStack) {

    /**
     * @example 'en'
     */
    const availableLanguage = (originalAvailableLanguage as string).toLowerCase()

    // First level comparison by cross checking the unconfirmed language with
    // available languages
    unconfirmedLanguage = unconfirmedLanguage.toLowerCase() // Eg: 'en_us'
    if (unconfirmedLanguage.includes(availableLanguage) || availableLanguage.includes(unconfirmedLanguage)) {
      return originalAvailableLanguage
    } // Early exit

    // If still no match, split by dashes and underscores
    // to perform a more granular comparison
    const splitter = /_|-/g
    const aLSub = availableLanguage.split(splitter) // Eg: ['en']
    const uLSub = unconfirmedLanguage.split(splitter) // Eg: ['en', 'US']
    for (const a of aLSub) {
      // Eg: a = 'en'
      if (uLSub.includes(a)) {
        return originalAvailableLanguage
      } // Early exit
    }
  }

  return null // Last resort

}
