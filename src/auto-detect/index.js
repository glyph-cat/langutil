export default function AutoDetect() {
  if (typeof navigator !== 'undefined') {
    if (navigator.language) {
      return navigator.language
    } else if (navigator.userLanguage) {
      return navigator.userLanguage
    }
  }
  return null
}
