import { LangutilLanguageIsolated } from '../../schema'

/**
 * @param uL Unconfirmed language.
 * @param aLStack Available languages.
 * @returns The resolved language.
 */
export function getResolvedLanguageFromList(
  uL: LangutilLanguageIsolated,
  aLStack: Array<LangutilLanguageIsolated>
): LangutilLanguageIsolated | null {
  if (!uL) {
    return null
  }
  for (let aL of aLStack) {
    // This is because the keys will be converted to lowercase below, but when
    // returning a resolved key, it should be based on the original aLStack
    const originalAL = aL

    // First level comparison by cross checking with
    aL = aL.toLowerCase() // Eg: 'en'
    uL = uL.toLowerCase() // Eg: 'en_us'
    if (uL.includes(aL) || aL.includes(uL)) {
      return originalAL // Return the current inspected available language
    } // Early exit

    // If still no match, split by dashes and underscores
    // to perform a more granular comparison
    const splitter = /_|-/g
    const aLSub = aL.split(splitter) // Eg: ['en']
    const uLSub = uL.split(splitter) // Eg: ['en', 'US']
    for (const a of aLSub) {
      // Eg: a = 'en'
      if (uLSub.includes(a)) {
        return originalAL
      } // Early exit
    }
  }

  return null
}
