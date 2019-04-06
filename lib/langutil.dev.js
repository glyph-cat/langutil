/**
 * @author chin98edwin
 * @copyright Copyright (c) 2018 - 2019, chin98edwin
 * @description Localization for JavaScript made simple.
 * @version 2.2.3
**/

var CONFIG_ISDEV = false;
try {
    CONFIG_ISDEV = (process.env.NODE_ENV === "development");
} catch (e) {/**/}
var CONFIG_LANGUAGE = "en"; // The language to be used, default is "en"
var CONFIG_DICTIONARY = {}; // Where all localizations are stored
var CONFIG_SHOWLOGS = CONFIG_ISDEV; // Decides if logs and warnings from langutil should be shown
var CONFIG_INITBYLANG = false;
var CONFIG_ISAUTO = false;

const langutil = {

    init: (ARG_dictionary, ARG_language, ARG_autoDetect) => {
        if (!inspect.dictionaryIsEmpty(CONFIG_DICTIONARY) && CONFIG_SHOWLOGS) {
            console.warn("WARNING: You are re-initializing langutil");
            console.log(CONFIG_DICTIONARY);
        }
        if (Array.isArray(ARG_dictionary)) {
            CONFIG_INITBYLANG = false;
            var VAR_formattedDictionary = {};
            for (var i = 0; i < ARG_dictionary.length; i++) {
                const currentItem = ARG_dictionary[i];
                VAR_formattedDictionary[currentItem.keyword] = currentItem.localizations;
            }
            BASE_setDictionary(VAR_formattedDictionary);
        } else {
            CONFIG_INITBYLANG = true;
            BASE_setDictionary(ARG_dictionary);
        }
        BASE_setLanguage(ARG_language, ARG_autoDetect);
    },

    setLanguage: (ARG_language, ARG_autoDetect) => { BASE_setLanguage(ARG_language, ARG_autoDetect); },

    createKey: (ARG_keyword, ARG_localizations) => ({ keyword: ARG_keyword, localizations: ARG_localizations }),

    localize: (ARG_keyword, ARG_paramArray=[]) => BASE_localize(ARG_keyword, ARG_paramArray),

    localizeWith: ({ keyword: ARG_keyword, paramArray: ARG_paramArray=[], casing: ARG_casing, transform: ARG_transform }) => {
        var localized = BASE_localize(ARG_keyword, ARG_paramArray);
        // Localized value could be anything
        if (typeof localized === "string") {
            // Apply casing transformation
            if (typeof ARG_casing === "undefined") {
                /**/
            } else if (typeof ARG_casing === "string") {
                const VAR_casingFunc = {
                    lowercase: (ARG_value) => ARG_value.toLowerCase(),
                    localeLowercase: (ARG_value) => ARG_value.toLocaleLowerCase(),
                    uppercase: (ARG_value) => ARG_value.toUpperCase(),
                    localeUppercase: (ARG_value) => ARG_value.toLocaleUpperCase(),
                    sentenceCase: (ARG_value) => BASE_capitalizeFirstLetter(ARG_value),
                    titleCase: (ARG_value) => {
                        ARG_value = ARG_value.split(/[\s]/g);
                        for (var i = 0; i < ARG_value.length; i++) {
                            ARG_value[i] = BASE_capitalizeFirstLetter(ARG_value[i]);
                        }
                        ARG_value = ARG_value.join(" ");
                        return ARG_value;
                    },
                };
                const VAR_styleFunc = VAR_casingFunc[ARG_casing];
                if (VAR_styleFunc) {
                    try {
                        localized = VAR_styleFunc(localized);
                    } catch (e) {
                        if (CONFIG_SHOWLOGS) {
                            console.error(e);
                        }
                    }
                } else if (CONFIG_SHOWLOGS) {
                    console.warn("Expected `style` to be one of \"sentenceCase\", \"lowerCase\", \"localeLowerCase\", \"upperCase\", \"localeUpperCase\", or \"titleCase\" be got " + inspect.ellipsisQuote(ARG_casing) + " instead. ");
                }
            } else if (typeof ARG_casing !== "string" && CONFIG_SHOWLOGS) {
                console.warn("Expected `style` to be one of \"normal\", \"lowerCase\", \"localeLowerCase\", \"upperCase\", \"localeUpperCase\", \"titleCase\" or \"allCaps\" be got " + (typeof ARG_casing) + " instead. ");
            }
        }

        // Apply custom transformation
        if (typeof ARG_transform === "undefined") {
            /**/
        } else if (typeof ARG_transform === "function") {
            localized = ARG_transform(localized);
            if (typeof localized === "undefined" && CONFIG_SHOWLOGS) {
                console.warn("Your `transform` function for " + inspect.ellipsisQuote(ARG_keyword) + " returns an undefined value. ");
            }
        } else if (CONFIG_SHOWLOGS) {
            console.error("Expected `transform` to be a function but got " + (typeof ARG_transform) + " instead. ");
        }
        return localized;
    },

    getLanguage: () => CONFIG_LANGUAGE,

    getDefinedLanguages: () => BASE_getAllKwordAndDefLanguages(CONFIG_DICTIONARY).allLanguages,

    isAuto: () => CONFIG_ISAUTO,

    logs: {

        hide: () => { CONFIG_SHOWLOGS = false; },

        show: () => { CONFIG_SHOWLOGS = true; },

        focus: (ARG_callback) => {
            const initialConfigState = CONFIG_SHOWLOGS;
            CONFIG_SHOWLOGS = true;
            const typeofCallback = typeof ARG_callback;
            var successful = false;
            if (typeofCallback === "function") {
                const dashes = (repeat=0) => ("-".repeat(repeat));
                const line = (text) => ["\n", dashes(10), text, dashes(10), "\n"].join(" ");
                console.log(line("LANGUTIL FOCUS START"));
                var startTime = new Date();
                try {
                    ARG_callback();
                    successful = true;
                } catch (e) {
                    console.error(e);
                }
                var endTime = new Date();
                console.log(line("LANGUTIL FOCUS END (Completed in " + (endTime - startTime) + "ms)"));
            } else {
                console.error("Expected `callback` to be a function but received \"" + typeofCallback + "\" instead. ");
            }
            CONFIG_SHOWLOGS = initialConfigState;
            return successful;
        }

    },

    /**
     * @todo Remove in June 2019
     */
    hideLogs: () => {
        if (CONFIG_SHOWLOGS) {
            console.warn("This method has been deprecated and will be completely removed in June 2019. Use langutil.logs.hide() instead. ");
        }
        CONFIG_SHOWLOGS = false;
    },

};

module.exports = langutil;

function BASE_setLanguage(ARG_language, ARG_autoDetect) {
    ARG_language = ARG_autoDetect ? BASE_getAutoLanguage(ARG_language) : ARG_language;
    CONFIG_ISAUTO = ARG_autoDetect;
    CONFIG_LANGUAGE = ARG_language;

    // Check if the dictionary contains localizations for the language
    if (CONFIG_SHOWLOGS) {
        var languageIsMissing = false;
        if (CONFIG_INITBYLANG) {
            languageIsMissing = CONFIG_DICTIONARY[ARG_language] === undefined;
        } else {
            const stringifiedDictionary = JSON.stringify(CONFIG_DICTIONARY);
            // TOFIX: What if user use single quotes?
            languageIsMissing = !stringifiedDictionary.includes("\"" + ARG_language + "\":");
        }
        if (languageIsMissing) {
            console.warn("The dictionary does not contain any localizations for \"" + ARG_language + "\". ");
        }
    }
}

function BASE_localize(ARG_keyword, ARG_paramArray=[]) {
    var localizeSuccess = false;
    var localizedValue = ARG_keyword;
    try {
        localizedValue = localizedValue.toUpperCase();
        if (CONFIG_INITBYLANG) {
            localizedValue = CONFIG_DICTIONARY[CONFIG_LANGUAGE][ARG_keyword];
        } else {
            localizedValue = CONFIG_DICTIONARY[ARG_keyword][CONFIG_LANGUAGE];
        }
        if (typeof localizedValue === "string") {
            localizedValue = BASE_stringWithParams(localizedValue, ARG_paramArray, CONFIG_SHOWLOGS);
        } else if (ARG_paramArray && CONFIG_SHOWLOGS) {
            console.warn("The localized value of " + inspect.ellipsisQuote(ARG_keyword) + " is " + (typeof localizedValue) + " but paramArray was provided, which it's values we are unable to pass into. ");
        }
        localizeSuccess = localizedValue !== undefined;
    } catch (e) {
        if (CONFIG_SHOWLOGS) {
            if (e instanceof TypeError && CONFIG_DICTIONARY.length !== 0) {
                console.warn("The localization for the keyword \"" + inspect.ellipsisQuote(ARG_keyword) + "\" has not been set for \"" + CONFIG_LANGUAGE + "\". ");
            } else {
                console.error(e);
            }
        }
    }
    return localizeSuccess ? localizedValue : ["_", ARG_keyword, "_"].join("");
}

/**
 * @description Automatically determine the language used by the client's browser.
 * @param {Boolean} ARG_fallbackLanguage The language to be used if language could not be detected.
 * @todo If unable detect browser language, attempt to detect language by time zone.
 * @todo Detection if running in RN
 * @returns {String} The detected language.
 */
function BASE_getAutoLanguage(ARG_fallbackLanguage) {
    var languageFound = false;
    var langtoReturn = ARG_fallbackLanguage;
    var environmentSupported = false;

    // Native platform
    try {
        const { Platform, NativeModules } = require("react-native");
        const getLocale = Platform.select({
            ios: () => { return NativeModules.SettingsManager.settings.AppleLocale },
            android: () => { return NativeModules.I18nManager.localeIdentifier }
        });
        langtoReturn = getLocale();
        languageFound = (typeof langtoReturn === 'string');
        environmentSupported = true;
    } catch (e) {/**/}

    // Browser (The `navigator` object will take precedence remote debugging is enabled)
    if (!languageFound) {
        try {
            var detectedLanguage = navigator.language || navigator.userLanguage;
            langtoReturn = detectedLanguage.toLowerCase();
            languageFound = (typeof langtoReturn === 'string');
            environmentSupported = true;
        } catch (e) {/**/}
    }

    if (languageFound) {
        // Check if the returned language is in dictionary
        var detectedLanguage = langtoReturn;
        try { detectedLanguage = detectedLanguage.toLowerCase(); } catch (error) {/**/}
        var allDefinedLang = BASE_getAllKwordAndDefLanguages(CONFIG_DICTIONARY).allLanguages;
        for (var i = 0; i < allDefinedLang.length; i++) {
            try { allDefinedLang[i] = allDefinedLang[i].toLowerCase(); } catch (error) {/**/}
        }
        const dictHasDetectedLang = allDefinedLang.includes(langtoReturn);
        if (!dictHasDetectedLang) {
            langtoReturn = langtoReturn.substr(0, 2);
            const dictHasFuzzyLang = allDefinedLang.includes(langtoReturn);
            if (!dictHasFuzzyLang) { langtoReturn = ARG_fallbackLanguage; }
            if (CONFIG_SHOWLOGS) {
                console.log("The dictionary does not contain localizations for the auto detected language \"" + detectedLanguage + "\". Fallback language \"" + ARG_fallbackLanguage + "\" was used instead. ");
            }
        }
    } else {
        langtoReturn = ARG_fallbackLanguage;
    }

    if (CONFIG_SHOWLOGS) {
        if (languageFound) {
            console.log("Detected language: " + langtoReturn);
        } else {
            console.warn("Failed to auto-detect language (Fallback: " + ARG_fallbackLanguage + ")");
        }
        if (!environmentSupported) {
            console.warn("Auto detection is currently supported in browsers and React Native only. If your app runs in a browser or React Native but this message appears, then please report this problem at https://github.com/chin98edwin/langutil/issues as there is likely to be a problem with langutil. ");
        }
    }
    return langtoReturn;
}

/**
 * @description Retrieves all languages and keywords that are found in the dictionary.
 * @param {*} ARG_dictionary The dictionary destructure.
 * @returns { object } An object containing all defined languages and keywords.
 */
function BASE_getAllKwordAndDefLanguages(ARG_dictionary) {
    var allLanguages = [], allKeywords = [];
    if (CONFIG_INITBYLANG) {
        allLanguages = Object.keys(ARG_dictionary);
        for (var i = 0; i < allLanguages.length; i++) {
            const languageSpecificLocalizations = ARG_dictionary[allLanguages[i]];
            allKeywords.push(...Object.keys(languageSpecificLocalizations));
        }
        allKeywords = [...new Set(allKeywords)]; // Remove duplicate keys
    } else {
        allKeywords = Object.keys(ARG_dictionary);
        for (i = 0; i < allKeywords.length; i++) {
            const keywordSpecificLangauges = ARG_dictionary[allKeywords[i]];
            allLanguages.push(...Object.keys(keywordSpecificLangauges));
        }
        allLanguages = [...new Set(allLanguages)]; // Remove duplicate keys
    }
    return { allLanguages: allLanguages, allKeywords: allKeywords };
}

/**
 * @description Capitaizes the first letter of the value passed in
 * @param {string} ARG_value
 * @return THe capitalized string
 */
function BASE_capitalizeFirstLetter(ARG_value) {
    ARG_value = ARG_value.toLowerCase();
    const currentWord = ARG_value.split("");
    const firstLetter = currentWord.shift();
    return [firstLetter.toUpperCase(), currentWord.join("")].join("");
}

/**
 * @description Generates a random strng of a fixed length.
 * @param {String} ARG_pattern The character set where random string will be generated from.
 * @param {Number} ARG_length The length of random string.
 * @returns {String} The randomized string.
 */
function BASE_getRandomString(ARG_pattern, ARG_length) {
    var newHash = "";
    do {
        var randomIndex = Math.floor(Math.random() * ARG_pattern.length);
        newHash += ARG_pattern[randomIndex];
    } while (newHash.length < ARG_length);
    return newHash;
}

/**
 * @description Replaces all occurences of %p in string with values from a set of arrays.
 * @param {String} ARG_stringWithFormat The string to be formatted.
 * @param {Array} [ARG_paramArray] An array of parameters that can be passed into the localization.
 * @param {Boolean} showLogs Controls whether logs should be shown.
 */
function BASE_stringWithParams(ARG_stringWithFormat, ARG_paramArray=[], showLogs) {
    // Escape character for %p with %%p
    // A random string that is non-existent in the current string is generated and swapped with
    var escape_p_Length = 2;
    var escape_p_swapper = "%q";
    while (ARG_stringWithFormat.includes(escape_p_swapper)) {
        try {
            escape_p_swapper = BASE_getRandomString("0123456789abcdef", escape_p_Length++);
        } catch (e) {/**/}
    }
    ARG_stringWithFormat = ARG_stringWithFormat.replace(/(%%p)/g, escape_p_swapper);

    // Detect real placeholders and substitute them with parameters
    var placeholders = ARG_stringWithFormat.match(/(%p)/g);
    placeholders = placeholders ? placeholders : [];
    var placeholderCount = Math.min((placeholders.length + 1), ARG_paramArray.length);
    for (var i = 0; i < placeholderCount; i++) {
        ARG_stringWithFormat = ARG_stringWithFormat.replace(/(%p)/, ARG_paramArray[i]);
    }

    // ParamArray checking
    if (showLogs) {
        if (ARG_paramArray.length > placeholders.length) {
            console.warn("EXTRANEOUS PARAMETERS. Expected " + placeholders.length + " but received " + ARG_paramArray.length + ". \nString: " + ARG_stringWithFormat);
        } else if (ARG_paramArray.length < placeholders.length) {
            console.error("INSUFFICIENT PARAMETERS. Expected " + placeholders.length + " but received " + ARG_paramArray.length + ". \nString: " + ARG_stringWithFormat);
        }
    }

    // Replace empty placeholders with empty string
    ARG_stringWithFormat = ARG_stringWithFormat.replace(/(%p)/g, "");

    // Restore escaped %p
    ARG_stringWithFormat = ARG_stringWithFormat.replace(new RegExp("(" + escape_p_swapper + ")", "g"), "%p");

    return ARG_stringWithFormat;
}

/**
 * @description Sets the dictionary to be used throughout the app.
 * This function should be called in the constructor() or componentWillMount() method.
 * For best practices, you should save your dictionary in a JSON file and import it into your app.
 * @param {object} ARG_dictionary The dictionary that will be used throughout the app for localization.
 */
function BASE_setDictionary(ARG_dictionary) {
    if (CONFIG_SHOWLOGS) {
        inspectDictionary(ARG_dictionary);
    }
    CONFIG_DICTIONARY = ARG_dictionary;
}

const inspect = {

    ellipsisQuote: function(value) {
        var newValue = value.substring(0, 20);
        newValue += (newValue.length < value.length) ? "..." : "";
        return "`" + newValue + "`";
    },

    dictionaryIsEmpty: function(newDictionary) {
        if (
            newDictionary === undefined ||
            newDictionary === null ||
            JSON.stringify(newDictionary) === "{}"
        ) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * @description Checks for unrecognized languages and show warning.
     * @param {Array} allLanguages The list of all languages that are mentioned in the dictionary.
     * @see http://4umi.com/web/html/languagecodes.php for list of languages.
     */
    unrecognizedLanguage: function(allLanguages) {
        var unrecognized = [];
        const langlist = ["af", "sq", "ar-sa", "ar-iq", "ar-eg", "ar-ly", "ar-dz", "ar-ma", "ar-tn", "ar-om", "ar-ye", "ar-sy", "ar-jo", "ar-lb", "ar-kw", "ar-ae", "ar-bh", "ar-qa", "eu", "bg", "be", "ca", "zh-tw", "zh-cn", "zh-hk", "zh-sg", "hr", "cs", "da", "nl", "nl-be", "en", "en-us", "en-gb", "en-au", "en-ca", "en-nz", "en-ie", "en-za", "en-jm", "en", "en-bz", "en-tt", "et", "fo", "fa", "fi", "fr", "fr-be", "fr-ca", "fr-ch", "fr-lu", "gd", "gd-ie", "de", "de-ch", "de-at", "de-lu", "de-li", "el", "he", "hi", "hu", "is", "id", "it", "it-ch", "ja", "ko", "ko", "lv", "lt", "mk", "ms", "mt", "no", "no", "pl", "pt-br", "pt", "rm", "ro", "ro-mo", "ru", "ru-mo", "sz", "sr", "sr", "sk", "sl", "sb", "es", "es", "es-ar", "es-gt", "es-cr", "es-pa", "es-do", "es-mx", "es-ve", "es-co", "es-pe", "es-ec", "es-cl", "es-uy", "es-py", "es-bo", "es-sv", "es-hn", "es-ni", "es-pr", "sx", "sv", "sv-fi", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh", "ji", "zu"];
        for (var i = 0; i < allLanguages.length; i++) {
            if (!langlist.includes(allLanguages[i])) {
                unrecognized.push(allLanguages[i]);
            }
        }
        if (unrecognized.length > 0) {
            console.warn("Unrecognized language codes found: '" + unrecognized.join("', '") + "'. \n" +
            "This is a no-op, but auto detection won't be able to make use of the localizations with the above mentioned codes. \n\nFor a list of recognized language codes, see https://github.com/chin98edwin/langutil#language-list. ");
        }
    },

    warnInvalidKeywords: function(invalidKeywords) {
        var plural_keyword = invalidKeywords.length > 1 ? "keywords" : "keyword";
        console.error("Invalid " + plural_keyword + " found in dictionary: \"" +
        invalidKeywords.join("\", \"") + "\"\nKeywords should only contain uppercase letters to prevent ambiguation. Underscores and numbers are allowed but not as the first character of the keyword. ");
    },

    /**
     * @description Checks if a keyword in the dictionary is valid.
     * @param {String} keywordToCheck The keyword of the dictionary
     * @returns {Boolean} true or false.
     */
    keywordIsValid: function(keywordToCheck) {
        var keywordFormat = /([A-Z]?[A-Z|_|0-9]?[A-Z|0-9])/g;
        var match = keywordToCheck.match(keywordFormat);
        if (match) {
            return keywordToCheck === match.join("");
        }
        return false;
    },

};

/**
 * @description Inspects the dictionary for errors.
 * @param {Object} newDictionary The dictionary that will be used throughout the app for localization.
 */
function inspectDictionary(newDictionary) {
    var i, j;

    // (1A) Check if dictionary is empty
    if (inspect.dictionaryIsEmpty(newDictionary)) {
        console.error("Dictionary is empty");
    }

    // (2) Extract all languages and keywords from dictionary
    var { allLanguages, allKeywords } = BASE_getAllKwordAndDefLanguages(newDictionary);

    // (3) Check dictionary for unrecognized language codes and show warning
    inspect.unrecognizedLanguage(allLanguages);

    // (4) Check for invalid keys
    var invalidKeywords = [];
    for (i = 0; i < allKeywords.length; i++) {
        if (!inspect.keywordIsValid(allKeywords[i])) {
            invalidKeywords.push(allKeywords[i]);
        }
    }
    if (invalidKeywords.length > 0) {
        inspect.warnInvalidKeywords(invalidKeywords);
    }

    // (5) Check for missing localizations
    var unlocalizedKeywords = {};
    for (i = 0; i < allKeywords.length; i++) {
        var unlocalizedLanguages = [];
        const currentKeyword = allKeywords[i];

        for (j = 0; j < allLanguages.length; j++) {
            const currentLanguage = allLanguages[j];

            // Get localization
            var currentLocalization = null;
            try {
                if (CONFIG_INITBYLANG) {
                    currentLocalization = newDictionary[currentLanguage][currentKeyword];
                } else {
                    currentLocalization = newDictionary[currentKeyword][currentLanguage];
                }
            } catch (e) {/**/}

            // Add language to unlocalized list
            if (currentLocalization === null || currentLocalization === undefined) {
                unlocalizedLanguages.push(currentLanguage);
            }
        }
        // Add keywords to unlocalized list
        if (unlocalizedLanguages.length > 0) {
            unlocalizedKeywords[currentKeyword] = unlocalizedLanguages;
            unlocalizedLanguages = []; // Reset unlocalized languages
        }
    }

    // (6) Show warnings
    const unlocalizedKeywordsIndex = Object.keys(unlocalizedKeywords);
    if (unlocalizedKeywordsIndex.length > 0) {
        var warning = "";
        for (i = 0; i < unlocalizedKeywordsIndex.length; i++) {
            warning += "\n • " + unlocalizedKeywordsIndex[i] + ": " + unlocalizedKeywords[unlocalizedKeywordsIndex[i]].join(", ");
        }
        console.warn("Found localizations with missing keywords: " + warning);
    }

}