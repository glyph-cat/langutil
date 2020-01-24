const { _INTERNALS: { extractAB, formatInv, convertToNewDict } } = require('langutil');

let warningShown = false;
if (!warningShown) {
  console.warn('Langutil\'s \'dev-additions\' is still in an experimental stage and it\'s implementation may change overtime.\n');
}

function keyIsValid(key) {
  const format = /([A-Z]+[A-Z|_|0-9]?[A-Z|0-9])/g;
  const match = key.match(format);
  try { return key === match.join(''); } catch (e) { return false; }
}

function isInitByLang(dict) { return /[a-z]/.test(Object.keys(dict)[0]); }

// function flipDict(dict) {
//   let newDict = {};
//   const { a, b } = extractAB(dict);
//   for (let _a of a) {
//     newDict[_a] = {};
//     for (let _b of b) {
//       newDict[_a] = dict[_b][_a];
//     }
//   }
// }

// function getObjDictFromArr(dict) {
//   let objDict = {};
//   for (let d of dict) {
//     const { keyword, localizations } = d;
//     objDict[keyword] = localizations;
//   }
//   return objDict;
// }

function convertDict(dict) {
  return convertToNewDict(dict, true);
}

// function convertDict(dict, sortBy, to) {
//   let newDict = {};

//   if (Array.isArray(dict)) {
//     newDict = getObjDictFromArr(dict);
//   } else if (typeof dict == 'object') {
//     newDict = dict;
//   } else {
//     console.error(formatInv({ expected: { dict }, toBe: ['object'] }));
//     return {}
//   }

//   const alreadySortedByLang = isInitByLang(dict);
//   if (sortBy === 'lang' && !alreadySortedByLang || sortBy === 'keyword' && alreadySortedByLang) {
//     newDict = flipDict(newDict);
//   } else if (!['keyword', 'lang'].includes(sortBy)) {
//     console.error(formatInv({ expected: { sortBy }, toBeOneOf: ['keyword', 'lang'] }));
//     return {};
//   }

//   if (to === 'csv') {
//     /* Sort by lang
//     |    | en | zh |
//     | KW |
//     | KW |
//     */
//   } else if (to === 'json') {
//     return newDict;
//   } else {
//     console.error(formatInv({ expected: { to }, toBeOneOf: ['csv', 'json'] }));
//     return {};
//   }

// }

function inspectDict(dict) {

  // Check if dictionary is empty
  function dictIsEmpty(dict) {
    try { return Object.keys(dict).length <= 0; } catch (error) { return false; }
  }
  if (!Array.isArray(dict) && typeof dict === 'object') {
    if (dictIsEmpty(dict)) { console.error('(!) Dictionary is empty'); return true; }
  } else {
    console.error(formatInv({ expected: { dict }, toBe: ['object'] }));
    return true;
  }

  let noErrors = true;
  // Extract all languages and keywords from dictionary
  console.log('(i) Extracting all languages and keywords found in dictionary...');
  const { a, b } = extractAB(dict), isByLang = isInitByLang(dict);
  let allLang = [], allKeys = [];
  if (isByLang) {
    allLang = a, allKeys = b;
  } else {
    allLang = b, allKeys = a;
  }

  // Check for invalid keys
  console.log('(i) Checking keywords...');
  let invalidKeys = [];
  for (let key of allKeys) { if (!keyIsValid(key)) { invalidKeys.push(key); } }
  if (invalidKeys.length > 0) {
    noErrors = false;
    invalidKeys.sort();
    console.error(`(!) Keywords should be in MACRO_CASE.\nInvalid keywords found!\n: ['${invalidKeys.join('\',\'')}']`);
  } else {
    console.log('(✓) All keywords are valid');
  }

  // Check for untally localizations
  console.log('(i) Checking for untally localizations...');
  let unlocalizedKeys = {};
  for (let key of allKeys) {
    let unlocalizedLang = [];
    for (let lang of allLang) {
      // Get localization
      let currentLocalization = null;
      try { currentLocalization = isByLang ? dict[lang][key] : dict[key][lang]; } catch (e) { }
      // Add language to unlocalized list
      if (!currentLocalization) { unlocalizedLang.push(lang); }
    }
    // Add keywords to unlocalized list
    if (unlocalizedLang.length > 0) {
      unlocalizedKeys[key] = unlocalizedLang;
      unlocalizedLang = []; // Reset unlocalized languages
    }
  }

  if (Object.keys(unlocalizedKeys).length > 0) {
    let warning = '';
    for (let uKeyIndex of Object.keys(unlocalizedKeys)) {
      warning += `\n • ${uKeyIndex}: ${unlocalizedKeys[uKeyIndex].join(', ')}`;
    }
    noErrors = false;
    console.error(`(!) Found localizations with missing keywords: ${warning}`);
  } else {
    console.log('(✓) No untally localizations');
  }

  console.log('(i) Inspection complete.');
  return noErrors;
}

// function inspectProject(dict) {
//   const fs = require('fs');
//   let projectHasError = false;
//   // Check files recursively for undefined keywords
//   // Ability to exclude files or search within a certain scope only
//   return projectHasError;
// }

module.exports = { inspectDict, convertDict };
// module.exports = { convertDict, inspectDict, inspectProject };
