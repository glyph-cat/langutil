import { NativeModules, Platform } from 'react-native'

function getClientLanguage(): string {
  const getLocale = Platform.select({
    android: () => NativeModules.I18nManager.localeIdentifier,
    ios: () => {
      return (
        NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13+
      )
    },
  })
  const locale = getLocale()
  return locale ? locale : null
}

export default getClientLanguage
