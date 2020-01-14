import * as React from 'react';

/**
 * @description A hook for the appendDictionary method.
 * @param dict The object containing the new localizations to merge.
 */
export function useAppend(dict: object): void;

/**
 * @description Hook function that allows your existing components to listen for changes in langutil and update themselves accordingly.
 */
export function useLang(): LangStateSpecs;

/**
 * @description A Higher-order component that allows your existing components to listen for changes in langutil and update themselves accordingly.
 * At the same time, a `langState` prop will provided to the component.
 */
export function withLang(WrappedComponent: (
  props: {
    langState: LangStateSpecs
  }
) => React.Component<{}>): React.ReactElement<{}>;

interface LangStateSpecs {
  /**
   * @description Was auto detection being used?
   */
  auto: boolean,
  /**
   * @description The currently set language.
   */
  lang: string
}

/**
 * @description A wrapper component for rendering HTML/React elements.
 */
export function Localizable(
  props: ReactLocalizableProps & React.HTMLAttributes<HTMLParagraphElement>
): React.ReactElement<{}>;

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
  casing?: LocalizableCasings;
  /**
   * @description Applies a transformation to the localized value.
   */
  transform?: (localizedValue: any) => {};
  /**
   * @description Specify which type of HTML/React element you would like your localizations to be rendered into. By default it is rendered as a `<span>`.
   * To obtain the raw value of the localization, use `renderAs="value"`.
   */
  renderAs?: unknown;
  /**
   * @description Ignore warnings about empty keywords.
   */
  allowEmpty?: boolean;
}

type LocalizableCasings =
  | 'lowercase'
  | 'localeLowercase'
  | 'uppercase'
  | 'localeUppercase'
  | 'titleCase'
  | 'sentenceCase'
