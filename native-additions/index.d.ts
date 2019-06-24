import * as React from "react";
import * as ReactNative from "react-native";

interface NativeLocalizableProps {
    children: string;
    /**
     * @description The keyword for localization.
     */
    keyword: string;
    /**
     * @description An array of parameters that can be passed into the localization.
     */
    paramArray?: Array<unknown>;
    /**
     * @description Casing styles that will be applied to if the localized value is a string.
     */
    casing?: LocalizableCasings;
    /**
     * @description Applies a transformation to the localized value.
     */
    transform?: (localizedValue: any) => {};
    /**
     * @description Specify a custom component that you would like your localizations to be rendered into. By default it is rendered as a `<Text>` from th React Native library.
     */
    renderAs?: unknown;
}

type LocalizableCasings =
| "lowercase"
| "localeLowercase"
| "uppercase"
| "localeUppercase"
| "titleCase"
| "sentenceCase"

/**
 * @description A wrapper component for <Text/>.
 */
export function Localizable(
    props: NativeLocalizableProps & ReactNative.TextProps
): React.ReactElement<{}>;

/**
 * @description Detect language on native platforms.
 */
export function detectLanguage(): string;