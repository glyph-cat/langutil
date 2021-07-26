// eslint-disable-next-line import/no-deprecated
import { NativeModules, Platform } from 'react-native'
import { LangutilLanguage } from '../../schema'

/**
 * Gets the available languages on the current device.
 * @public
 * @returns A a string representing the client language or null if unavailable.
 */
function getClientLanguages(): Array<LangutilLanguage> | null {
  const getLocale = Platform.select({
    android: () => NativeModules.I18nManager.localeIdentifier,
    ios: () => {
      return (
        // iOS ≥13 returns an array
        NativeModules.SettingsManager.settings.AppleLanguages ||
        // iOS ≤12 returns a string
        [NativeModules.SettingsManager.settings.AppleLocale]
      )
    },
  })
  const locale = getLocale()
  return locale ? locale : null
}

export default getClientLanguages
