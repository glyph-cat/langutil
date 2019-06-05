const langutil = require('../../lib/langutil.min')

module.exports = function () {

    /* * * * * * * * * * * * * * * * * * * * * * *
     *                    LOG                    *
     * * * * * * * * * * * * * * * * * * * * * * */

    test("logs.hide", () => {
        langutil.logs.hide()
    })

    test("logs.show", () => {
        langutil.logs.show()
    })

    /* * * * * * * * * * * * * * * * * * * * * * *
     *                BASIC TESTS                *
     * * * * * * * * * * * * * * * * * * * * * * */

    test("getLanguage", () => {
        const output = langutil.getLanguage()
        const expectedValue = 'en'
        expect(output).toBe(expectedValue)
    })

    test("getDefinedLanguages", () => {
        const output = langutil.getDefinedLanguages()
        const expectedValue = ['en', 'zh-cn']
        expect(output).toEqual(expectedValue)
    })


    /* * * * * * * * * * * * * * * * * * * * * * *
     *                  LOCALIZE                 *
     * * * * * * * * * * * * * * * * * * * * * * */

    test("localize", () => {
        const output = langutil.localize('HELLO_WORLD')
        const expectedValue = 'Hello world'
        expect(output).toBe(expectedValue)
    })

    test("localize: after setLanguage", () => {
        langutil.setLanguage("zh-cn")
        const output = langutil.localize('HELLO_WORLD')
        const expectedValue = '哈咯世界'
        expect(output).toBe(expectedValue)
    })

    test("localize: language undefined", () => {
        langutil.setLanguage('jp')
        const keyword = 'HELLO_WORLD'
        const output = langutil.localize(keyword)
        const expectedValue = ['_', keyword, '_'].join('')
        expect(output).toBe(expectedValue)
    })

    test("localize: keyword undefined", () => {
        langutil.setLanguage('en')
        const keyword = 'LOREM_IPSUM'
        const output = langutil.localize(keyword)
        const expectedValue = ['_', keyword, '_'].join('')
        expect(output).toBe(expectedValue)
    })

    test("localize: paramArray (Sufficient)", () => {
        const output = langutil.localize('HELLO_NAME_AND_NAME', ['Adam', 'Susie'])
        const expectedValue = 'Hello, Adam and Susie. '
        expect(output).toBe(expectedValue)
    })

    test("localize: paramArray (Insufficient)", () => {
        const output = langutil.localize('HELLO_NAME_AND_NAME', ['Adam'])
        const expectedValue = 'Hello, Adam and . '
        expect(output).toBe(expectedValue)
    })

    test("localize: paramArray (Extraneous)", () => {
        const output = langutil.localize('HELLO_NAME_AND_NAME', ['Adam', 'Susie', 'Jane'])
        const expectedValue = 'Hello, Adam and Susie. '
        expect(output).toBe(expectedValue)
    })

    test("localize: paramArray (invalid type)", () => {
        const output = langutil.localize('HELLO_NAME_AND_NAME', true)
        const expectedValue = 'Hello,  and . '
        expect(output).toBe(expectedValue)
    })

    test("localize: escaped paramArray (Sufficient)", () => {
        const output = langutil.localize('HELLO_ESCAPED_AND_NAME', ['Adam'])
        const expectedValue = 'Hello, %p and Adam. '
        expect(output).toBe(expectedValue)
    })

    test("localize: escaped paramArray (Insufficient)", () => {
        const output = langutil.localize('HELLO_ESCAPED_AND_NAME', [])
        const expectedValue = 'Hello, %p and . '
        expect(output).toBe(expectedValue)
    })

    test("localize: escaped paramArray (Extraneous)", () => {
        const output = langutil.localize('HELLO_ESCAPED_AND_NAME', ['Adam', 'Susie'])
        const expectedValue = 'Hello, %p and Adam. '
        expect(output).toBe(expectedValue)
    })

    test("localize: escaped paramArray (invalid type)", () => {
        const output = langutil.localize('HELLO_ESCAPED_AND_NAME', true)
        const expectedValue = 'Hello, %p and . '
        expect(output).toBe(expectedValue)
    })

    /* * * * * * * * * * * * * * * * * * * * * * *
     *                LOCALIZEWITH               *
     * * * * * * * * * * * * * * * * * * * * * * */

    test("localizeWith", () => {
        const output = langutil.localizeWith({ keyword: 'HELLO_WORLD' })
        const expectedValue = 'Hello world'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: lowerCase", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'lowercase'
        })
        const expectedValue = 'hello world'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: localeLowerCase", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'localeLowercase'
        })
        const expectedValue = 'hello world'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: upperCase", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'uppercase'
        })
        const expectedValue = 'HELLO WORLD'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: localeUpperCase", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'localeUppercase'
        })
        const expectedValue = 'HELLO WORLD'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: titleCase", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'titleCase'
        })
        const expectedValue = 'Hello World'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: sentenceCase", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'sentenceCase'
        })
        const expectedValue = 'Hello world'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: invalid casing", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            casing: 'unicornCase'
        })
        const expectedValue = 'Hello world'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: transform (string)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_WORLD',
            transform: (value) => { return value.replace(/[aeiou]/gi, '') }
        })
        const expectedValue = 'Hll wrld'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: transform (non-string)", () => {
        const output = langutil.localizeWith({
            keyword: 'ONE_HUNDRED',
            transform: (value) => { return value * 2 }
        })
        const expectedValue = 200
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: after setLanguage", () => {
        langutil.setLanguage("zh-cn")
        const output = langutil.localizeWith({ keyword: 'HELLO_WORLD' })
        const expectedValue = '哈咯世界'
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: language undefined", () => {
        langutil.setLanguage('jp')
        const keyword = 'HELLO_WORLD'
        const output = langutil.localizeWith({ keyword: keyword })
        const expectedValue = ['_', keyword, '_'].join('')
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: keyword undefined", () => {
        langutil.setLanguage('en')
        const keyword = 'LOREM_IPSUM'
        const output = langutil.localizeWith({ keyword: keyword })
        const expectedValue = ['_', keyword, '_'].join('')
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: paramArray (Sufficient)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_NAME_AND_NAME',
            paramArray: ['Adam', 'Susie']
        })
        const expectedValue = 'Hello, Adam and Susie. '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: paramArray (Insufficient)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_NAME_AND_NAME',
            paramArray: ['Adam']
        })
        const expectedValue = 'Hello, Adam and . '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: paramArray (Extraneous)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_NAME_AND_NAME',
            paramArray: ['Adam', 'Susie', 'Jane']
        })
        const expectedValue = 'Hello, Adam and Susie. '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: paramArray (invalid type)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_NAME_AND_NAME',
            paramArray: true
        })
        const expectedValue = 'Hello,  and . '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: escaped paramArray (Sufficient)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_ESCAPED_AND_NAME',
            paramArray: ['Adam']
        })
        const expectedValue = 'Hello, %p and Adam. '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: escaped paramArray (Insufficient)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_ESCAPED_AND_NAME',
            paramArray: []
        })
        const expectedValue = 'Hello, %p and . '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: escaped paramArray (Extraneous)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_ESCAPED_AND_NAME',
            paramArray: ['Adam', 'Susie']
        })
        const expectedValue = 'Hello, %p and Adam. '
        expect(output).toBe(expectedValue)
    })

    test("localizeWith: escaped paramArray (invalid type)", () => {
        const output = langutil.localizeWith({
            keyword: 'HELLO_ESCAPED_AND_NAME',
            paramArray: true
        })
        const expectedValue = 'Hello, %p and . '
        expect(output).toBe(expectedValue)
    })

}