function getClientLanguage(): string | null {
  if (typeof navigator !== 'undefined') {
    if (navigator.language) {
      return navigator.language
    } else if (window['userLanguage']) {
      return navigator['userLanguage']
    }
  }
  return null
}

export default getClientLanguage
