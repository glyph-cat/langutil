const DEV_langutil = require('../lib/langutil.dev')
test('Auto detect language (DEV)', ()=>{
    DEV_langutil.init([
        DEV_langutil.createKey("HELLO", {
            "en": "Hello"
        })
    ], "en", true)
    const output = DEV_langutil.getLanguage()
    expect(typeof output).toBe('string')
})

const MIN_langutil = require('../lib/langutil.min')
test('Auto detect language (DEV)', ()=>{
    MIN_langutil.init([
        MIN_langutil.createKey("HELLO", {
            "en": "Hello"
        })
    ], "en", true)
    const output = MIN_langutil.getLanguage()
    expect(typeof output).toBe('string')
})