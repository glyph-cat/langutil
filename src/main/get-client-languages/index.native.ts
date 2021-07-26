// eslint-disable-next-line import/no-deprecated
import { NativeModules, Platform } from 'react-native'
import { LangutilLanguage } from '../../schema'

function getClientLanguages(): Array<LangutilLanguage> | null {
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

export default getClientLanguages

export function parseAppleKeyboards<S extends string = string>(
  values: Array<S>
): Array<S> {
  const parsedValues = []
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    // Value splitting
    // 'en_US@sw=QWERTY;hw=Automatic' -> ['en_US', 'sw=QWERTY;hw=Automatic']
    parsedValues.push(value.split('@')[0])
  }
  return parsedValues
}
