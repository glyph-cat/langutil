import { LangutilLanguage } from '../../schema'

/**
 * Gets the available languages on the current device.
 * @public
 * @returns A array of strings representing the available client languages, or
 * null if unavailable.
 */
function getClientLanguages(): Array<LangutilLanguage> | null {
  if (typeof navigator !== 'undefined') {
    if (navigator.language) {
      return [navigator.language]
    } else if (navigator['userLanguage']) {
      return [navigator['userLanguage']]
    }
  }
  return null
}

export default getClientLanguages
