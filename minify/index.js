const fs = require('fs')
const convertBase = require('./convertBase')

throw Error('This module is still experimental! Uncomment this code you wish to unleash massive power of destruction. ')

var fileContent = '// Failed to create file'
console.log('Reading file...')
try {
    fileContent = fs.readFileSync('./lib/langutil.dev.js', 'utf-8')
} catch (error) {
    console.error(error)
}
fs.closeSync(2)
console.log('Finished reading')


try {
    var rgx = {
        emptyBlock: /\/\*\*\//gi,
        blockComment: /\/(\*{1,2})(\n.{1,}){1,}\*\//gi,
        lineComment: /\/\/\s{0,}.{0,}/gi,
        inspect: /const inspect = {(.||\n){0,}}/gim
    }
} catch (error) {
    console.log(error)
}

// Extract documentation info
const DOCS = fileContent.match(rgx.blockComment)[0]
console.log('Fetching main documentation block...')

// Remove all empty blocks
fileContent = fileContent.replace(rgx.emptyBlock, '')
console.log('Removing empty block...')

// Remove all block comments
fileContent = fileContent.replace(rgx.blockComment, '')
console.log('Removing block comments...')

// Remove all line comments
fileContent = fileContent.replace(rgx.lineComment, '')
console.log('Removing line comments...')

// Remove inspection function block
fileContent = fileContent.replace(rgx.inspect, '')
console.log('Removing inspection function block...')

// Remove newLines
// fileContent = fileContent.replace(/\n/gi, '')

var i = 0; // Remove unused variables
const unusedCode = [
    // /if \(CONFIG.SHOWLOGS\) {.{1,}}/gim
]
for (i = 0; i < unusedCode.length; i++) {
    fileContent = fileContent.replace(unusedCode[i], '')
}

// Rename variables
const variablesToRename = ['CONFIG_LANGUAGE', 'CONFIG_DICTIONARY', 'CONFIG_INITBYLANG', 'dictionary', 'language', 'autoDetect', 'formattedDictionary', 'currentItem', 'localizeSuccess', 'localizedString']
// , '', '', '', '', '', '', '', '', '', ''
const charset = '_abcdefghklmnopqrstuvwxyzABCDEFGHKLMNOPQRSTUVWXYZ' // i, j, I & J omitted
for (i = 0; i < variablesToRename.length; i++) {
    const replaceRgx = new RegExp(variablesToRename[i], 'g')
    fileContent = fileContent.replace(replaceRgx, convertBase(i+1, 10, charset.length, charset))
}

// try {
//     var converted = convertBase(0, 10, charset.length, charset)
//     console.log('converted: ' + converted)
// } catch (error) {
//     console.log(error)
// }

// Remove whitespaces
// ...

// Remove newLines
// ...

// Export minified file
fileContent = DOCS + '\n' + fileContent
fs.writeFile('./lib/langutil.min.new.js', fileContent, function(error, data) {
    if (error) {
        console.log('ERROR: ', error)
    } else {
        console.log('Succesfully minified') // to path/file.name
    }
})


