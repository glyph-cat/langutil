/**
 * @author chin98edwin
 * @copyright Copyright (c) 2018 - present, chin98edwin
 * @description Localization for JavaScript made simple.
 * @version 3.0.2
 **/

declare namespace langutil {

  /**
   * @description Initialize langutil with a dictionary and language. Shorthand for `setDictionary` and `setLanguage`.
   * @param dict The object containing all localizations.
   * @param lang The language to use.
   * @param detector A langutil built-in function, pass `AUTO_DETECT` into this parameter to allow auto-language detection.
   */
  function init(dict: object, lang: LanguageCodes | string, detector?: Function): void;

  /**
   * @description Sets the dictionary. We encourage using `init` and not changing the contents of the dictionary in halfway. Unless the dictionary has been splitted up into sections for lazy loading.
   * @param dict The object containing all localizations.
   */
  function setDictionary(dict: object): void;

  /**
   * @description Sets the language.
   * @param lang The language to use.
   * @param detector A langutil built-in function, pass `AUTO_DETECT` into this parameter to allow auto-language detection.
   */
  function setLanguage(lang: LanguageCodes | string, detector?: Function): void;

  /**
   * @description Maps a keyword to its localized value.
   * @param keyword A short string representing the localized value.
   * @param param An array or object which each of their values can be swapped into localizations.
   * @param casing Casing styles that will be applied to the localized value if it is a string.
   * @param transform Apply a transformation to the localized value.
   * @returns The localized value.
   */
  function localize(
    keyword: string,
    param?: Array<unknown> | object,
    casing?: Casings,
    transform?: (localizedValue: unknown) => unknown
  ): unknown;

  /**
   * @description Maps a keyword to its localized value.
   * @returns The localized value.
   */
  function localize(props: {
    /**
     * @description A short string representing the localized value.
     */
    keyword: string,
    /**
     * @description An array or object which each of their values can be swapped into localizations.
     */
    param?: Array<unknown> | object,
    /**
     * @description Casing styles that will be applied to the localized value if it is a string.
     */
    casing?: Casings,
    /**
     * @description Apply a transformation to the localized value.
     */
    transform?: (localizedValue: unknown) => unknown
  }): unknown;

  /**
   * @description Get the currently set language.
   * @returns The string representation of the language.
   */
  function getCurrentLanguage(): string;

  /**
   * @description Get the list of language that have been defined in the dictionary.
   * @returns All languages found in the dictionary.
   */
  function getDefinedLanguages(): Array<LanguageCodes | string>;

  /**
   * @description A detector function meant to be used in conjunction with `init` or `setLanguage`.
   */
  const AUTO_DETECT: object;

  namespace logs {

    /**
     * @description Show logs from langutil
     */
    function show(): void;

    /**
     * @description Hide logs from langutil
     */
    function hide(): void;

    /**
     * @description Show verbose logs from langutil
     */
    function showVerbose(): void;

    /**
     * @description Hide verbose logs from langutil
     */
    function hideVerbose(): void;

    /**
     * @description If you have chosen to hide away langutil logs but want to log a portion of code with it, place your code inside the callback.
     * @param fn The callback which you want langutil to focus its logs on.
     * @returns True if the callback was sucessful.
     */
    function focus(fn: Function): boolean;

  }

  /**
   * @description Determine if auto language detection is used.
   */
  function isAuto(): boolean;

  /**
   * @description Creates a key for your dictionary.
   * @param keyword A short string representing the localized value.
   * @param localizations The translation.
   * @deprecated 2.4.0 (Will be removed by March 2020)
   * @returns A Keyword object.
   */
  function createKey(keyword: string, localizations: object): Keyword;

  /**
   * @description Get the currently set language.
   * @deprecated 2.4.0 (Will be removed by March 2020)
   * @returns The string representation of the language.
   */
  function getLanguage(): string;

  /**
   * @description Maps a keyword to its localized value.
   * @deprecated 2.4.0 (Will be removed by March 2020)
   * @returns The localized value.
   */
  function localizeWith(props: {
    /**
     * @description A short string representing the localized value.
     */
    keyword: string,
    /**
     * @description An array or object which each of their values can be swapped into localizations.
     */
    paramArray?: Array<unknown>,
    /**
     * @description Casing styles that will be applied to the localized value if it is a string.
     */
    casing?: Casings,
    /**
     * @description Apply a transformation to the localized value.
     */
    transform?: (localizedValue: unknown) => unknown
  }): unknown;

  /**
   * @description If your dictionary has not yet been completed and the warning about missing localizations bother you, you can use this to suppress the warning until a given date.
   * @deprecated 2.4.0 (Will be removed by March 2020)
   * @param due The due date where warning will be shown again.
   */
  function snoozeInspectionUntil(due: Date): void;

}

interface Keyword {
  /**
   * @description The keyword for localization.
   */
  keyword: string;
  /**
   * @description The translations of the keyword in each language.
   */
  localizations: LocalizableLanguages;
}

type Casings =
  | 'lowerCase'
  | 'localeLowerCase'
  | 'localeUpperCase'
  | 'sentenceCase'
  | 'titleCase'
  | 'upperCase'

type LanguageCodes = 'af' | 'sq' | 'ar-sa' | 'ar-iq' | 'ar-eg' | 'ar-ly' | 'ar-dz' | 'ar-ma' | 'ar-tn' | 'ar-om' | 'ar-ye' | 'ar-sy' | 'ar-jo' | 'ar-lb' | 'ar-kw' | 'ar-ae' | 'ar-bh' | 'ar-qa' | 'eu' | 'bg' | 'be' | 'ca' | 'zh-tw' | 'zh-cn' | 'zh-hk' | 'zh-sg' | 'hr' | 'cs' | 'da' | 'nl' | 'nl-be' | 'en' | 'en-us' | 'en-gb' | 'en-au' | 'en-ca' | 'en-nz' | 'en-ie' | 'en-za' | 'en-jm' | 'en' | 'en-bz' | 'en-tt' | 'et' | 'fo' | 'fa' | 'fi' | 'fr' | 'fr-be' | 'fr-ca' | 'fr-ch' | 'fr-lu' | 'gd' | 'gd-ie' | 'de' | 'de-ch' | 'de-at' | 'de-lu' | 'de-li' | 'el' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'it' | 'it-ch' | 'ja' | 'ko' | 'ko' | 'lv' | 'lt' | 'mk' | 'mt' | 'no' | 'no' | 'pl' | 'pt-br' | 'pt' | 'rm' | 'ro' | 'ro-mo' | 'ru' | 'ru-mo' | 'sz' | 'sr' | 'sr' | 'sk' | 'sl' | 'sb' | 'es' | 'es' | 'es-ar' | 'es-gt' | 'es-cr' | 'es-pa' | 'es-do' | 'es-mx' | 'es-ve' | 'es-co' | 'es-pe' | 'es-ec' | 'es-cl' | 'es-uy' | 'es-py' | 'es-bo' | 'es-sv' | 'es-hn' | 'es-ni' | 'es-pr' | 'sx' | 'sv' | 'sv-fi' | 'th' | 'ts' | 'tn' | 'tr' | 'uk' | 'ur' | 've' | 'vi' | 'xh' | 'ji' | 'zu';

interface LocalizableLanguages {
  /** Afrikaans */ 'af': string;
  /** Albanian */ 'sq': string;
  /** Arabic (Saudi Arabia) */ 'ar-sa': string;
  /** Arabic (Iraq) */ 'ar-iq': string;
  /** Arabic (Egypt) */ 'ar-eg': string;
  /** Arabic (Libya) */ 'ar-ly': string;
  /** Arabic (Algeria) */ 'ar-dz': string;
  /** Arabic (Morocco) */ 'ar-ma': string;
  /** Arabic (Tunisia) */ 'ar-tn': string;
  /** Arabic (Oman) */ 'ar-om': string;
  /** Arabic (Yemen) */ 'ar-ye': string;
  /** Arabic (Syria) */ 'ar-sy': string;
  /** Arabic (Jordan) */ 'ar-jo': string;
  /** Arabic (Lebanon) */ 'ar-lb': string;
  /** Arabic (Kuwait) */ 'ar-kw': string;
  /** Arabic (Bahrain) */ 'ar-bh': string;
  /** Arabic (Qatar) */ 'ar-qa': string;
  /** Basque */ 'eu': string;
  /** Bulgarian */ 'bg': string;
  /** Belarusian */ 'be': string;
  /** Catalan */ 'ca': string;
  /** Chinese (Taiwan) */ 'zh-tw': string;
  /** Chinese (PRC) */ 'zh-cn': string;
  /** Chinese (Hong Kong SAR) */ 'zh-hk': string;
  /** Chinese (Singapore) */ 'zh-sg': string;
  /** Croatian */ 'hr': string;
  /** Czech */ 'cs': string;
  /** Danish */ 'da': string;
  /** Dutch (Standard) */ 'nl': string;
  /** Dutch (Belgium) */ 'nl-be': string;
  /** English, English (Caribbean) */ 'en': string;
  /** English (United States) */ 'en-us': string;
  /** English (United Kingdom) */ 'en-gb': string;
  /** English (Australia) */ 'en-au': string;
  /** English (Canada) */ 'en-ca': string;
  /** English (New Zealand) */ 'en-nz': string;
  /** English (Ireland) */ 'en-ie': string;
  /** English (South Africa) */ 'en-za': string;
  /** English (Jamaica) */ 'en-jm': string;
  /** English (Belize) */ 'en-bz': string;
  /** English (Trinidad) */ 'en-tt': string;
  /** Estonian */ 'et': string;
  /** Faeroese */ 'fo': string;
  /** Farsi */ 'fa': string;
  /** Finnish */ 'fi': string;
  /** French (Standard) */ 'fr': string;
  /** French (Belgium) */ 'fr-be': string;
  /** French (Canada) */ 'fr-ca': string;
  /** French (Switzerland) */ 'fr-ch': string;
  /** French (Luxembourg) */ 'fr-lu': string;
  /** Gaelic (Scotland) */ 'gd': string;
  /** Gaelic (Ireland) */ 'gd-ie': string;
  /** German (Standard) */ 'de': string;
  /** German (Switzerland) */ 'de-ch': string;
  /** German (Austria) */ 'de-at': string;
  /** German (Luxembourg) */ 'de-lu': string;
  /** German (Liechtenstein) */ 'de-li': string;
  /** Greek */ 'el': string;
  /** Hebrew */ 'he': string;
  /** Hindi */ 'hi': string;
  /** Hungarian */ 'hu': string;
  /** Icelandic */ 'is': string;
  /** Indonesian */ 'id': string;
  /** Italian (Standard) */ 'it': string;
  /** Italian (Switzerland) */ 'it-ch': string;
  /** Japanese */ 'ja': string;
  /** Korean, Korean (Johab) */ 'ko': string;
  /** Latvian */ 'lv': string;
  /** Lithuanian */ 'lt': string;
  /** Macedonian */ 'mk': string;
  /** Malaysian */ 'ms': string;
  /** Maltese */ 'mt': string;
  /** Norwegian (Bokmal), Norwegian (Nynorsk) */ 'no': string;
  /** Polish */ 'pl': string;
  /** Portuguese (Brazil) */ 'pt-br': string;
  /** Portuguese (Portugal) */ 'pt': string;
  /** Romanian */ 'ro': string;
  /** Romanian (Moldavia) */ 'ro-mo': string;
  /** Russian */ 'ru': string;
  /** Russian (Moldavia) */ 'ru-mo': string;
  /** Sami (Lappish) */ 'sz': string;
  /** Serbian (Cyrillic), Serbian (Latin) */ 'sr': string;
  /** Slovak */ 'sk': string;
  /** Slovenian */ 'sl': string;
  /** Sorbian */ 'sb': string;
  /** Spanish (Argentina) */ 'es-ar': string;
  /** Spanish (Guatemala) */ 'es-gt': string;
  /** Spanish (Costa Rica) */ 'es-cr': string;
  /** Spanish (Panama) */ 'es-pa': string;
  /** Spanish (Dominican Republic) */ 'es-do': string;
  /** Spanish (Mexico) */ 'es-mx': string;
  /** Spanish (Venezuela) */ 'es-ve': string;
  /** Spanish (Colombia) */ 'es-co': string;
  /** Spanish (Peru) */ 'es-pe': string;
  /** Spanish (Ecuador) */ 'es-ec': string;
  /** Spanish (Chile) */ 'es-cl': string;
  /** Spanish (Uruguay) */ 'es-uy': string;
  /** Spanish (Paraguay) */ 'es-py': string;
  /** Spanish (Bolivia) */ 'es-bo': string;
  /** Spanish (El Salvador) */ 'es-sv': string;
  /** Spanish (Honduras) */ 'es-hn': string;
  /** Spanish (Nicaragua) */ 'es-ni': string;
  /** Spanish (Puerto Rico) */ 'es-pr': string;
  /** Sutu */ 'sx': string;
  /** Swedish */ 'sv': string;
  /** Swedish (Finland) */ 'sv-fi': string;
  /** Thai */ 'th': string;
  /** Tsonga */ 'ts': string;
  /** Tswana */ 'tn': string;
  /** Turkish */ 'tr': string;
  /** Ukrainian */ 'uk': string;
  /** Urdu */ 'ur': string;
  /** Venda */ 've': string;
  /** Vietnamese */ 'vi': string;
  /** Xhosa */ 'xh': string;
  /** Yiddish */ 'ji': string;
  /** Zulu */ 'zu': string;
}

export = langutil;
export as namespace langutil;
