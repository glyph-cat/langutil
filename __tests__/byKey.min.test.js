const langutil = require('../lib/langutil.min')
const { createKey } = langutil
const dictionary = [
    createKey("HELLO_WORLD", {
        "en": "Hello world",
        "zh-cn": "哈咯世界"
    }),
    createKey("HELLO_NAME_AND_NAME", {
        "en": "Hello, %p and %p. ",
        "zh-cn": "%p，%p，你们好。"
    }),
    createKey("HELLO_ESCAPED_AND_NAME", {
        "en": "Hello, %%p and %p. ",
        "zh-cn": "%%p，%p，你们好。"
    }),
    createKey("ONE_HUNDRED", {
        "en": 100,
        "zh-cn": 100
    }),
]

langutil.init(dictionary, "en")

const baseImplementation = require('./baseImplementation/min')
baseImplementation()