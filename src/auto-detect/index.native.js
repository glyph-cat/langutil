import { NativeModules, Platform } from 'react-native'

export default function AutoDetect() {
  const getLocale = Platform.select({
    android: () => NativeModules.I18nManager.localeIdentifier,
    ios: () => NativeModules.SettingsManager.settings.AppleLocale,
  })
  const locale = getLocale()
  return locale ? locale : null
}
