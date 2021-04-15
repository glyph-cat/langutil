/**
 * @description Merges two dictionaries together
 * BUT dictionaries must be of the same language-keyword structure.
 * @param {object} d1 The first dictionary
 * @param {object} d2 The second dictionary
 * @returns {object} A new copy of the merged dictionary
 */
export default function getMergedDictionary(d1, d2) {
  const merged = {}
  const d1LanguageStack = Object.keys(d1)
  const d2LanguageStack = Object.keys(d2)
  // Merge the languages and remove duplicates
  const mergedLanguageStack = [
    ...new Set([...d1LanguageStack, ...d2LanguageStack]),
  ]
  for (const language of mergedLanguageStack) {
    merged[language] = { ...d1[language], ...d2[language] }
  }
  return merged
}
