const { NativeModules, Platform } = require('react-native');

function AUTO_DETECT() {
    const getLocale = Platform.select({
        android: () => { return NativeModules.I18nManager.localeIdentifier; },
        ios: () => { return NativeModules.SettingsManager.settings.AppleLocale; }
    });
    return getLocale();
}

module.exports = { AUTO_DETECT };
