import * as React from "react";

interface ReactLocalizableProps {
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
    casing?: localizableCasings;
    /**
     * @description Applies a transformation to the localized value.
     */
    transform?: (localizedValue: any) => {};
    /**
     * @description Specify which type of HTML/React element you would like your localizations to be rendered into. By default it is rendered as a `<span>`.
     */
    renderAs?: unknown;
}

type localizableCasings =
    | "lowercase"
    | "localeLowercase"
    | "uppercase"
    | "localeUppercase"
    | "titleCase"
    | "sentenceCase"

/**
 * @description A wrapper component for rendering HTML/React elements.
 */
export function Localizable(
    props: ReactLocalizableProps & React.HTMLAttributes<HTMLParagraphElement>
): React.ReactElement<{}>;