const React = require("react");
const { NativeModules, Platform, Text } = require("react-native");
const langutil = require("langutil");
module.exports = { Localizable: Localizable, detectLanguage: detectLanguage };

function detectLanguage() {
    const getLocale = Platform.select({
        ios: () => { return NativeModules.SettingsManager.settings.AppleLocale; },
        android: () => { return NativeModules.I18nManager.localeIdentifier; },
    });
    return getLocale();
}

function Localizable({
    keyword, children, paramArray = [], casing, transform, renderAs = Text, ...otherProps
}) {
    if (!children && keyword) { children = keyword; }
    if (typeof children === "string") {
        children = langutil.localizeWith({
            keyword: children,
            paramArray: paramArray,
            casing: casing,
            transform: transform
        });
    }
    return React.createElement(renderAs, otherProps, children);
}