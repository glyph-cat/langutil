import { NativeModules, Platform } from 'react-native'
import { LangutilLanguage } from '../../schema'
import { parseAppleKeyboards } from './parse-apple-keyboards'

export function getClientLanguages(): Array<LangutilLanguage> | null {
  const getLocale = Platform.select({
    android: () => {
      // Is a string, must wrap in [] to convert to array
      return [NativeModules.I18nManager.localeIdentifier]
    },
    ios: () => {
      const { settings } = NativeModules.SettingsManager
      if (settings.AppleLanguages) {
        return settings.AppleLanguages
      } else if (settings.NSLanguages) {
        return settings.NSLanguages
      } else if (settings.AppleKeyboards) {
        return parseAppleKeyboards(settings.AppleKeyboards)
      } else if (settings.AppleLocale) {
        // * It seems that this is used for iOS ≤12
        // * Is a string, must wrap in [] to convert to array
        return [NativeModules.SettingsManager.settings.AppleLocale]
      } else {
        return null
      }
    },
  })
  return getLocale()
}
