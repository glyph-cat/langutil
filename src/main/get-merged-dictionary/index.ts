import { LangutilDictionaryIsolated, LangutilLanguage } from '../../schema'

/**
 * @description Merges two dictionaries together
 * BUT dictionaries must be of the same language-keyword structure.
 * @param d1 The first dictionary
 * @param d2 The second dictionary
 * @returns A new copy of the merged dictionary
 */
export default function getMergedDictionary(
  d1: LangutilDictionaryIsolated,
  d2: LangutilDictionaryIsolated
): LangutilDictionaryIsolated {
  const merged: LangutilDictionaryIsolated = {}
  const d1LanguageStack: Array<LangutilLanguage> = Object.keys(d1)
  const d2LanguageStack: Array<LangutilLanguage> = Object.keys(d2)
  // Merge the languages and remove duplicates
  const mergedLanguageStack: Array<LangutilLanguage> = [
    ...new Set([...d1LanguageStack, ...d2LanguageStack]),
  ]
  for (let i = 0; i < mergedLanguageStack.length; i++) {
    const language = mergedLanguageStack[i]
    merged[language] = { ...d1[language], ...d2[language] }
  }
  return merged
}
