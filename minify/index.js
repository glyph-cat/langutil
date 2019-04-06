const fs = require('fs')
// const convertBase = require('./convertBase')

// (1) Read file
var fileContent = '// Failed to create file'
console.log('Reading file...')
fileContent = fs.readFileSync('./lib/langutil.dev.js', 'utf-8')
console.log('Finished reading...')

// (2) Store docs
const docs = fileContent.match(/\/(\*{1,2})(\n.{1,}){1,}\*\/\n/)[0]

// (3) Delete everything below the `inspect` object
fileContent = fileContent.split(/const\sinspect\s=\s{/)[0]

// (4) Replace code parts

const replacers = [

    // Block comments
    { regex: /\/(\*{1,2})(\n.{1,}){1,}\*\/\n/gi, newString: '' },

    // Line comments
    { regex: /(\s{0,4}[^:])\/\/.{1,}/gim, newString: '' },

    // Spacing before and after symbols: +, -, =, ===, <, >, =>, else, catch
    { regex: /\s\?\s/g, newString: '?' },
    { regex: /\s\+\s/g, newString: '+' },
    { regex: /\s-\s/g, newString: '-' },
    { regex: /\s\*\s/g, newString: '*' },
    { regex: /\s\/\s/g, newString: '/' },
    { regex: /\s=\s/g, newString: '=' },
    { regex: /\s===\s/g, newString: '===' },
    { regex: /\s<\s/g, newString: '<' },
    { regex: /\s>\s/g, newString: '>' },
    { regex: /\s=>\s/g, newString: '=>' },
    { regex: /\selse\s(?!\if)/g, newString: 'else' },
    { regex: /\scatch\s/g, newString: 'catch' },

    // Spaces between if, for, try, ) { brackets
    { regex: /if\s\(/g, newString: 'if(' },
    { regex: /for\s\(/g, newString: 'for(' },
    { regex: /try\s{/g, newString: 'try{' },
    { regex: /\)\s{/g, newString: '){' },

    // Remove extra whitespaces after commas, colons and semicolons
    { regex: /,\s/g, newString: ',' },
    { regex: /;\s/g, newString: ';' },
    { regex: /:\s/g, newString: ':' },

    // Rename function arguments
    { regex: /ARG_autoDetect/g, newString: 'a' },
    { regex: /ARG_casing/g, newString: 'c' },
    { regex: /ARG_callback/g, newString: 'ck' },
    { regex: /VAR_casingFunc/g, newString: 'cf' },
    { regex: /ARG_dictionary/g, newString: 'd' },
    { regex: /ARG_fallbackLanguage/g, newString: 'f' },
    { regex: /VAR_formattedDictionary/g, newString: 'fd' },
    { regex: /ARG_keyword/g, newString: 'k' },
    { regex: /ARG_language/g, newString: 'l' },
    { regex: /ARG_length/g, newString: 'lg' },
    { regex: /ARG_paramArray/g, newString: 'p' },
    { regex: /ARG_pattern/g, newString: 'pt' },
    { regex: /ARG_stringWithFormat/g, newString: 's' },
    { regex: /VAR_styleFunc/g, newString: 'sf' },
    { regex: /ARG_transform/g, newString: 't' },
    { regex: /ARG_value/g, newString: 'v' },
    { regex: /ARG_localizations/g, newString: 'z' },

    // Rename CONFIG variables
    { regex: /CONFIG_LANGUAGE/g, newString: 'c1' },
    { regex: /CONFIG_DICTIONARY/g, newString: 'c2' },
    { regex: /CONFIG_INITBYLANG/g, newString: 'c3' },
    { regex: /CONFIG_ISAUTO/g, newString: 'c4' },

    // Rename BASE functions
    { regex: /BASE_setLanguage/g , newString: 'f1' },
    { regex: /BASE_localize/g , newString: 'f2' },
    { regex: /BASE_getAutoLanguage/g , newString: 'f3' },
    { regex: /BASE_getAllKwordAndDefLanguages/g , newString: 'f4' },
    { regex: /BASE_capitalizeFirstLetter/g , newString: 'f5' },
    { regex: /BASE_getRandomString/g , newString: 'f6' },
    { regex: /BASE_stringWithParams/g , newString: 'f7' },
    { regex: /BASE_setDictionary/g , newString: 'f8' },

    // Remove extra whitespaces (or restore line breaks)
    { regex: /\s{2,}/g, newString: '\n' },

]

for (var i = 0; i < replacers.length; i++) {
    console.log('Replacing code fragments ' + (i + 1) + ' of ' + replacers.length + '...')
    const { regex, newString } = replacers[i]
    fileContent = fileContent.replace(regex, newString)
}

// Export minified file
fileContent = docs + '\n' + fileContent
fs.writeFile('./lib/langutil.min.new.js', fileContent, function (error, data) {
    if (error) {
        console.log('ERROR: ', error)
    } else {
        console.log('Succesfully minified! You may now proceed to the manual minification of the file. ')
    }
})


