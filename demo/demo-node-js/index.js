/**
 * @description Demo project showing usage of langutil in Node JS.
 */

const langutil, { localize, localizeWith } = require('langutil')
const dictionary = require('./dictionary')

// (0) Initialize langutil
langutil.init(dictionary, 'en')

// (1) Print your very first Hello World
var hw = localizeWith({ keyword: 'HELLO_WORLD' })
console.log('My first hello world: ' + hw)
// My first hello world: Hello world

// (2) Add casing styles to your output
hw = localizeWith({
    keyword: 'HELLO_WORLD',
    casing: 'UPPERCASE'
})
console.log('Uppercase hello world: ' + hw)
// Uppercase hello world: HELLO WORLD

// (3) Add transformations to your output
hw = localizeWith({
    keyword: 'HELLO_WORLD',
    transform: (value)=>{
        return value.replace(/[aeiou]/g, '')
    }
})
console.log('Transformed hello world: ' + hw)
// Transformed hello world: Hll wrld

// (4) Switch language
langutil.setLanguage('zh-cn')
hw = localizeWith({ keyword: 'HELLO_WORLD' })
console.log('Chinese hello world: ' + hw)
// Chinese hello world: 哈咯世界

// (5) Translations with ParamArray
const reusedFunction = () => {
    return localizeWith({
        keyword: 'HELLO_NAME',
        paramArray: [localize('ALICE')]
        // It is okay to next localizations in localizations
        // But try not to nest too much to maintain readability
    })
}
hw = reusedFunction()
console.log('Foreign output: ' + hw)
// Foreign output: 爱丽丝，你好！

// (6) One last demo with the language switched back to English
hw = reusedFunction()
console.log('English output: ' + hw)
// English output: Hello, Alice!