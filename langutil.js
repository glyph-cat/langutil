/**
 * @author chin98edwin
 * @version 1.0.1
 * @copyright Copyright (c) 2018, chin98edwin
 * @description Langutil is a tool created to make localizing for JavaScript an simple task.
 */

const DEFAULT_LANGUAGE = 'english';
var config = {
    language: DEFAULT_LANGUAGE,
    dictionary: [],
    unrecognized: [],
    showLogs: true,
};

const langutil = {

    /**
     * @description
     * Initialize langutil with a dictionary and language.
     * @example
     * import dictionary from './dictionary'; // dictionary.json
     * langutil.init(dictionary, 'english');
     * @param { Object } dictionary The dictionary that will be used throughout the app for localization.
     * @param { String } language The language that your keywords will be localizaed into.
     * @param { Boolean } auto Optional, sets if the computer should figure out the client's browser language.
     */
    init: function(dictionary, language, auto) {
        setDictionary(dictionary);
        this.setLanguage(language, auto);
    },

    /**
     * @description
     * Sets the language to be used throughout the app.
     * @example
     * langutil.setLanguage('english');
     * @param { String } language The language that your keywords will be localizaed into.
     * @param { Boolean } auto Optional, sets if the computer should figure out the client's browser language.
     */
    setLanguage: function(language, auto) {
        if (auto) {
            language = detectLanguage(language);
            if (config.unrecognized.length > 0 && config.showLogs) {
                var plural_code = config.unrecognized.length === 1 ? 'code' : 'codes';
                var plural_are = config.unrecognized.length === 1 ? 'is' : 'are';
                console.warn('The following language ' + plural_code + ' in the dictionary ' + plural_are + ' not within our language list: \'' + config.unrecognized.join('\', \'') + '\'. \n' +
                'We will not be able to make use of the localizations under the above mentioned '+ plural_code +' when language is set to auto detect. \n\nFor a list of recognized language codes, refer to https://www.github.com/chin98edwin/langutil/???'
                );
            }
        }
        config.language = language;

        // Check if the dictionary contains localizations for the language
        var languageRecognized = false;
        try {
            var index = Object.keys(config.dictionary)
            for (var i = 0; i < index.length; i++) {
                if (language === index[i]) {
                    languageRecognized = true;
                    break;
                }
            }
        } catch (error) { /* Do nothing for now */ }
        if (!languageRecognized && config.showLogs) {
            console.warn('The dictionary does not contain any localizations for "' + language + '". ');
        }
    },

    /**
     * @param { String } keyword The localization keyword.
     * @param { Array } paramArray Optional, an array of parameters that can be passed into the localization.
     * @example
     * langutil.localize('YOUR_KEYWORD');
     * langutil.localize('KEYWORD_WITH_PLACEHOLDERS', [param1, param2]);
     * @returns { String } Localized string from the dictionary.
     */
    localize: function(keyword, paramArray) {
        var localizedString = keyword.toUpperCase();
        if (paramArray === undefined) {
            paramArray = [];
        }
        try {
            // Get localized string from dictionary
            localizedString = config.dictionary[config.language][keyword];
            // Escape character for %p
            localizedString = localizedString.replace(/(%%p)/g, '%q');
            // Start recognizing actual placeholders
            var placeholders = /(%p)/g.exec(localizedString);
            placeholders = placeholders === null ? [] : placeholders;
            var paramArrayIndex = Object.keys(paramArray);
            var size = Math.min((placeholders.length + 1), paramArrayIndex.length);
            for (var i = 0; i < size; i++) {
                localizedString = localizedString.replace(/(%p)/, paramArray[i]);
            }
            // Check if parameters provided are sufficient
            if (config.showLogs) {
                if (paramArrayIndex.length > placeholders.length) {
                    console.warn('The parameters provided for "' + keyword + '" exceeded the number of placeholders in the dictionary for "' + config.language + '", hence they will be ignored. ');
                } else if (paramArrayIndex.length < placeholders.length) {
                    console.error(placeholders.length + ' placeholders found in keyword "' + keyword + '" for "' + config.language + '" but only received ' + paramArrayIndex.length + ' parameter(s). ');
                }
            }
            // Replace empty placeholders with empty string
            localizedString = localizedString.replace(/(%p)/g, '');
            // Restore escaped %p
            localizedString = localizedString.replace(/(%q)/g, '%p');
            // Add line break
            localizedString = localizedString.replace(/(%n)/g, '\n');
        } catch (error) {
            if (error instanceof TypeError) {
                if (config.dictionary.length !== 0) {
                    console.warn('The localization for the keyword "' + keyword + '" has not been set for "' + config.language + '". ');
                }
            } else {
                console.error(error);
            }
        }
        return localizedString === undefined ? keyword.toUpperCase() : localizedString;
    },

    /**
     * @description Call this function to hide all logs and warnings related to langutil.
     * @example langutil.hideLogs();
     */
    hideLogs: function() {
        config.showLogs = false;
    }

};

export default langutil;

// —————————————————————————————— Private functions ——————————————————————————————

/**
 * @description
 * Automatically determine the language used by the client's browser.
 * @param { Boolean } fallbackLanguage The language to be used if language could not be detected.
 * @returns { String } The detected language.
 */
function detectLanguage(fallbackLanguage) {
    var langtoReturn = fallbackLanguage;
    var detectedLanguage = navigator.language || navigator.userLanguage;
    var languageFound = false;
    detectedLanguage = detectedLanguage.toLowerCase();
    if (config.showLogs) {
        console.log('Detected language: ' + detectedLanguage);
    }

    for (var i = 0; i < LANGUAGE_LIST.length && !languageFound; i++) {
        var refCode = LANGUAGE_LIST[i].code.toLowerCase();
        if (detectedLanguage.includes(refCode)) {
            langtoReturn = LANGUAGE_LIST[i].code;
            languageFound = true;
        }
        for (var j = 0; j < LANGUAGE_LIST[i].ref.length && !languageFound; j++) {
            var refLanguage = LANGUAGE_LIST[i].ref[j].toLowerCase();
            if (detectedLanguage.includes(refLanguage)) {
                langtoReturn = LANGUAGE_LIST[i].code;
                languageFound = true;
            }
        }
    }

    // TODO: If unable detect browser language, attempt to detect language by time zone

    if (languageFound) {
        console.log('Auto-detected language: ' + langtoReturn);
    } else {
        console.warn('Failed to auto-detect language, setting language as \'' + fallbackLanguage + '\' instead. ');
    }
    return langtoReturn;
}

/**
 * @description
 * Inspects the dictionary for errors.
 * @param { Object } dictionaryToSet The dictionary that will be used throughout the app for localization.
 */
function inspectDictionary(dictionaryToSet) {
    var i, j, k;

    // (1) Check if dictionary is empty
    if (!dictionaryToSet) {
        throw new Error('Dictionary is empty');
    };
    var dictionaryKeys = Object.keys(dictionaryToSet);

    // (2) Check if the dictionary contains any language codes outside of the preset codes
    config.unrecognized = [];
    for (i = 0; i < dictionaryKeys.length; i++ ) {
        var languageRecognized = false;
        for (j = 0; j < LANGUAGE_LIST.length; j++) {
            if (dictionaryKeys[i] === LANGUAGE_LIST[j].code) {
                languageRecognized = true;
                break;
            }
        }
        if (!languageRecognized) {
            config.unrecognized.push(dictionaryKeys[i]);
        }
    }

    // (3) Get keywords from every language
    var allKeywords = [];
    for (i = 0; i < dictionaryKeys.length; i++) {
        var languageSet = dictionaryToSet[dictionaryKeys[i]];
        var languageSetKeywords = Object.keys(languageSet);
        allKeywords.push(...languageSetKeywords);
    }
    allKeywords = [...new Set(allKeywords)]; // Remove duplicate keys

    // (4) Check for invalid keys
    var invalidKeywords = [];
    for (i = 0; i < allKeywords.length; i++) {
        if (!keywordIsValid(allKeywords[i])) {
            invalidKeywords.push(allKeywords[i]);
        }
    }
    if (invalidKeywords.length > 0) {
        var plural_keyword = invalidKeywords.length > 1 ? 'keywords' : 'keyword';
        throw new Error('Invalid ' + plural_keyword + ' found in dictionary: "' +
        invalidKeywords.join('", "') + '"\nKeywords should only contain uppercase letters to prevent ambiguation. Underscores and numbers are allowed but not as the first character of the keyword. ');
    }

    // (5) Check if dictionary contain keywords that some languages do not have
    // This check is only performed if dictionary contains more than one language
    var missingKeywords = {};
    for (i = 0; i < dictionaryKeys.length; i++)  {
        languageSet = dictionaryToSet[dictionaryKeys[i]];
        languageSetKeywords = Object.keys(languageSet);
        var subMissingKeywords = [];
        for (j = 0; j < allKeywords.length; j++) {
            var keyFound = false;
            try {
                for (k = 0; k < languageSetKeywords.length; k++) {
                    // console.log(dictionaryKeys[i], allKeys[j], languageSetKeys[k]);
                    if (allKeywords[j] === languageSetKeywords[k]) {
                        keyFound = true;
                        break;
                    }
                }
            } catch (error) { /* Do nothing for now */ }
            if (!keyFound) {
                subMissingKeywords.push(allKeywords[j]);
            }
        }
        if (subMissingKeywords.length > 0) {
            missingKeywords[dictionaryKeys[i]] = { language: dictionaryKeys[i], keys: subMissingKeywords };
        }
    }
    var missingKeywordsIndex = Object.keys(missingKeywords);
    if (missingKeywordsIndex.length > 0 && config.showLogs) {
        var missingKeywordsList = '';
        for (i = 0; i < missingKeywordsIndex.length; i++) {
            missingKeywordsList += '• ' + missingKeywords[missingKeywordsIndex[i]].language + ': ' + [...missingKeywords[missingKeywordsIndex[i]].keys].join(', ');
            missingKeywordsList += i < (missingKeywordsIndex.length - 1) ? '\n' : '';
        }
        console.warn('There are missing keywords in some languages that other languages have. \n' +
        'As a result, localizations may not display properly in those languages. \n\n' +
        'Below are the languages and the keywords they\'re missing: \n' + missingKeywordsList);
    }
}

/**
 * @description
 * Checks if a keyword in the dictionary is valid.
 * @param { String } keywordToCheck The keyword of the dictionary
 * @returns { Boolean } true or false.
 */
function keywordIsValid(keywordToCheck) {
    var match = keywordToCheck.match(/([A-Z]+[A-Z|_|0-9]+[A-Z|0-9])/g);
    if (match) {
        return keywordToCheck === match.join('');
    }
    return false;
}

/**
 * @description
 * Sets the dictionary to be used throughout the app.
 * This function should be called in the constructor() or componentWillMount() method.
 * For best practices, you should save your dictionary in a JSON file and import it into your app.
 * @example
 * import dictionary from './dictionary';
 * setDictionary(dictionary);
 * @param { Object } dictionary The dictionary that will be used throughout the app for localization.
 */
function setDictionary(dictionary) {
    inspectDictionary(dictionary);
    config.dictionary = dictionary;
}

// —————————————————————————————— CONSTANTS ——————————————————————————————

const LANGUAGE_LIST = [
    { code: 'abkhazan', ref: ['ab', 'abk'] },
    { code: 'achinese', ref: ['ace'] },
    { code: 'acoli', ref: ['ach'] },
    { code: 'adangme', ref: ['ada'] },
    { code: 'adyghe', desc: 'Adygei', ref: ['ady', 'adygei'] },
    { code: 'afar', ref: ['aa', 'aar'] },
    { code: 'afrikaans', ref: ['afr', 'af'] },
    { code: 'ainu', ref: ['ain'] },
    { code: 'albanian', ref: ['alb', 'sqi', 'sq'] },
    { code: 'aleut', ref: ['ale'] },
    { code: 'altai_southern', ref: ['alt', 'altai'] },
    { code: 'amharic', ref: ['amh'] },
    { code: 'angika', ref: ['anp'] },
    { code: 'arabic', ref: ['ar'] },
    { code: 'aragonese', ref: ['an', 'arg'] },
    { code: 'arapaho', ref: ['arp'] },
    { code: 'arawak', ref: ['arw'] },
    { code: 'armenian', ref: ['arm', 'hye', 'hy'] },
    { code: 'assamese', ref: ['as', 'asm'] },
    { code: 'asturian', ref: ['ast', 'bable', 'leonese', 'sturleonese'] },
    { code: 'avaric', ref: ['av'] },
    { code: 'awadhi', ref: ['awa'] },
    { code: 'azerbaijani', ref: ['aze', 'az'] },
    { code: 'balinese', ref: ['ban'] },
    { code: 'bambara', ref: ['bm', 'bam'] },
    { code: 'bashkir', ref: ['ba', 'bak'] },
    { code: 'basa', ref: ['bas'] },
    { code: 'basque', ref: ['baq', 'eus', 'eu'] },
    { code: 'beja', ref: ['bej', 'bedawiyet'] },
    { code: 'bemba', ref: ['bem', 'chibemba'] },
    { code: 'belarusian', ref: ['bel', 'be'] },
    { code: 'bengali', ref: ['ben', 'bn'] },
    { code: 'bosnian', ref: ['bos', 'bs'] },
    { code: 'bulgarian', ref: ['bul', 'bg'] },
    { code: 'catalan', ref: ['cat', 'ca', 'valencian'] },
    { code: 'cebuano', ref: ['ceb'] },
    { code: 'chichewa', ref: ['chewa', 'nyanja', 'nya', 'ny'] },
    { code: 'chinese_s', desc: 'Simplified', ref: ['sim', 'hans', 'zh', 'chi', 'cn'] },
    { code: 'chinese_t', desc: 'Traditional', ref: ['trad', 'hant', 'zh', 'chi', 'cn'] },
    { code: 'corsican', ref: ['cos', 'co'] },
    { code: 'croatian', ref: ['hrv', 'hr'] },
    { code: 'czech', ref: ['ces', 'cs', 'cze'] },
    { code: 'danish', ref: ['dan', 'da'] },
    { code: 'dutch', ref: ['dut', 'nld', 'nl', 'flemish'] },
    { code: 'english', ref: ['eng', 'en'] },
    { code: 'esperanto', ref: ['epo', 'eo'] },
    { code: 'estonian', ref: ['est', 'et'] },
    { code: 'filipino', ref: ['fil', 'pilipino'] },
    { code: 'finnish', ref: ['fin', 'fi'] },
    { code: 'french', ref: ['fr', 'fra', 'fre'] },
    { code: 'frisian', ref: ['frs', 'frr', 'fry'] },
    { code: 'galician', ref: ['gl', 'glg'] },
    { code: 'georgian', ref: ['ka', 'kat', 'geo'] },
    { code: 'german', ref: ['de', 'deu', 'ger'] },
    { code: 'greek', ref: ['el', 'ell', 'gre'] },
    { code: 'gujarati', ref: ['gu', 'guj'] },
    { code: 'haitian_creole', ref: ['ht', 'hat'] },
    { code: 'hausa', ref: ['ha', 'hau'] },
    { code: 'hawaiian', ref: ['haw'] },
    { code: 'hebrew', ref: ['he', 'heb'] },
    { code: 'hindi', ref: ['hi', 'hin'] },
    { code: 'hmong', ref: ['hmn'] },
    { code: 'hungarian', ref: ['hu', 'hun'] },
    { code: 'icelandic', ref: ['is', 'isl', 'ice'] },
    { code: 'igbo', ref: ['ig', 'ibo'] },
    { code: 'indonesian', ref: ['indo', 'ind', 'in'] },
    { code: 'irish', ref: ['ga', 'gle'] },
    { code: 'italian', ref: ['it', 'ita'] },
    { code: 'japanese', ref: ['ja', 'jpn'] },
    { code: 'javanese', ref: ['jv', 'jav'] },
    { code: 'kannada', ref: ['kn', 'kan'] },
    { code: 'kazakh', ref: ['kk', 'kaz'] },
    { code: 'khmer', ref: ['km', 'khm'] },
    { code: 'korean', ref: ['ko', 'kor'] },
    { code: 'kurdish', ref: ['kur', 'ku', 'kurmanji'] },
    { code: 'kyrgyz', ref: ['kir', 'ky', 'kirghiz'] },
    { code: 'lao', ref: ['lao', 'lo'] },
    { code: 'latin', ref: ['lat', 'la'] },
    { code: 'latvian', ref: ['lav', 'lv'] },
    { code: 'lithuanian', ref: ['lez'] },
    { code: 'luxembourgish', ref: ['ltz', 'lb', 'letzeburgesch'] },
    { code: 'macedonian', ref: ['mac', 'mk', 'mkd'] },
    { code: 'malagasy', ref: ['mg', 'mlg'] },
    { code: 'malay', ref: ['ms', 'malay', 'melayu'] },
    { code: 'malayalam', ref: ['mal', 'ml'] },
    { code: 'maltese', ref: ['mlt', 'mt'] },
    { code: 'maori', ref: ['mao', 'mri', 'mi'] },
    { code: 'mapudungun', ref: ['arn', 'mapuche'] },
    { code: 'marathi', ref: ['mar', 'mr'] },
    { code: 'mongolian', ref: ['mon', 'mn'] },
    { code: 'myanmar', ref: ['bur', 'mya', 'my', 'burmese'] },
    { code: 'nepali', ref: ['nep', 'ne'] },
    { code: 'norwegian', ref: ['nor', 'no'] },
    { code: 'pashto', ref: ['pus', 'ps', 'pushto'] },
    { code: 'persian', ref: ['fas', 'fa', 'per'] },
    { code: 'polish', ref: ['pol', 'po'] },
    { code: 'portugese', ref: ['por', 'pt'] },
    { code: 'punjabi', ref: ['pan', 'pa'] },
    { code: 'romanian', ref: ['ron', 'ro', 'rum'] },
    { code: 'russian', ref: ['rus', 'ru'] },
    { code: 'samoan', ref: ['smo', 'sm'] },
    { code: 'scots_gaelic', ref: ['gla', 'gd'] },
    { code: 'serbian', ref: ['srp', 'sr'] },
    { code: 'sesotho', ref: ['nso', 'pedi', 'sepedi', 'sotho'] },
    { code: 'shona', ref: ['sna', 'sn'] },
    { code: 'sindhi', ref: ['snd', 'sd'] },
    { code: 'sinhala', ref: ['sin', 'si', 'sinhalese'] },
    { code: 'slovak', ref: ['slk', 'sl'] },
    { code: 'slovenian', ref: ['slv', 'sl'] },
    { code: 'somali', ref: ['som', 'so'] },
    { code: 'spanish', ref: ['spa', 'es', 'castilian'] },
    { code: 'sundanese', ref: ['sun', 'su'] },
    { code: 'swahili', ref: ['swa', 'sw'] },
    { code: 'swedish', ref: ['swe', 'sv'] },
    { code: 'tajik', ref: ['tgk', 'tg'] },
    { code: 'tamil', ref: ['tam', 'ta'] },
    { code: 'telugu', ref: ['tel', 'te'] },
    { code: 'thai', ref: ['tha', 'th'] },
    { code: 'turkish', ref: ['tur', 'tr'] },
    { code: 'ukrainian', ref: ['ukr', 'uk'] },
    { code: 'urdu', ref: ['urd', 'ur'] },
    { code: 'uzbek', ref: ['uzb', 'uz'] },
    { code: 'vietnamese', ref: ['vie', 'vi'] },
    { code: 'welsh', ref: ['wel', 'cym', 'cy'] },
    { code: 'xhosa', ref: ['xho', 'xh'] },
    { code: 'yiddish', ref: ['yid', 'yi'] },
    { code: 'yoruba', ref: ['yor', 'yo'] },
    { code: 'zulu', ref: ['zul', 'zu'] },
];

/**
 * — REFERENCES —
 * Language list are based on the translations offered in Google Translate at https://translate.google.com
 * Auto-detection by ref is based on some of the ISO language codes from https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
 */
