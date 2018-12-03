/**
 * @author chin98edwin
 * @version 1.0.3
 * @description A simple localizing utility for JavaScript.
 * @copyright Copyright (c) 2018, chin98edwin
 * @see https://www.npmjs.com/package/langutil#readme for documentation
 * @license ISC — Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
**/

const DEFAULT_LANGUAGE = 'english';
var config = {
    language: DEFAULT_LANGUAGE, // The language to be used
    dictionary: [], // Where all localizations are stored
    unrecognized: [], // Stores the unrecognized languages for logging
    showLogs: true, // Decides if logs and warnings from langutil should be shown
};

module.exports = langutil = {

    /**
     * @description Initialize langutil with a dictionary and language.
     * @param {Object} dictionary The dictionary that will be used throughout the app for localization.
     * @param {('abkhazan'|'achinese'|'acoli'|'adangme'|'adyghe'|'afar'|'afrikaans'|'ainu'|'albanian'|'aleut'|'altai_southern'|'amharic'|'angika'|'arabic'|'aragonese'|'arapaho'|'arawak'|'armenian'|'assamese'|'asturian'|'avaric'|'awadhi'|'azerbaijani'|'balinese'|'bambara'|'bashkir'|'basa'|'basque'|'beja'|'bemba'|'belarusian'|'bengali'|'bosnian'|'bulgarian'|'catalan'|'cebuano'|'chichewa'|'chinese_s'|'chinese_t'|'corsican'|'croatian'|'czech'|'danish'|'dutch'|'english'|'esperanto'|'estonian'|'filipino'|'finnish'|'french'|'frisian'|'galician'|'georgian'|'german'|'greek'|'gujarati'|'haitian_creole'|'hausa'|'hawaiian'|'hebrew'|'hindi'|'hmong'|'hungarian'|'icelandic'|'igbo'|'indonesian'|'irish'|'italian'|'japanese'|'javanese'|'kannada'|'kazakh'|'khmer'|'korean'|'kurdish'|'kyrgyz'|'lao'|'latin'|'latvian'|'lithuanian'|'luxembourgish'|'macedonian'|'malagasy'|'malay'|'malayalam'|'maltese'|'maori'|'mapudungun'|'marathi'|'mongolian'|'myanmar'|'nepali'|'norwegian'|'pashto'|'persian'|'polish'|'portugese'|'punjabi'|'romanian'|'russian'|'samoan'|'scots_gaelic'|'serbian'|'sesotho'|'shona'|'sindhi'|'sinhala'|'slovak'|'slovenian'|'somali'|'spanish'|'sundanese'|'swahili'|'swedish'|'tajik'|'tamil'|'telugu'|'thai'|'turkish'|'ukrainian'|'urdu'|'uzbek'|'vietnamese'|'welsh'|'xhosa'|'yiddish'|'yoruba'|'zulu')} language The language that your keywords will be localizaed into.
     * @param {Boolean} [auto] Set it to true to let the computer figure out the client's browser language.
     */
    init: function(dictionary, language, auto) {
        setDictionary(dictionary);
        this.setLanguage(language, auto);
    },

    /**
     * @description Sets the language to be used throughout the app.
     * @param {'abkhazan'|'achinese'|'acoli'|'adangme'|'adyghe'|'afar'|'afrikaans'|'ainu'|'albanian'|'aleut'|'altai_southern'|'amharic'|'angika'|'arabic'|'aragonese'|'arapaho'|'arawak'|'armenian'|'assamese'|'asturian'|'avaric'|'awadhi'|'azerbaijani'|'balinese'|'bambara'|'bashkir'|'basa'|'basque'|'beja'|'bemba'|'belarusian'|'bengali'|'bosnian'|'bulgarian'|'catalan'|'cebuano'|'chichewa'|'chinese_s'|'chinese_t'|'corsican'|'croatian'|'czech'|'danish'|'dutch'|'english'|'esperanto'|'estonian'|'filipino'|'finnish'|'french'|'frisian'|'galician'|'georgian'|'german'|'greek'|'gujarati'|'haitian_creole'|'hausa'|'hawaiian'|'hebrew'|'hindi'|'hmong'|'hungarian'|'icelandic'|'igbo'|'indonesian'|'irish'|'italian'|'japanese'|'javanese'|'kannada'|'kazakh'|'khmer'|'korean'|'kurdish'|'kyrgyz'|'lao'|'latin'|'latvian'|'lithuanian'|'luxembourgish'|'macedonian'|'malagasy'|'malay'|'malayalam'|'maltese'|'maori'|'mapudungun'|'marathi'|'mongolian'|'myanmar'|'nepali'|'norwegian'|'pashto'|'persian'|'polish'|'portugese'|'punjabi'|'romanian'|'russian'|'samoan'|'scots_gaelic'|'serbian'|'sesotho'|'shona'|'sindhi'|'sinhala'|'slovak'|'slovenian'|'somali'|'spanish'|'sundanese'|'swahili'|'swedish'|'tajik'|'tamil'|'telugu'|'thai'|'turkish'|'ukrainian'|'urdu'|'uzbek'|'vietnamese'|'welsh'|'xhosa'|'yiddish'|'yoruba'|'zulu'} language The language that your keywords will be localized into.
     * @param {Boolean} [auto] Set it to true to let the computer figure out the client's browser language.
     */
    setLanguage: function(language, auto) {
        language = auto ? detectLanguage(language) : language;
        config.language = language;
        if (config.showLogs) {
            // Check if the dictionary contains localizations for the language
            var langRecognized = false;
            try {
                var index = Object.keys(config.dictionary)
                for (var i = 0; i < index.length && !langRecognized; i++) {
                    if (language === index[i]) {
                        langRecognized = true;
                    }
                }
            } catch (error) {} // No action required
            if (!langRecognized) {
                console.warn('The dictionary does not contain any localizations for "' + language + '". ');
            }
        }
    },

    /**
     * @description Maps the keyword to it's string in it's localizde form.
     * @param {String} keyword The localization keyword.
     * @param {Array} [paramArray] An array of parameters that can be passed into the localization.
     * @returns {String} Localized string from the dictionary.
     */
    localize: function(keyword, paramArray=[]) {
        var localizedString = keyword.toUpperCase();
        try {
            localizedString = config.dictionary[config.language][keyword];
            localizedString = stringWithParams(localizedString, paramArray);
        } catch (error) {
            if (config.showLogs) {
                if (error instanceof TypeError && config.dictionary.length !== 0) {
                    console.warn('The localization for the keyword "' + keyword + '" has not been set for "' + config.language + '". ');
                } else {
                    console.error(error);
                }
            }
        }
        return localizedString === undefined ? keyword.toUpperCase() : localizedString;
    },

    /**
     * @description
     * Hides all logs and warnings from langutil functions after the line this functions is called.
     * Warning: This function will be deprecated in future versions in favor of a more flexible method.
     */
    hideLogs: function() {
        config.showLogs = false;
    },

    // /**
    //  * @description Shows or hides logs from langutil.
    //  * @param {('hide'|'show')} toggle ...
    //  * @param {Function} [fn] ...
    //  */
    // logs: function(toggle='hide', fn) {
    //     const TOGGLE_VALUES = { show: true, hide: false }
    //     try {
    //         toggle = toggle.toLowerCase()
    //         if (TOGGLE_VALUES[toggle]) {
    //             toggle = TOGGLE_VALUES[toggle];
    //         } else {
    //             toggle = TOGGLE_VALUES.hide;
    //             throw new Error('INVALID_TOGGLE_VALUE');
    //         }
    //     } catch (error) {
    //         if (config.showLogs) {
    //             if (error.message === 'INVALID_TOGGLE_VALUE') {
    //                 console.warn('Invalid toggle value. Only accepts \'show\' or \'hide\'. ');
    //             } else {
    //                 console.error(e);
    //             }
    //         }
    //     }

    //     if (fn instanceof Function) {
    //         config.showLogs = !config.showLogs;
    //         var valueToReturn = fn();
    //         config.showLogs = !config.showLogs;
    //         if (valueToReturn) {
    //             return valueToReturn;
    //         }
    //     } else {
    //         config.showLogs = toggle;
    //     }
    // }

};

/**
 * @description Automatically determine the language used by the client's browser.
 * @param {Boolean} fallbackLanguage The language to be used if language could not be detected.
 * @todo If unable detect browser language, attempt to detect language by time zone.
 * @returns {String} The detected language.
 */
function detectLanguage(fallbackLanguage) {
    var languageFound = false;
    var langtoReturn = fallbackLanguage;
    try {
        var detectedLanguage = navigator.language || navigator.userLanguage;
            detectedLanguage = detectedLanguage.toLowerCase();
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
    } catch (error) {
        if (config.showLogs) {
            if (error instanceof ReferenceError) {
                console.warn('You are probably using langutil in a non-browser environment. ');
            } else {
                console.error(error);
            }
        }
    }
    if (config.showLogs) {
        if (languageFound) {
            console.log('Auto-detected language: ' + langtoReturn);
        } else {
            console.warn('Failed to auto-detect language, setting language as \'' + fallbackLanguage + '\' instead. ');
        }
    }
    return langtoReturn;
}

/**
 * @description Inspects the dictionary for errors.
 * @param {Object} dictionaryToSet The dictionary that will be used throughout the app for localization.
 * @throws Error will be thrown if dictionary is empty or dictionary contains invalid keywords.
 */
function inspectDictionary(dictionaryToSet) {
    var i, j, k;

    // (1) Check if dictionary is empty
    if (!dictionaryToSet) {
        throw new Error('Dictionary is empty');
    }
    var dictionaryKeys = Object.keys(dictionaryToSet);

    // (2) Check dictionary for unrecognized language codesa and show warning
    config.unrecognized = [];
    for (i = 0; i < dictionaryKeys.length; i++ ) {
        var languageRecognized = false;
        for (j = 0; j < LANGUAGE_LIST.length && !languageRecognized; j++) {
            if (dictionaryKeys[i] === LANGUAGE_LIST[j].code) {
                languageRecognized = true;
            }
        }
        if (!languageRecognized) {
            config.unrecognized.push(dictionaryKeys[i]);
        }
    }
    if (config.unrecognized.length > 0 && config.showLogs) {
        console.warn('The following language codes in the dictionary are not within our language list: \'' + config.unrecognized.join('\', \'') + '\'. \n' +
        'We will not be able to make use of the localizations with the above mentioned codes when language is set to auto detect. \n\nFor a list of recognized language codes, see https://github.com/chin98edwin/langutil#language-list. '
        );
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
                for (k = 0; k < languageSetKeywords.length && !keyFound; k++) {
                    // console.log(dictionaryKeys[i], allKeys[j], languageSetKeys[k]);
                    if (allKeywords[j] === languageSetKeywords[k]) {
                        keyFound = true;
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
    if (config.showLogs) {
        var missingKeywordsIndex = Object.keys(missingKeywords);
        if (missingKeywordsIndex.length > 0) {
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
}

/**
 * @description
 * Checks if a keyword in the dictionary is valid.
 * @param {String} keywordToCheck The keyword of the dictionary
 * @returns {Boolean} true or false.
 */
function keywordIsValid(keywordToCheck) {
    var keywordFormat = /([A-Z]+[A-Z|_|0-9]+[A-Z|0-9])/g;
    var match = keywordToCheck.match(keywordFormat);
    if (match) {
        return keywordToCheck === match.join('');
    }
    return false;
}

/**
 * @description Sets the dictionary to be used throughout the app.
 * This function should be called in the constructor() or componentWillMount() method.
 * For best practices, you should save your dictionary in a JSON file and import it into your app.
 * @param {Object} dictionary The dictionary that will be used throughout the app for localization.
 */
function setDictionary(dictionary) {
    inspectDictionary(dictionary);
    config.dictionary = dictionary;
}

/**
 * @description Replaces all occurences of %p in string with values from a set of arrays.
 * @param {String} stringWithFormat The string to be formatted.
 * @param {Array} [paramArray] An array of parameters that can be passed into the localization.
 */
function stringWithParams(stringWithFormat, paramArray=[]) {
    // Escape character for %p with %%p
    // A random string that is non-existent in the current string is generated and swapped with
    var escape_p_Length = 2;
    var escape_p_swapper = '%q';
    while (stringWithFormat.includes(escape_p_swapper)) {
        escape_p_swapper = getRandomString('0123456789abcdef', escape_p_Length++);
    }
    stringWithFormat = stringWithFormat.replace(/(%%p)/g, escape_p_swapper);
    // Detect real placeholders and substitute them with parameters
    var placeholders = /(%p)/g.exec(stringWithFormat);
    placeholders = placeholders ? placeholders : [];
    var placeholderCount = Math.min((placeholders.length + 1), paramArray.length);
    for (var i = 0; i < placeholderCount; i++) {
        stringWithFormat = stringWithFormat.replace(/(%p)/, paramArray[i]);
    }
    // ParamArray checking
    if (config.showLogs) {
        if (paramArray.length > placeholders.length) {
            console.warn('EXTRANEOUS PARAMETERS. Expected ' + placeholders.length + ' but received ' + paramArray.length + '. \nString: ' + stringWithFormat);
        } else if (paramArray.length < placeholders.length) {
            console.error('INSUFFICIENT PARAMETERS. Expected ' + placeholders.length + ' but received ' + paramArray.length + '. \nString: ' + stringWithFormat);
        }
    }
    // Replace empty placeholders with empty string
    stringWithFormat = stringWithFormat.replace(/(%p)/g, '');
    // Restore escaped %p
    stringWithFormat = stringWithFormat.replace(new RegExp('(' + escape_p_swapper + ')', 'g'), '%p');
    return stringWithFormat
}

/**
 * @description Generates a random strng of a fixed length.
 * @param {String} pattern The character set where random string will be generated from.
 * @param {Number} length The length of random string.
 * @returns {String} The randomized string.
 */
function getRandomString(pattern, length) {
    var newHash = '';
    do {
        var randomIndex = Math.floor(Math.random() * pattern.length);
        newHash += pattern[randomIndex];
    } while (newHash.length < length);
    return newHash;
}

/**
 * @description Language List References
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
 * @todo Add new languages from https://www.w3schools.com/tags/ref_language_codes.asp
 */
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
    { code: 'chinese_s', desc: 'Simplified', ref: ['sim', 'hans'] },
    { code: 'chinese_t', desc: 'Traditional', ref: ['trad', 'hant'] },
    { code: 'chinese', ref: ['han', 'zh', 'chi', 'cn'] },
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