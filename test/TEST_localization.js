const task = require('./framework').task;
const langutil = require('../index');
const createKey = langutil.createKey;

const dictionary_ByLang = {
    "english": {
        "HELLO": "Hello",
        "WORLD": "World",
        "HELLO_PARAM_WORLD_PARAM_FOO": "Hello %p, world %p, foo. ",
        "FOO": "foo",
        "BAR": "bar",
        "PARAM_ESCAPE": "This %p is a placeholder, but this %%p and this %q are not. This %p is another placeholder. "
    },
    "chinese_s": {
        "HELLO": "哈咯",
        "WORLD": "世界",
        "HELLO_PARAM_WORLD_PARAM_FOO": "哈咯 %p, 世界 %p, 胡。",
        "FOO": "胡",
        "BAR": "巴",
        "PARAM_ESCAPE": "这 %p 是一个占位符，但这个 %%p 和这个 %q 不是。这 %p 又是另一个占位符。"
    },
    "no_lang": {
        // Nothing here :3
    }
};

const dictionary_byKey = [
    createKey('GOOD_MORNING', {
        "en": "Good morning",
        "ja": "お早うございます",
        "ms": "Selamat Pagi",
        "zh-cn": "早安",
    }),
    createKey('MEOW', {
        "en": "Meow",
        "ja": "にゃ",
        "ms": "Miao",
        "zh-cn": "喵",
    }),
]

langutil.init(dictionary_ByLang, 'english', false);

module.exports = [

    // ————— Basic Tests —————
    task({
        title: 'Test with English',
        description: 'Test for `english` dictionary, localize() should return the English localization. ',
        expectedValue: 'Hello',
        callback: ()=>{
            return langutil.localize('HELLO')
        },
    }),
    task({
        title: 'Test with Simplified Chinese',
        description: 'Test for `chinese_s` dictionary, localize() should return the Simplified Chinese localization. ',
        expectedValue: '哈咯',
        callback: ()=>{
            langutil.setLanguage('chinese_s');
            return langutil.localize('HELLO');
        },
    }),
    task({
        title: 'Test with `no_lang`, a defined language but with no localizations',
        description: 'Test for `no_lang` dictionary, localize() should return the keyword itself since it is not defined. ',
        expectedValue: '_HELLO_',
        callback: ()=>{
            langutil.setLanguage('abc');
            return langutil.localize('HELLO');
        },
    }),
    task({
        title: 'Test with `abc`, an undefined language',
        description: 'Test for `no_lang` dictionary, localize() should return the keyword itself since it is not defined.',
        expectedValue: '_HELLO_',
        callback: ()=>{
            langutil.setLanguage('abc');
            return langutil.localize('HELLO');
        },
    }),

    // ————— Language Switching Tests —————
    task({
        title: 'Test switching between languages',
        description: 'Test for `no_lang` dictionary, localize() should return the keyword itself since it is not defined. ',
        expectedValue: ['World', '世界'],
        callback: ()=>{
            langutil.setLanguage('english');
            var toTest1 = langutil.localize('WORLD');
            langutil.setLanguage('chinese_s');
            var toTest2 = langutil.localize('WORLD');
            return [toTest1, toTest2]
        },
    }),

    // ————— ParamArray Tests —————
    task({
        title: 'Test localizing with parameters — Just enough',
        description: 'localize() should return localized string with all parameters swapped in accurately. ',
        expectedValue: 'Hello meow, world 32, foo. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', ['meow', 32]);
        },
    }),
    task({
        title: 'Test localizing with parameters — Extraneous',
        description: 'localize() should return localized string with required parameters swapped in. ',
        expectedValue: 'Hello meow, world 32, foo. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', ['meow', 32, true]);
        },
    }),
    task({
        title: 'Test localizing with parameters — Insufficient',
        description: 'localize() should return localized string with only one parameter swapped in. ',
        expectedValue: 'Hello meow, world , foo. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', ['meow']);
        },
    }),
    task({
        title: 'Test localizing with parameters — Wrong data type',
        description: 'localize() should return localized string with no parameters swapped in at all. ',
        expectedValue: 'Hello , world , foo. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', true); // It should be an array
        },
    }),

    // ————— ParamArray Tests with Escaped Character —————
    task({
        title: 'Test localizing with parameters and escaped character — Just enough',
        description: 'localize() should return localized string with all parameters swapped in accurately and maintain the escaped character `%%p` as `%p`. ',
        expectedValue: 'This meow is a placeholder, but this %p and this %q are not. This 32 is another placeholder. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('PARAM_ESCAPE', ['meow', 32]);
        },
    }),
    task({
        title: 'Test localizing with parameters and escaped character — Extraneous',
        description: 'localize() should return localized string with required parameters swapped in and maintain the escaped character `%%p` as `%p`. ',
        expectedValue: 'This meow is a placeholder, but this %p and this %q are not. This 32 is another placeholder. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('PARAM_ESCAPE', ['meow', 32, true]);
        },
    }),
    task({
        title: 'Test localizing with parameters and escaped character — Insufficient',
        description: 'localize() should return localized string with only one parameter swapped in and maintain the escaped character `%%p` as `%p`. ',
        expectedValue: 'This meow is a placeholder, but this %p and this %q are not. This  is another placeholder. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('PARAM_ESCAPE', ['meow']);
        },
    }),
    task({
        title: 'Test localizing with parameters and escaped character — Wrong data type',
        description: 'localize() should return localized string with no parameters swapped in at all but maintain the escaped character `%%p` as `%p`. ',
        expectedValue: 'This  is a placeholder, but this %p and this %q are not. This  is another placeholder. ',
        callback: ()=>{
            langutil.setLanguage('english');
            return langutil.localize('PARAM_ESCAPE', true); // It should be an array
        },
    }),
    task({
        title: 'Localization by keyword (Valid)',
        description: 'Test for `en` dictionary, localize() should return the English localization. ',
        expectedValue: 'Good morning',
        callback: ()=>{
            langutil.init(dictionary_byKey, "en");
            return langutil.localize('GOOD_MORNING')
        }
    }),
    task({
        title: 'Localization by keyword (Invalid)',
        description: 'Test for `en` dictionary, localize() should return the English localization. ',
        expectedValue: '_GOOD_NIGHT_',
        callback: ()=>{
            return langutil.localize('GOOD_NIGHT')
        }
    })
];