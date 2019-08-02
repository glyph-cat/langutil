/**
 * @author chin98edwin
 * @copyright Copyright (c) 2018 - 2019, chin98edwin
 * @description Localization for JavaScript made simple.
 * @version 2.4.0
**/

let CONFIG_ISDEV = false;
try { CONFIG_ISDEV = (process.env.NODE_ENV === "development"); } catch (e) {/**/}
let CONFIG_LANGUAGE = "en"; // The language to be used, default is "en"
let CONFIG_DICTIONARY = {}; // Where all localizations are stored
let CONFIG_SHOWLOGS = CONFIG_ISDEV; // Decides if logs and warnings from langutil should be shown
let CONFIG_INITBYLANG = false; // The method the dictionary is defined
let CONFIG_ISAUTO = false; // Is auto language detection allowed
let CONFIG_GROUPED_WARNINGS = []; // Store warnings about missing localizations (reset after logged)
let CONFIG_GROUPED_WARNINGS_MEMORIZED = []; // Store warnings about missing localizations
let CONFIG_TIMER; // The timer function for debouncing grouped warnings
let CONFIG_SNOOZE_INSPECT_DUE = null; // Due date until dictionary inspection ends it snooze
let CONFIG_HOOK = {
    onLangChangeSubscribers: {}
}; // Internally used by langutil to communicate between modules
let CONFIG_ID_COUNTER = 0;

module.exports = {
    init, setLanguage, localize, localizeWith,
    createKey: (keyword, localizations) => ({ keyword: keyword, localizations: localizations }),
    getLanguage: () => CONFIG_LANGUAGE,
    getDefinedLanguages: () => getAllKwordAndDefLanguages(CONFIG_DICTIONARY).allLanguages,
    isAuto: () => CONFIG_ISAUTO,
    logs: { focus,
        snoozeInspectionUntil: (due) => { CONFIG_SNOOZE_INSPECT_DUE = new Date(due); },
        hide: () => { CONFIG_SHOWLOGS = false; },
        show: () => { CONFIG_SHOWLOGS = true; }
    },
    internalHook: {
        subscribeToOnLangChange: (callback) => {
            const newlangutilId = `component${CONFIG_ID_COUNTER++}`;
            function hook(hookedCallback) {
                CONFIG_HOOK["onLangChangeSubscribers"][newlangutilId] = hookedCallback;
            }
            callback(newlangutilId, hook);
        },
        unsubscribeToOnLangChange: (existingLangutilId) => {
            delete CONFIG_HOOK["onLangChangeSubscribers"][existingLangutilId];
        }
    }
};

function init(dictionary, language, auto) {
    if (!inspect.dictionaryIsEmpty(CONFIG_DICTIONARY) && CONFIG_SHOWLOGS) {
        console.warn("WARNING: You are re-initializing langutil");
    }
    if (Array.isArray(dictionary)) {
        CONFIG_INITBYLANG = false;
        let formattedDictionary = {};
        for (let i = 0; i < dictionary.length; i++) {
            const currentItem = dictionary[i];
            formattedDictionary[currentItem.keyword] = currentItem.localizations;
        }
        setDictionary(formattedDictionary);
    } else {
        CONFIG_INITBYLANG = true;
        setDictionary(dictionary);
    }
    setLanguage(language, auto);
}

function setLanguage(language, auto) {
    const oldLanguage = CONFIG_LANGUAGE;
    if (auto) {
        let langtoUse = language;
        CONFIG_ISAUTO = true;
        if (auto === true) {
            try {
                const navigatorLanguage = navigator.language || navigator.userLanguage;
                langtoUse = navigatorLanguage.toLowerCase();
            } catch (e) {/**/}
        } else if (typeof auto === "function") {
            try { langtoUse = auto(); } catch (e) {/**/}
        }
        const langIsFound = typeof langtoUse === "string";
        if (langIsFound) {
            let detectedLanguage = langtoUse;
            try { detectedLanguage = detectedLanguage.toLowerCase(); } catch (e) {/**/}
            let allDefinedLang = getAllKwordAndDefLanguages(CONFIG_DICTIONARY).allLanguages;
            for (let i = 0; i < allDefinedLang.length; i++) {
                try { allDefinedLang[i] = allDefinedLang[i].toLowerCase(); } catch (e) {/**/}
            }
            // Check if dictionary has language code MATCHING WITH the detected one
            if (!allDefinedLang.includes(langtoUse)) {
                // Language code is trimmed here and recompared below
                langtoUse = langtoUse.substr(0, 2);
                // Check if dictionary has language codes SIMILAR TO detected one
                if (allDefinedLang.includes(langtoUse)) {
                    langtoUse = language;
                }
                if (CONFIG_SHOWLOGS) {
                    console.log(`The dictionary does not contain localizations for the auto detected language "${detectedLanguage}". Fallback language "${langtoUse}" was used instead.`);
                }
            }
        } else {
            langtoUse = language;
        }

        if (CONFIG_SHOWLOGS) {
            if (langIsFound) {
                console.log(`Detected language: ${langtoUse}`);
            } else {
                console.warn(`Failed to auto-detect language (Fallback: ${language})`);
            }
        }
        CONFIG_LANGUAGE = langtoUse;
    } else {
        CONFIG_LANGUAGE = language;
    }

    // Trigger component refresh after language has been changed
    if (CONFIG_LANGUAGE !== oldLanguage) {
        const subscriberIndex = Object.keys(CONFIG_HOOK["onLangChangeSubscribers"]);
        for (let i = 0; i < subscriberIndex.length; i++) {
            const currentSubscriber = CONFIG_HOOK["onLangChangeSubscribers"][subscriberIndex[i]];
            currentSubscriber();
        }
    }

    // Check if the dictionary contains localizations for the language
    if (CONFIG_SHOWLOGS) {
        let languageIsMissing = false;
        if (CONFIG_INITBYLANG) {
            languageIsMissing = CONFIG_DICTIONARY[language] === undefined;
        } else {
            const stringifiedDictionary = JSON.stringify(CONFIG_DICTIONARY);
            languageIsMissing = !stringifiedDictionary.includes("\"" + language + "\":");
        }
        if (languageIsMissing) {
            console.warn(`The dictionary does not contain any localizations for "${language}".`);
        }
    }
}

function localize(keyword, paramArray = [], allowEmpty) {
    let localizeSuccess = false, localizedValue = keyword;
    if (keyword) {
        if (typeof keyword !== "string") {
            if (CONFIG_SHOWLOGS) {
                console.warn(`Expected \`keyword\` to be a string but got \`${typeof keyword}\`.`);
            }
            return `_${keyword}_`;
        }
    } else {
        if (allowEmpty) {
            return "";
        } else {
            if (CONFIG_SHOWLOGS) { console.warn("Keyword should not be empty. Set `allowEmpty` to true to suppress this message."); }
            return `_${keyword}_`;
        }
    }
    try {
        localizedValue = localizedValue.toUpperCase();
        if (CONFIG_INITBYLANG) {
            localizedValue = CONFIG_DICTIONARY[CONFIG_LANGUAGE][keyword];
        } else {
            localizedValue = CONFIG_DICTIONARY[keyword][CONFIG_LANGUAGE];
        }
        if (typeof localizedValue === "string") {
            localizedValue = stringWithParams(localizedValue, paramArray, CONFIG_SHOWLOGS);
        } else if (paramArray.length > 0 && CONFIG_SHOWLOGS) {
            console.warn(`The localized value of "${inspect.ellipsisQuote(keyword)}" is ${typeof localizedValue} but paramArray was provided, which it's values we are unable to pass into.`);
        }
        localizeSuccess = localizedValue !== undefined;
        if (!localizeSuccess && CONFIG_SHOWLOGS) { inspect.groupWarning(inspect.ellipsisQuote(keyword)); }
    } catch (e) {
        if (CONFIG_SHOWLOGS) {
            if (e instanceof TypeError && CONFIG_DICTIONARY.length !== 0) {
                inspect.groupWarning(inspect.ellipsisQuote(keyword));
            } else {
                console.error(e);
            }
        }
    }
    return localizeSuccess ? localizedValue : `_${keyword}_`;
}

function localizeWith({ keyword, paramArray = [], casing, transform, allowEmpty }) {
    let localized = localize(keyword, paramArray, allowEmpty);
    // Localized value could be anything
    if (typeof localized === "string") {
        // Apply casing transformation
        if (typeof casing === "string") {
            const casingFunc = {
                lowercase: (value) => value.toLowerCase(),
                localeLowercase: (value) => value.toLocaleLowerCase(),
                uppercase: (value) => value.toUpperCase(),
                localeUppercase: (value) => value.toLocaleUpperCase(),
                sentenceCase: (value) => capitalizeFirstLetter(value),
                titleCase: (value) => {
                    value = value.split(/[\s]/g);
                    for (let i = 0; i < value.length; i++) {
                        value[i] = capitalizeFirstLetter(value[i]);
                    }
                    value = value.join(" ");
                    return value;
                },
            };
            const styleFunc = casingFunc[casing];
            if (styleFunc) {
                try {
                    localized = styleFunc(localized);
                } catch (e) {
                    if (CONFIG_SHOWLOGS) {
                        console.error(e);
                    }
                }
            } else if (CONFIG_SHOWLOGS) {
                console.warn(`Expected \`style\` to be one of "sentenceCase", "lowerCase", "localeLowerCase", "upperCase", "localeUpperCase", or "titleCase" but got ${inspect.ellipsisQuote(casing)}.`);
            }
        } else if (typeof casing !== "undefined" && CONFIG_SHOWLOGS) {
            console.warn(`Expected \`style\` to be one of "sentenceCase", "lowerCase", "localeLowerCase", "upperCase", "localeUpperCase", or "titleCase" but got ${typeof casing}.`);
        }
    }

    // Apply custom transformation
    if (typeof transform === "function") {
        localized = transform(localized);
        if (typeof localized === "undefined" && CONFIG_SHOWLOGS) {
            console.warn(`In ${inspect.ellipsisQuote(keyword)}, \`transform\` returns an undefined value.`);
        }
    } else if (typeof transform !== "undefined" && CONFIG_SHOWLOGS) {
        console.error(`Expected \`transform\` to be a function but got ${typeof transform}.`);
    }
    return localized;
}

function focus(callback) {
    const initialConfigState = CONFIG_SHOWLOGS;
    CONFIG_SHOWLOGS = true;
    const typeofCallback = typeof callback;
    let successful = false;
    if (typeofCallback === "function") {
        const line = (text) => `\n=== ${text} ===\n`;
        console.log(line("LANGUTIL FOCUS START"));
        console.time("Duration");
        try {
            callback();
            successful = true;
        } catch (e) {
            console.error(e);
        }
        console.log(line("LANGUTIL FOCUS END"));
        console.timeEnd("Duration");
    } else {
        console.error(`Expected \`callback\` to be a function but got "${typeofCallback}".`);
    }
    CONFIG_SHOWLOGS = initialConfigState;
    return successful;
}

/**
 * @description Retrieves all languages and keywords that are found in the dictionary.
 * @param {*} dictionary The dictionary destructure.
 * @returns { object } An object containing all defined languages and keywords.
 */
function getAllKwordAndDefLanguages(dictionary) {
    let allLanguages = [], allKeywords = [];
    if (CONFIG_INITBYLANG) {
        allLanguages = Object.keys(dictionary);
        for (let i = 0; i < allLanguages.length; i++) {
            const languageSpecificLocalizations = dictionary[allLanguages[i]];
            allKeywords.push(...Object.keys(languageSpecificLocalizations));
        }
        allKeywords = [...new Set(allKeywords)]; // Remove duplicate keys
    } else {
        allKeywords = Object.keys(dictionary);
        for (i = 0; i < allKeywords.length; i++) {
            const keywordSpecificLangauges = dictionary[allKeywords[i]];
            allLanguages.push(...Object.keys(keywordSpecificLangauges));
        }
        allLanguages = [...new Set(allLanguages)]; // Remove duplicate keys
    }
    return { allLanguages: allLanguages, allKeywords: allKeywords };
}

/**
 * @description Capitaizes the first letter of the value passed in
 * @param {string} value
 * @return THe capitalized string
 */
function capitalizeFirstLetter(value) {
    value = value.toLowerCase();
    const currentWord = value.split("");
    const firstLetter = currentWord.shift();
    return `${firstLetter.toUpperCase()}${currentWord.join("")}`;
}

/**
 * @description Generates a random strng of a fixed length.
 * @param {string} pattern The character set where random string will be generated from.
 * @param {number} length The length of random string.
 * @returns {string} The randomized string.
 */
function getRandHash(pattern, length) {
    let newHash = "";
    do {
        let randomIndex = Math.floor(Math.random() * pattern.length);
        newHash += pattern[randomIndex];
    } while (newHash.length < length);
    return newHash;
}

/**
 * @description Replaces all occurences of %p in string with values from a set of arrays.
 * @param {string} stringWithFormat The string to be formatted.
 * @param {Array} [paramArray] An array of parameters that can be passed into the localization.
 * @param {boolean} showLogs Controls whether logs should be shown.
 */
function stringWithParams(stringWithFormat, paramArray = [], showLogs) {
    // Escape character for %p with %%p
    // A random string that is non-existent in the current string is generated and swapped with
    let escape_p_Length = 2, escape_p_swapper = "%q";
    while (stringWithFormat.includes(escape_p_swapper)) {
        try {
            escape_p_swapper = getRandHash("0123456789abcdef", escape_p_Length++);
        } catch (e) {/**/}
    }
    stringWithFormat = stringWithFormat.replace(/(%%p)/g, escape_p_swapper);

    // Detect real placeholders and substitute them with parameters
    let placeholders = stringWithFormat.match(/(%p)/g);
    placeholders = placeholders ? placeholders : [];
    let placeholderCount = Math.min((placeholders.length + 1), paramArray.length);
    for (let i = 0; i < placeholderCount; i++) {
        stringWithFormat = stringWithFormat.replace(/(%p)/, paramArray[i]);
    }

    // ParamArray checking
    if (showLogs) {
        if (paramArray.length > placeholders.length) {
            console.warn(`Extraneous parameters. Expected ${placeholders.length} but received ${paramArray.length}.\nString: ${stringWithFormat}`);
        } else if (paramArray.length < placeholders.length) {
            console.error(`Insufficient parameters. Expected ${placeholders.length} but received ${paramArray.length}.\nString: ${stringWithFormat}`);
        }
    }

    // Replace empty placeholders with empty string
    stringWithFormat = stringWithFormat.replace(/(%p)/g, "");

    // Restore escaped %p
    stringWithFormat = stringWithFormat.replace(new RegExp("(" + escape_p_swapper + ")", "g"), "%p");

    return stringWithFormat;
}

/**
 * @description Sets the dictionary to be used throughout the app.
 * This function should be called in the constructor() or componentWillMount() method.
 * For best practices, you should save your dictionary in a JSON file and import it into your app.
 * @param {object} dictionary The dictionary that will be used throughout the app for localization.
 */
function setDictionary(dictionary) {
    if (CONFIG_SHOWLOGS) {
        inspectDictionary(dictionary);
    }
    CONFIG_DICTIONARY = dictionary;
}

function debounce(callback) {
    return function() {
        if (CONFIG_TIMER) { clearTimeout(CONFIG_TIMER); }
        CONFIG_TIMER = setTimeout(callback);
    };
}

const inspect = {

    groupWarning: function(missingKeyword) {
        if (!CONFIG_GROUPED_WARNINGS_MEMORIZED.includes(missingKeyword)) {
            CONFIG_GROUPED_WARNINGS_MEMORIZED.push(missingKeyword);
            CONFIG_GROUPED_WARNINGS.push(missingKeyword);
            const warningExecutor = debounce(() => {
                console.warn(`The localization for the following keywords in "${CONFIG_LANGUAGE}" have not yet been set: ${CONFIG_GROUPED_WARNINGS.join(", ")}.`);
                CONFIG_GROUPED_WARNINGS = [];
            }); warningExecutor();
        }
    },

    ellipsisQuote: function(value) {
        let newValue = value.substring(0, 20);
        newValue += (newValue.length < value.length) ? "..." : "";
        return `\`${newValue}\``;
    },

    dictionaryIsEmpty: function (newDictionary) {
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
    unrecognizedLanguage: function (allLanguages) {
        let unrecognized = [];
        const langlist = ["af", "sq", "ar-sa", "ar-iq", "ar-eg", "ar-ly", "ar-dz", "ar-ma", "ar-tn", "ar-om", "ar-ye", "ar-sy", "ar-jo", "ar-lb", "ar-kw", "ar-ae", "ar-bh", "ar-qa", "eu", "bg", "be", "ca", "zh-tw", "zh-cn", "zh-hk", "zh-sg", "hr", "cs", "da", "nl", "nl-be", "en", "en-us", "en-gb", "en-au", "en-ca", "en-nz", "en-ie", "en-za", "en-jm", "en", "en-bz", "en-tt", "et", "fo", "fa", "fi", "fr", "fr-be", "fr-ca", "fr-ch", "fr-lu", "gd", "gd-ie", "de", "de-ch", "de-at", "de-lu", "de-li", "el", "he", "hi", "hu", "is", "id", "it", "it-ch", "ja", "ko", "ko", "lv", "lt", "mk", "ms", "mt", "no", "no", "pl", "pt-br", "pt", "rm", "ro", "ro-mo", "ru", "ru-mo", "sz", "sr", "sr", "sk", "sl", "sb", "es", "es", "es-ar", "es-gt", "es-cr", "es-pa", "es-do", "es-mx", "es-ve", "es-co", "es-pe", "es-ec", "es-cl", "es-uy", "es-py", "es-bo", "es-sv", "es-hn", "es-ni", "es-pr", "sx", "sv", "sv-fi", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh", "ji", "zu"];
        for (let i = 0; i < allLanguages.length; i++) {
            if (!langlist.includes(allLanguages[i])) {
                unrecognized.push(allLanguages[i]);
            }
        }
        if (unrecognized.length > 0) {
            console.warn(`Unrecognized language codes found: "${unrecognized.join("\", \"")}".\nThis is a no-op, but auto detection won't be able to make full use of the localizations with the above mentioned codes.`);
        }
    },

    warnInvalidKeywords: function (invalidKeywords) {
        const plural_keyword = invalidKeywords.length > 1 ? "keywords" : "keyword";
        console.error(`Invalid ${plural_keyword} found in dictionary: ${invalidKeywords.join("\", \"")}"\nKeywords should only contain uppercase letters to prevent ambiguation. Underscores and numbers are allowed but not as the first character of the keyword."`);
    },

    /**
     * @description Checks if a keyword in the dictionary is valid.
     * @param {string} keywordToCheck The keyword of the dictionary
     * @returns {boolean} true or false.
     */
    keywordIsValid: function (keywordToCheck) {
        const keywordFormat = /([A-Z]?[A-Z|_|0-9]?[A-Z|0-9])/g;
        const match = keywordToCheck.match(keywordFormat);
        if (match) {
            return keywordToCheck === match.join("");
        }
        return false;
    },

};

/**
 * @description Inspects the dictionary for errors.
 * @param {object} newDictionary The dictionary that will be used throughout the app for localization.
 */
function inspectDictionary(newDictionary) {

    // If due date is given by developer, skip inspection until then
    if (new Date() - CONFIG_SNOOZE_INSPECT_DUE < 0) { return false; }

    // (1A) Check if dictionary is empty
    if (inspect.dictionaryIsEmpty(newDictionary)) {
        console.error("Dictionary is empty");
    }

    // (2) Extract all languages and keywords from dictionary
    let { allLanguages, allKeywords } = getAllKwordAndDefLanguages(newDictionary);

    // (3) Check dictionary for unrecognized language codes and show warning
    inspect.unrecognizedLanguage(allLanguages);

    // (4) Check for invalid keys
    let invalidKeywords = [];
    for (let i = 0; i < allKeywords.length; i++) {
        if (!inspect.keywordIsValid(allKeywords[i])) {
            invalidKeywords.push(allKeywords[i]);
        }
    }
    if (invalidKeywords.length > 0) {
        inspect.warnInvalidKeywords(invalidKeywords);
    }

    // (5) Check for missing localizations
    let unlocalizedKeywords = {};
    for (let i = 0; i < allKeywords.length; i++) {
        let unlocalizedLanguages = [];
        const currentKeyword = allKeywords[i];

        for (let j = 0; j < allLanguages.length; j++) {
            const currentLanguage = allLanguages[j];

            // Get localization
            let currentLocalization = null;
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
        let warning = "";
        for (let i = 0; i < unlocalizedKeywordsIndex.length; i++) {
            warning += `\n • ${unlocalizedKeywordsIndex[i]}: ${unlocalizedKeywords[unlocalizedKeywordsIndex[i]].join(", ")}`;
        }
        console.warn(`Found localizations with missing keywords: ${warning}`);
    }

}