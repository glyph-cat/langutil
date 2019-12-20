/**
 * @author chin98edwin
 * @copyright Copyright (c) 2018 - present, chin98edwin
 * @description Localization for JavaScript made simple.
 * @version 3.1.0
**/

let config = {
  lang: null, // The language to be used
  auto: false, // Is the language assigned by auto-detection?
  dict: {}, // Stores all localizations
  allDictLang: [], // Stores all languages found in dictionary, used for auto-detect
  langIsInDict: false, // Determine whether the set language exists in dictionary
  initByLang: true, // Is the dictionary structured by language?
  showLogs: false, // Control visibility of logs
  showVerbose: false, // Control visibility of verbose logs
  missingLoc: [], // Missing localizations to be shown in grouped warnings
  missingLocMemo: [], // Missing localizations are memoized to prevent showing repeated warnings
  missingLocTimer: null, // Debounce reference for showing grouped warnings
  deprecatedWarningShown: {}, // Stores statuses of whether deprecated functions have been used
  hookedItems: {}, // Stores all React Components that listens for changes in langutil
  hookCounter: 0, // Auto ID for hooked items
};
try { config.showLogs = process.env.NODE_ENV !== 'production'; } catch (e) { }

function init(dict, lang, detector) {
  setDictionary(dict);
  setLanguage(lang, detector);
}

function setDictionary(dict) {

  // Legacy compensation
  const dictToUse = Array.isArray(dict) ? convertToNewDict(dict) : dict;

  const initialDict = JSON.stringify(config.dict);
  config.dict = dictToUse;
  printVerbose('Dictionary set!');

  // If Object.keys(dict)[0] does not contains any lowercase letters
  // This means it is not structured by keyword because keywords should be in MACRO_CASE

  // If Object.keys(dict)[0] HAS lowercase letters,
  // then it is probably a language code, otherwise it is a keyword
  // because keywords should be in MACRO_CASE and contain no lower case letters
  const firstKey = Object.keys(dictToUse)[0];
  config.initByLang = typeof firstKey === 'string' && /[a-z]/.test(firstKey);
  printVerbose(`Dictionary structure: ${config.initByLang ? 'By language' : 'By Keyword'}`);

  // Get composition of dict
  const { a, b } = extractAB(dictToUse);
  config.allDictLang = config.initByLang ? a : b;

  // (React-only) Trigger component refresh only if dictionary has changed
  if (JSON.stringify(config.dict) !== initialDict) { updateHookedItems(); }
}

function setLanguage(lang, detector) {
  let langIsAssigned = false;
  const initialLang = config.lang, initialAuto = config.auto;
  config.auto = false;

  // Run auto-detection if detector is supplied
  if (typeof detector === 'function') {
    const detectedLang = detector();
    // (1) Attempt to auto-detect client language
    if (detectedLang) {
      // (2) Check if dictionary has localizations for the exact value detected
      if (config.allDictLang.includes(detectedLang)) {
        config.lang = detectedLang; langIsAssigned = true;
        printVerbose(`Auto detected language: ${detectedLang}`);
      } else {
        // (2) No exact match
        function getSimilarLangFromAllLang(allLang, lang) {
          for (let a of allLang) {
            const _a = a.toLowerCase(), _l = lang.toLowerCase();
            if (_l.includes(_a) || _a.includes(_l)) { return a; }
            // If still no match, check substring of both sides
            const splitter = /_|-/g;
            const _aSub = _a.split(splitter), _lSub = _l.split(splitter);
            for (let u of _aSub) {
              for (let s of _lSub) {
                if (s.length > 0 && u.length > 0) {
                  if (s.includes(u) || u.includes(s)) { return a; }
                }
              }
            }
          }
          return null;
        };
        const similarLang = getSimilarLangFromAllLang(config.allDictLang, detectedLang);
        // (3) Attempt to find similar language instead
        if (similarLang) {
          config.lang = similarLang; langIsAssigned = true;
          printWarning(`Dictionary does not contain localizations for auto-detected language '${detectedLang}'. Closest possible language from dictionary '${similarLang}' is used instead.`);
        } else {
          // (3) No similar language, use fallback
          printWarning(`Dictionary does not contain localizations for auto-detected language '${detectedLang}' and closest possible language cannot be found. Using fallback language '${lang}' instead.`);
        }
      }
    } else {
      // (1) Auto-detect fail, use fallback
      printWarning(`Unable to auto-detect language, using fallback language '${lang}' instead.`);
    }

  } else if (typeof detector !== 'undefined') {
    throw TypeError(formatInv({ expected: { detector }, toBe: ['function'] }));
  }

  if (langIsAssigned) {
    // If lang is assigned previously it is because of auto-detection
    // Therefore langIsInDict should be assumed to `true`
    config.langIsInDict = true;
    config.auto = true;
  } else {
    // Otherwise, proceed with basic assigning method
    if (typeof lang === 'string') {
      config.lang = lang;
      config.langIsInDict = config.allDictLang.includes(lang);

      // Make a report that language has been set
      if (config.langIsInDict) {
        printVerbose(`Language set: ${lang}`);
      } else {
        throw ReferenceError(`The dictionary does not contain any localizations for '${lang}'.`);
      }

    } else {
      throw TypeError(formatInv({ expected: { lang }, toBe: ['string'] }));
    }
  }

  // (React-only) Trigger component refresh only if config is different
  if (config.lang !== initialLang || config.auto !== initialAuto) { updateHookedItems(); }

}

function localize(a, b, c, d) {
  if (typeof a === 'string') {
    return localizeBase({ keyword: a, param: b, casing: c, transform: d });
  } else if (typeof a === 'object') {
    return localizeBase(a);
  } else {
    throw SyntaxError('`localize()` should be used in one of either ways:\n • localize(keyword, param, casing, transform)\n • localize({ keyword: string, param: Array|Object, casing: string, transform: Function })');
  }
}

function langmap(a, b, c, d, e) {
  if (typeof a === 'string') {
    return langmapBase({ lang: a, keyword: b, param: c, casing: d, transform: e })
  } else if (typeof a === 'object') {
    return langmapBase(a)
  } else {
    throw SyntaxError('`langmap()` should be used in one of either ways:\n • langmap(lang, keyword, param, casing, transform)\n • langmap({ lang:string, keyword: string, param: Array|Object, casing: string, transform: Function })');
  }
}

function getCurrentLanguage() { return config.lang; }

function getDefinedLanguages() { return config.allDictLang; }

function AUTO_DETECT() {
  try {
    return (navigator.language || navigator.userLanguage).toLowerCase();
  } catch (e) {
    return null;
  }
}

const logs = {
  show: () => { config.showLogs = true; },
  hide: () => { config.showLogs = false; },
  showVerbose: () => { config.showVerbose = true; },
  hideVerbose: () => { config.showVerbose = false; },
  focus: function (fn) {
    const initialShow = config.showLogs, initialVerbose = config.showVerbose;
    let successful = false;
    config.showLogs = true; config.showVerbose = true;
    if (typeof fn === 'function') {
      function line(text) { return `\n=== ${text} ===\n`; }
      console.log(line('LANGUTIL FOCUS START'));
      console.time('Duration');
      try { fn(); successful = true; } catch (e) { console.error(e); }
      console.log(line('LANGUTIL FOCUS END'));
      console.timeEnd('Duration');
    } else {
      throw TypeError(formatInv({ expected: { fn }, toBe: ['function'] }));
    }
    config.showLogs = initialShow; config.showVerbose = initialVerbose;
    return successful;
  }
};

function isAuto() { return config.auto; }

/**
 * @description
 * @param {Array} dict
 * @returns {object}
 */
function convertToNewDict(dict = []) {
  if (!config.deprecatedWarningShown['legacyDict']) {
    config.deprecatedWarningShown['legacyDict'] = true;
    printWarning('Structuring the dictionary by keywords in an array has been deprecated. Solution: structure dictionary as an object. It works both ways now.');
  }
  let newDict = {};
  for (let i = 0; i < dict.length; i++) {
    const { keyword, localizations } = dict[i];
    newDict[keyword] = localizations;
  }
  return newDict;
}

function createKey(keyword, localizations) {
  if (!config.deprecatedWarningShown['createKey']) {
    config.deprecatedWarningShown['createKey'] = true;
    printWarning('`createKey` has been deprecated. Reason: All dictionaries are now structured as objects. You can still use this function in conjuction with `convert` from the \'dev-additions\' to re-structure the dictionary.');
  }
  return { keyword, localizations };
}

function getLanguage() {
  if (!config.deprecatedWarningShown['getLanguage']) {
    config.deprecatedWarningShown['getLanguage'] = true;
    printWarning('`getLanguage` has ben deprecated. Solution: Use `getCurrentLanguage` instead. Reason: The new naming gives a little more hint about what value the function is returning.');
  }
  return config.lang;
}

function localizeWith({ paramArray: param, ...otherProps }) {
  if (!config.deprecatedWarningShown['localizeWith']) {
    config.deprecatedWarningShown['localizeWith'] = true;
    printWarning('`localizeWith` has been deprecated. Solution: Use `localize` instead.');
  }
  return localizeBase({ param, ...otherProps });
}

function snoozeInspectionUntil() {
  if (!config.deprecatedWarningShown['snoozeInspectionUntil']) {
    config.deprecatedWarningShown['snoozeInspectionUntil'] = true;
    printWarning('`snoozeInspectionUntil` has been deprecated. Reason: Dictionary inspection consumes a lot of computation power and it happens everytime langutil is initialized. This feature is now part of the \'dev-additions\' so you can use it only when you need it instead.');
  }
}

function langmapBase({ lang, keyword, param, casing, transform }) {

  const errKeyword = `_${keyword.toUpperCase()}_`;

  let localizedValue, localizeSuccess = false;
  try {
    if (config.initByLang) {
      localizedValue = config.dict[lang][keyword];
    } else {
      localizedValue = config.dict[keyword][lang];
    }
    if (typeof localizedValue === 'string') {
      if (param) {
        localizedValue = applyParam(localizedValue, param, keyword);
      } else {
        localizedValue = cleanupUnusedPlaceholders(localizedValue);
      }
      if (casing) { localizedValue = applyCasing(localizedValue, casing, keyword); }
    }
    if (transform) { localizedValue = applyTransform(localizedValue, transform, keyword); }
    localizeSuccess = typeof localizedValue !== 'undefined';
  } catch (e) { }

  if (!localizeSuccess) {
    localizedValue = errKeyword;
    // Show error for missing localizations
    if (
      // Same keyword will only be shown once
      !config.missingLocMemo.includes(`${lang}${keyword}`) &&
      // Skip showing if lang is not in dict because another error would have been shown
      config.langIsInDict
    ) {
      config.missingLoc.push(keyword);
      config.missingLocMemo.push(`${lang}${keyword}`);
      (debounce(() => {
        config.missingLoc.sort();
        printError(`Missing localizations (${lang}): ${config.missingLoc.join(', ')}`);
        config.missingLoc = [];
      }))();
    }
  }

  return localizedValue;
}

function localizeBase(props) {
  return langmapBase({ lang: config.lang, ...props })
}

/**
 * @description Allow external modules to subscribe to any changes in language or dictionary.
 * @param {Function} refreshFn The callback to trigger
 */
function addListener(refreshFn) {
  const id = `L${config.hookCounter++}`;
  config.hookedItems[id] = refreshFn;
  return id;
}

/**
 * @description Allow external modules to unsubscribe to any changes in language or dictionary.
 */
function removeListener(id) {
  delete config.hookedItems[id];
}

/**
 * @description Notify external modules that language or dictionary has changed.
 */
function updateHookedItems() {
  const hookIndex = Object.keys(config.hookedItems);
  for (let index of hookIndex) {
    const executor = config.hookedItems[index];
    executor();
  }
}

/**
 * @description Extract all languages and keywords from a dictionary.
 * @param {object} dict The dictionary to extract from
 * @returns {{a:Array<string>, b:Array<string>}} `a` contains all languages while `b` contains all keys in the dictionary if structured by language, otherwise it is the other way round.
 */
function extractAB(dict) {
  let a = Object.keys(dict), b = [];
  for (let _a of a) { b.push(...Object.keys(dict[_a])); }
  b = [...new Set(b)]; // Remove duplicates
  return { a, b };
}

/**
 * @description Capitalizes the first letter of a string.
 * @param {string} str String to modify
 * @returns {string} The string with first letter capitalized.
 */
function capitalizeFirstLetter(str) {
  // Only force convert all to lower case if the word is mixed case
  // (otherwise it might be an abbreviation)
  if (str.match(/[a-z]+[A-Z]+/g)) { str = str.toLowerCase(); }
  const currentWord = str.split('');
  const firstLetter = currentWord.shift();
  return `${firstLetter.toUpperCase()}${currentWord.join('')}`;
}

/**
 * @description Generates a random hash of a fixed length.
 * @param {number} length The length of hash.
 * @returns {string} The hash.
 */
function getRandomHash(length) {
  let newHash = '';
  const pattern = '0123456789abcdef';
  do {
    let randomIndex = Math.floor(Math.random() * pattern.length);
    newHash += pattern[randomIndex];
  } while (newHash.length < length);
  return newHash;
}

/**
 * @description Substitutes all occurence of a key in the string with a random hash, which the hash can be later be swapped into another value.
 * @param {string} str
 * @param {RegExp} rgx
 * @returns {string} The substituted string and the swapper used.
 */
function substituteKeyFromStringWithUniqueSwapper(str, rgx) {
  // %p is escaped with %%p, and {:key} with {::key}
  // A random hash that temporarily substitutes %%p and {::key} makes it possible
  // Random hash cannot be subset of the original string
  let hashLength = 2, swapper = '%q';
  while (str.includes(swapper)) {
    swapper = getRandomHash(hashLength++);
  }
  str = str.replace(rgx, swapper);
  return { newStr: str, swapper };
}

/**
 * @description Level down unused placeholders, %%p -> %p, {::key} -> {:key} and so on
 * @param {string} str
 * @returns {string}
 */
function cleanupUnusedPlaceholders(str) {
  if (typeof str === 'string') {
    let { newStr, swapper } = substituteKeyFromStringWithUniqueSwapper(str, /(%%p)/g);
    newStr = newStr.replace(/(%p)/g, '');
    newStr = newStr.replace(new RegExp(`(${swapper})`, 'g'), '%p');
    newStr = newStr.replace(/({::)/g, '{:');
    return newStr;
  } else {
    return str;
  }
}

/**
 * @description Substitutes each element in an array into a given string.
 * @param {string} newStr String to modify
 * @param {Array} arr Array to use
 * @param {string} keyword Keyword of localization (for debug use)
 * @returns {string} The modified string.
 */
function getStringWithParamArray(str, arr = [], keyword = '(Unknown)') {
  let { newStr, swapper } = substituteKeyFromStringWithUniqueSwapper(str, /(%%p)/g);

  // Detect real placeholders and substitute them with parameters
  let placeholderCount = 0;
  try { placeholderCount = newStr.match(/(%p)/g).length; } catch (e) { }

  // Avoid getting undefined values in case `placeholderCount !== arr.length`
  let maximumLoopCount = Math.min((placeholderCount + 1), arr.length);
  for (let i = 0; i < maximumLoopCount; i++) {
    newStr = newStr.replace(/(%p)/, arr[i]);
  }

  // Show warning if length not tally
  if (arr.length !== placeholderCount) {
    printWarning(`Placeholder count and array length not tally.\nKeyword: ${keyword}\nLocalization: ${str} (${placeholderCount} placeholders)\nArray supplied: ['${arr.join('\', \'')}'] (${arr.length})`);
  }

  // Replace empty placeholders with empty string
  newStr = newStr.replace(/(%p)/g, '');

  // Restore escaped %p
  newStr = newStr.replace(new RegExp(`(${swapper})`, 'g'), '%p');

  return newStr;
}

/**
 * @description Substitutes each value in an object into a given string.
 * @param {string} newStr String to modify
 * @param {object} obj Object to use
 * @returns {string} The modified string.
 */
function getStringWithParamObject(str, obj = {}, keyword = '(Unknown)') {

  let { newStr, swapper } = substituteKeyFromStringWithUniqueSwapper(str, /({::)/g);
  const allKeysInObj = Object.keys(obj);

  // Check for untally params
  if (config.showLogs) { // To save performance
    const allKeysInStr = extractKeysFromStringForParamObj(newStr);
    for (let i = 0; i < allKeysInObj.length; i++) {
      if (allKeysInStr.indexOf(allKeysInObj[i]) < 0) {
        printWarning(`Placeholder in localized string and param objects are not tally.\nKeyword: ${keyword}\nLocalization: ${str}\nParameters supplied: ${allKeysInObj.join(', ')}\nPlaceholders found: ${allKeysInStr.join(', ')}`);
        break; // Early exit to save performance
        // Users can check and compare the keys in the warning message itself
      }
    }
  }

  // Actual substitution takes place here
  for (let i = 0; i < allKeysInObj.length; i++) {
    const target = new RegExp(`(\\{:${allKeysInObj[i]}\\})`, 'g');
    newStr = newStr.replace(target, obj[allKeysInObj[i]]);
  }

  // Restore escaped curly brackets
  newStr = newStr.replace(new RegExp(`(${swapper})`, 'g'), '{:');

  return newStr;
}

function extractKeysFromStringForParamObj(string) {
  let extracted = string.match(/{:[a-z]+[^}](?=})/gi);
  if (!extracted) { extracted = []; }
  for (let i = 0; i < extracted.length; i++) {
    extracted[i] = extracted[i].split('');
    extracted[i].splice(0, 2);
    extracted[i] = extracted[i].join('');
  }
  return extracted;
}

function applyParam(value, param, keyword) {
  if (typeof value === 'string') {
    if (Array.isArray(param)) {
      value = getStringWithParamArray(value, param, keyword);
    } else if (typeof param === 'object') {
      value = getStringWithParamObject(value, param, keyword);
    } else {
      throw TypeError(`${formatInv({ expected: { param }, toBe: ['array', 'object'] })} (in '${keyword}')`);
    }
  } else {
    printError(`Cannot insert parameters into ${getArticleBeforeNoun(typeof value)} ${typeof value} (in '${keyword}')`);
  }
  return value;
}

/**
 * @description
 * @param {*} value
 * @param {*} casing
 * @param {*} keyword
 * @returns {string}
 */
function applyCasing(value, casing, keyword) {
  const templates = {
    lowerCase: s => s.toLowerCase(),
    localeLowerCase: s => s.toLocaleLowerCase(),
    localeUpperCase: s => s.toLocaleUpperCase(),
    sentenceCase: s => {
      let [firstWord, ...otherWords] = s.split(' ');
      for (let i = 0; i < otherWords.length; i++) {
        // Only force convert all to lower case if the word is mixed case
        // (otherwise it might be an abbreviation)
        if (otherWords[i].match(/[a-z]+[A-Z]+/g)) {
          otherWords[i] = otherWords[i].toLowerCase();
        }
      }
      return `${capitalizeFirstLetter(firstWord)} ${otherWords.join(' ')}`;
    },
    titleCase: s => {
      s = s.split(/[\s]/g);
      for (let i = 0; i < s.length; i++) {
        s[i] = capitalizeFirstLetter(s[i]);
      }
      s = s.join(' ');
      return s;
    },
    upperCase: s => s.toUpperCase()
  };

  if (typeof value === 'string') {
    let casingIsValid = false;
    if (typeof casing === 'string') {
      const applyTo = templates[casing];
      if (typeof applyTo === 'function') {
        value = applyTo(value);
        casingIsValid = true;
      }
    }
    if (!casingIsValid) {
      throw TypeError(`${formatInv({ expected: { casing }, toBeOneOf: Object.keys(templates) })} (in '${keyword}')`);
    }
  } else {
    printError(`Cannot apply casing to ${getArticleBeforeNoun(typeof value)} ${typeof value} (in '${keyword}')`);
  }

  return value;
}

/**
 * @description
 * @param {string} value
 * @param {Function} fn
 * @param {string} keyword
 * @returns {string}
 */
function applyTransform(value, fn, keyword) {
  if (typeof fn === 'function') {
    value = fn(value);
  } else if (typeof fn !== 'undefined') {
    throw TypeError(`${formatInv({ expected: { fn }, toBe: ['function'] })} (in '${keyword}')`);
  }
  return value;
}

/**
 * @description Creates a debounce function to enable grouping for logs regarding missing localizations.
 * @param {Function} fn Function to debounce
 * @returns {Function} Debounced function
 */
function debounce(fn) {
  return function () {
    if (config.missingLocTimer) { clearTimeout(config.missingLocTimer); }
    config.missingLocTimer = setTimeout(fn);
  };
}

function getArticleBeforeNoun(noun) {
  return 'aeiou'.includes(noun[0].toLowerCase()) ? 'an' : 'a';
}

function formatInv({ expected = { parameter: null }, toBe = [], toBeOneOf = [] }) {
  const paramName = Object.keys(expected)[0];
  const paramValue = Object.values(expected)[0];
  let paramType = Array.isArray(paramValue) ? 'array' : typeof paramValue;
  if ((toBe.includes('string') || toBeOneOf.length > 0) && paramType === 'string') {
    paramType = `'${paramValue}'`;
  }
  let expectedSpec;
  if (toBe.length > 0) {
    const articleBeforeNoun = getArticleBeforeNoun(toBe[0]);
    if (toBe.length > 2) {
      expectedSpec += `either ${articleBeforeNoun} ${toBe.join(', ')}`;
    } else if (toBe.length === 2) {
      expectedSpec += `either ${articleBeforeNoun} ${toBe[0]} or ${toBe[1]}`;
    } else {
      expectedSpec = `${articleBeforeNoun} ${toBe[0]}`;
    }
  } else {
    expectedSpec = `one of ['${toBeOneOf.join('\', \'')}']`;
  }
  return `Invalid parameter. Expected \`${paramName}\` to be ${expectedSpec} but got ${paramType}.`;
}

function printVerbose(text) { if (config.showLogs && config.showVerbose) console.log(text); }
function printWarning(text) { if (config.showLogs) console.warn(text); }
function printError(text) { if (config.showLogs) console.error(text); }

module.exports = {
  // Standard
  init, setDictionary, setLanguage, localize, langmap, getCurrentLanguage, getDefinedLanguages,
  AUTO_DETECT, logs, isAuto,
  // Deprecated
  createKey, getLanguage, localizeWith, snoozeInspectionUntil,
  // Internals - exploit at own risk
  _INTERNALS: {
    capitalizeFirstLetter, applyParam, applyCasing, applyTransform, getRandomHash,
    extractAB, convertToNewDict, formatInv, printWarning,
    addListener, removeListener,
  }
};
