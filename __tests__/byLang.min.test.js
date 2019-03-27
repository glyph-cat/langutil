const langutil = require('../lib/langutil.min')
const dictionary = {
    "en": {
        "HELLO_WORLD": "Hello world",
        "HELLO_NAME_AND_NAME": "Hello, %p and %p. ",
        "HELLO_ESCAPED_AND_NAME": "Hello, %%p and %p. ",
        "ONE_HUNDRED": 100
    },
    "zh-cn": {
        "HELLO_WORLD": "哈咯世界",
        "HELLO_NAME_AND_NAME": "%p，%p，你们好。",
        "HELLO_ESCAPED_AND_NAME": "%%p，%p，你们好。",
        "ONE_HUNDRED": 100
    }
}

langutil.init(dictionary, "en")

const baseImplementation = require('./baseImplementation/min')
baseImplementation()