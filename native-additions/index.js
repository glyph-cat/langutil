const React = require("react");
const { NativeModules, Platform, Text } = require("react-native");
const langutil = require("langutil");
const { LangProvider } = require("langutil/react-additions");

function detectLanguage() {
    const getLocale = Platform.select({
        ios: () => { return NativeModules.SettingsManager.settings.AppleLocale; },
        android: () => { return NativeModules.I18nManager.localeIdentifier; },
    });
    return getLocale();
}

class Localizable extends LangProvider {
    render() {
        const {
            keyword, children, paramArray = [], casing, transform, renderAs = Text, allowEmpty, ...otherProps
        } = this.props;
        let child = !children && keyword ? keyword : children;
        if (typeof child === "string") {
            child = langutil.localizeWith({
                keyword: child, paramArray, casing, transform, allowEmpty
            });
        }
        if (renderAs === "value") {
            return child;
        } else {
            return React.createElement(renderAs, otherProps, child);
        }
    }
}

module.exports = { detectLanguage, Localizable };