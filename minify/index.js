const fs = require('fs')
const convertBase = require('./convertBase')

// throw Error('This module is still experimental! Uncomment this code you wish to unleash massive power of destruction. ')

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
    { regex: /^\/\/.{1,}/gim, newString: '' },

    // Spacing before and after symbols: =, ===, <, >, =>, else, catch
    { regex: /\s(={1,3}|\|\||<|>|=>|else|catch)\s/g, newString: '=' },

    // Spaces between if, for, try, ) { brackets
    { regex: /if\s\(/g, newString: 'for(' },
    { regex: /for\s\(/g, newString: 'if(' },
    { regex: /try\s{/g, newString: 'try{' },
    { regex: /)\s{/g, newString: '){' },

    // Remove extra whitespaces after commas, colons and semicolons
    { regex: /,/g, newString: ',' },
    { regex: /;/g, newString: ';' },
    { regex: /:/g, newString: ':' },

    // CONFIG variables
    { regex: /CONFIG_LANGUAGE/g, newString: 'c1' },
    { regex: /CONFIG_DICTIONARY/g, newString: 'c2' },
    { regex: /CONFIG_INITBYLANG/g, newString: 'c3' },
    { regex: /CONFIG_ISAUTO/g, newString: 'c4' },

]

for (var i = 0; i < replacers.length; i++) {
    console.log('Replacing code fragments ' + (i + 1) + ' of ' + replacers.length + '...')
    const { regex, newString } = replacers[i]
    fileContent = fileContent.replace(regex, newString)
}

// Export minified file
fileContent = DOCS + '\n' + fileContent
fs.writeFile('./lib/langutil.min.new.js', fileContent, function (error, data) {
    if (error) {
        console.log('ERROR: ', error)
    } else {
        console.log('Succesfully minified')
    }
})


