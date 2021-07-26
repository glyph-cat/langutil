import { LangutilLanguage } from '../../schema'

/**
 * Gets the current device's language.
 * @public
 * @returns A a string representing the client language or null if unavailable.
 */
function getClientLanguage(): Array<LangutilLanguage> | null {
  if (typeof navigator !== 'undefined') {
    if (navigator.language) {
      return [navigator.language]
    } else if (navigator['userLanguage']) {
      return [navigator['userLanguage']]
    }
  }
  return null
}

export default getClientLanguage
