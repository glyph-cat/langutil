// eslint-disable-next-line import/no-deprecated
import { NativeModules, Platform } from 'react-native'
import { LangutilLanguage } from '../../schema'

function getClientLanguage(): Array<LangutilLanguage> {
  // TODO: Return as array
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
