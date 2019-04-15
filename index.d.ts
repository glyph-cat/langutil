/**
 * @author chin98edwin
 * @copyright Copyright (c) 2018 - 2019, chin98edwin
 * @description Localization for JavaScript made simple.
 * @version 2.2.4
**/

declare namespace langutil {

    /**
     * @description Initialize langutil with a dictionary and language.
     * @param dictionary The object storing all your localizations.
     * @param language The display language.
     * @param autoDetect Should the computer figure out the client's browser language?
     */
    function init(
        dictionary: object | Array<Keyword>,
        language: LanguageCodes,
        autoDetect?: boolean
    ): void;

    /**
     * @description Sets the display language.
     * @param language The display language.
     * @param autoDetect Should the computer figure out the client's browser language?
     */
    function setLanguage(
        language: LanguageCodes,
        autoDetect?: boolean
    ): void;

    /**
     * @description Creates a key for your dictionary.
     * @param keyword A short string representing the localized value.
     * @param localizations The translation.
     * @returns A Keyword object.
     */
    function createKey(
        keyword: string,
        localizations: LocalizableLanguages,
    ): Keyword;

    /**
     * @description Maps a keyword to its localized value.
     * @param keyword A short string representing the localized value.
     * @param paramArray An array of parameters that can be passed into the localization.
     * @returns The localized value.
     */
    function localize(
        keyword: string,
        paramArray?: Array<unknown>
    ): unknown;

    /**
     * @description Maps a keyword to its localized value with additional options.
     * @param arguments The `keyword`, `paramArray`, `casing`, `transform` function.
     * @returns The localized value.
     */
    function localizeWith(
        arguments: {
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
        }
    ): unknown;

    /**
     * @description Get the currently set language.
     * @returns The language code.
     */
    function getLanguage(): LanguageCodes;

    /**
     * @description Get the list of language that have been defined in the dictionary.
     * @returns An array of languages codes.
     */
    function getDefinedLanguages(): Array<LanguageCodes>;

    /**
     * @description Checks if autoDetect is turned on.
     * @returns The auto detect status.
     */
    function isAuto(): boolean;

    /**
     * @description Controls the visibility of logs from langutil.
     */
    namespace logs {
        /**
         * @description Hides logs from langutil.
         */
        function hide(): void
        /**
         * @description Shows logs from langutil. Logs are shown in development mode by default.
         */
        function show(): void
        /**
         * @description If you have hidden away langutil logs at the beginning of your code and only want to log a portion of it, place your code inside a callback in this function.
         * @param callback The callback which you want langutil to focus its logs on.
         * @returns Whether the callback was sucessful or not.
         */
        function focus(
            callback: Function
        ): boolean
    }

    /**
     * @description Hides all logs and warnings from langutil functions after the line this functions is called.
     * @deprecated Will be completely removed by June 2019. Use `langutil.logs.hide()` or `langutil.logs.show()` instead.
     * @todo Remove in June 2019.
     */
    function hideLogs(): void;

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

type localizableCasings =
| "lowercase"
| "localeLowercase"
| "uppercase"
| "localeUppercase"
| "titleCase"
| "sentenceCase"

interface LocalizableLanguages {
    /** Afrikaans */ "af": string;
    /** Albanian */ "sq": string;
    /** Arabic (Saudi Arabia) */ "ar-sa": string;
    /** Arabic (Iraq) */ "ar-iq": string;
    /** Arabic (Egypt) */ "ar-eg": string;
    /** Arabic (Libya) */ "ar-ly": string;
    /** Arabic (Algeria) */ "ar-dz": string;
    /** Arabic (Morocco) */ "ar-ma": string;
    /** Arabic (Tunisia) */ "ar-tn": string;
    /** Arabic (Oman) */ "ar-om": string;
    /** Arabic (Yemen) */ "ar-ye": string;
    /** Arabic (Syria) */ "ar-sy": string;
    /** Arabic (Jordan) */ "ar-jo": string;
    /** Arabic (Lebanon) */ "ar-lb": string;
    /** Arabic (Kuwait) */ "ar-kw": string;
    /** Arabic (Bahrain) */ "ar-bh": string;
    /** Arabic (Qatar) */ "ar-qa": string;
    /** Basque */ "eu": string;
    /** Bulgarian */ "bg": string;
    /** Belarusian */ "be": string;
    /** Catalan */ "ca": string;
    /** Chinese (Taiwan) */ "zh-tw": string;
    /** Chinese (PRC) */ "zh-cn": string;
    /** Chinese (Hong Kong SAR) */ "zh-hk": string;
    /** Chinese (Singapore) */ "zh-sg": string;
    /** Croatian */ "hr": string;
    /** Czech */ "cs": string;
    /** Danish */ "da": string;
    /** Dutch (Standard) */ "nl": string;
    /** Dutch (Belgium) */ "nl-be": string;
    /** English, English (Caribbean) */ "en": string;
    /** English (United States) */ "en-us": string;
    /** English (United Kingdom) */ "en-gb": string;
    /** English (Australia) */ "en-au": string;
    /** English (Canada) */ "en-ca": string;
    /** English (New Zealand) */ "en-nz": string;
    /** English (Ireland) */ "en-ie": string;
    /** English (South Africa) */ "en-za": string;
    /** English (Jamaica) */ "en-jm": string;
    /** English (Belize) */ "en-bz": string;
    /** English (Trinidad) */ "en-tt": string;
    /** Estonian */ "et": string;
    /** Faeroese */ "fo": string;
    /** Farsi */ "fa": string;
    /** Finnish */ "fi": string;
    /** French (Standard) */ "fr": string;
    /** French (Belgium) */ "fr-be": string;
    /** French (Canada) */ "fr-ca": string;
    /** French (Switzerland) */ "fr-ch": string;
    /** French (Luxembourg) */ "fr-lu": string;
    /** Gaelic (Scotland) */ "gd": string;
    /** Gaelic (Ireland) */ "gd-ie": string;
    /** German (Standard) */ "de": string;
    /** German (Switzerland) */ "de-ch": string;
    /** German (Austria) */ "de-at": string;
    /** German (Luxembourg) */ "de-lu": string;
    /** German (Liechtenstein) */ "de-li": string;
    /** Greek */ "el": string;
    /** Hebrew */ "he": string;
    /** Hindi */ "hi": string;
    /** Hungarian */ "hu": string;
    /** Icelandic */ "is": string;
    /** Indonesian */ "id": string;
    /** Italian (Standard) */ "it": string;
    /** Italian (Switzerland) */ "it-ch": string;
    /** Japanese */ "ja": string;
    /** Korean, Korean (Johab) */ "ko": string;
    /** Latvian */ "lv": string;
    /** Lithuanian */ "lt": string;
    /** Macedonian */ "mk": string;
    /** Malaysian */ "ms": string;
    /** Maltese */ "mt": string;
    /** Norwegian (Bokmal), Norwegian (Nynorsk) */ "no": string;
    /** Polish */ "pl": string;
    /** Portuguese (Brazil) */ "pt-br": string;
    /** Portuguese (Portugal) */ "pt": string;
    /** Romanian */ "ro": string;
    /** Romanian (Moldavia) */ "ro-mo": string;
    /** Russian */ "ru": string;
    /** Russian (Moldavia) */ "ru-mo": string;
    /** Sami (Lappish) */ "sz": string;
    /** Serbian (Cyrillic), Serbian (Latin) */ "sr": string;
    /** Slovak */ "sk": string;
    /** Slovenian */ "sl": string;
    /** Sorbian */ "sb": string;
    /** Spanish (Argentina) */ "es-ar": string;
    /** Spanish (Guatemala) */ "es-gt": string;
    /** Spanish (Costa Rica) */ "es-cr": string;
    /** Spanish (Panama) */ "es-pa": string;
    /** Spanish (Dominican Republic) */ "es-do": string;
    /** Spanish (Mexico) */ "es-mx": string;
    /** Spanish (Venezuela) */ "es-ve": string;
    /** Spanish (Colombia) */ "es-co": string;
    /** Spanish (Peru) */ "es-pe": string;
    /** Spanish (Ecuador) */ "es-ec": string;
    /** Spanish (Chile) */ "es-cl": string;
    /** Spanish (Uruguay) */ "es-uy": string;
    /** Spanish (Paraguay) */ "es-py": string;
    /** Spanish (Bolivia) */ "es-bo": string;
    /** Spanish (El Salvador) */ "es-sv": string;
    /** Spanish (Honduras) */ "es-hn": string;
    /** Spanish (Nicaragua) */ "es-ni": string;
    /** Spanish (Puerto Rico) */ "es-pr": string;
    /** Sutu */ "sx": string;
    /** Swedish */ "sv": string;
    /** Swedish (Finland) */ "sv-fi": string;
    /** Thai */ "th": string;
    /** Tsonga */ "ts": string;
    /** Tswana */ "tn": string;
    /** Turkish */ "tr": string;
    /** Ukrainian */ "uk": string;
    /** Urdu */ "ur": string;
    /** Venda */ "ve": string;
    /** Vietnamese */ "vi": string;
    /** Xhosa */ "xh": string;
    /** Yiddish */ "ji": string;
    /** Zulu */ "zu": string;
}

type LanguageCodes = "af" | "sq" | "ar-sa" | "ar-iq" | "ar-eg" | "ar-ly" | "ar-dz" | "ar-ma" | "ar-tn" | "ar-om" | "ar-ye" | "ar-sy" | "ar-jo" | "ar-lb" | "ar-kw" | "ar-ae" | "ar-bh" | "ar-qa" | "eu" | "bg" | "be" | "ca" | "zh-tw" | "zh-cn" | "zh-hk" | "zh-sg" | "hr" | "cs" | "da" | "nl" | "nl-be" | "en" | "en-us" | "en-gb" | "en-au" | "en-ca" | "en-nz" | "en-ie" | "en-za" | "en-jm" | "en" | "en-bz" | "en-tt" | "et" | "fo" | "fa" | "fi" | "fr" | "fr-be" | "fr-ca" | "fr-ch" | "fr-lu" | "gd" | "gd-ie" | "de" | "de-ch" | "de-at" | "de-lu" | "de-li" | "el" | "he" | "hi" | "hu" | "is" | "id" | "it" | "it-ch" | "ja" | "ko" | "ko" | "lv" | "lt" | "mk" | "mt" | "no" | "no" | "pl" | "pt-br" | "pt" | "rm" | "ro" | "ro-mo" | "ru" | "ru-mo" | "sz" | "sr" | "sr" | "sk" | "sl" | "sb" | "es" | "es" | "es-ar" | "es-gt" | "es-cr" | "es-pa" | "es-do" | "es-mx" | "es-ve" | "es-co" | "es-pe" | "es-ec" | "es-cl" | "es-uy" | "es-py" | "es-bo" | "es-sv" | "es-hn" | "es-ni" | "es-pr" | "sx" | "sv" | "sv-fi" | "th" | "ts" | "tn" | "tr" | "uk" | "ur" | "ve" | "vi" | "xh" | "ji" | "zu"

export = langutil;
export as namespace langutil;