# Table of Contents
1. [`init`](#-`init`)
2. [`setLanguage`](#-`setLanguage`)
3. [`createKey`](#-`createKey`)
4. [`localize`](#-`localize`)
4. [`localizeWith`](#-`localizeWith`)
5. [`logs.show`](#`logs.show`)
6. [`logs.hide`](#`logs.hide`)
7. [`hideLogs`](#-`hideLogs`)

<br/>

## Note
You may encounter some `unknown` data types below. But in reality, it's not all the mysterious. The `unknown` type is very similar to the `any` type.

> TypeScript 3.0 introduces a new top type unknown. unknown is the type-safe counterpart of any. Anything is assignable to unknown, but unknown isn’t assignable to anything but itself and any without a type assertion or a control flow based narrowing. Likewise, no operations are permitted on an unknown without first asserting or narrowing to a more specific type.<br/><br/>***Source:*** [***typescriptlang.org***](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)

<br/><hr/>
<br/>

# `init`
Use this function to initialize langutil with a dictionary and language. This function must be called first in order for your localizations to take effect. <br/>

**`init(dictionary, language, autoDetect?): void`**
* `dictionary: (Array<Keyword>|Object)`<br/>The object storing all your localizations.
* `language: (string)`<br/>Refer to `setLanguage`
* `autoDetect?: (boolean)`<br/>Refer to `setLanguage`


***Valid Examples:***

    import dictionary from './dictionary'

    langutil.init(dictionary, 'en')
    langutil.init(dictionary, 'en', false)
    langutil.init(dictionary, 'en', true)

<br/>

# `setLanguage`
Allows the prefered language to be changed during runtime such as when switching between languages in a preference page. By default, this function is triggered you call the `init` function. <br/>

**`setLanguage(language, autoDetect?): void`**
* `language: (string)`<br/>The language in which your content will be displayed.
* `autoDetect?: (boolean)`<br/>Optional. This only works in browsers for now. Set it to `true` to let the computer figure out the client's browser language. In case auto-detect fails, `language` will be used as a fallback instead.

***NOTE:*** *The language code that you provide here has to be in your dictionary too. You're free to use other strings to represent the languages in your dictionary. But we encourage you to use ISO language codes in order for your localizations to work with langutil's auto-detect feature.*

***Valid Examples:***

    // The basic method
    langutil.setLanguage('en')

    // Set language with auto detection
    langutil.setLanguage('zh-cn', false)

    // For such scenarios, be sure to have
    // a language called "unicorn" in your dictionary
    langutil.setLanguage('unicorn', true)
<br/>

# `createKey`
Allows you to define your dictionary by keyword.<br/>

**`createKey(keyword, localizations): Keyword`**
* `keyword: (string)`<br/>A plain string that should be able to reflect a brief or partial meaning of the localized string.
* `localizations(object): ` The translations.

***Valid Example:***

    // dictionary.js
    import { createKey } from 'langutil'

    export default [
        createKey("HELLO_NAME", {
            "en": "Hello, %p. ",
            "zh-cn": "%p，你好。"
        }),
        createKey("GOODBYE", {
            "en": "Goodbye",
            "zh-cn": "再见"
        })
    ]

***NOTE:***
* Use CAPITALIZED_SNAKE_CASE for your keywords to avoid ambiguation. Valid examples: `'HELLO'`, `'HELLO_WORLD'`, `'ABOUT_PAGE_PARAGRAPH_3'`.
* If you want to have a "%p" in your output, use "`%%p`" instead.

<br/>

# `localize`
Maps a keyword to its localized value.<br/>

**`localize(keyword, paramArray?): unknown`**

* `keyword: (string)`<br/>A short string representing the localized value.
* `paramArray?: (Array<unknown>)`<br/>Optional. There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead.

***Valid Examples:***
| Keyword               | Localization         |
| --------------------- | -------------------- |
| `HELLO`               | `Hello`              |
| `N_CHARS_LEFT`        | `%p characters left` |
| `HELLO_NAME_AND_NAME` | `Hello, %p and %p.`  |

    langutil.localize('HELLO')
    // Output: Hello

    langutil.localize('N_CHARS_LEFT', [50])
    // Output: 50 characters left

    langutil.localize('HELLO_NAME_AND_NAME', ['Adam', 'Susie'])
    // Output: Hello, Adam and Susie.

<br/>

# `localizeWith`
Maps a keyword to its localized value with additional options.<br/>

**`localizeWith({ keyword, paramArray?, casing?, transform? }): unknown`**

* `keyword: (string)`<br/>A short string representing the localized value.
* `paramArray?: (Array<unknown>)`<br/>Optional. There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead.
* `casing: (localizableCasings)`<br/>Casing styles that will be applied to if the localized value is a string.
Its value should be one of `"lowercase"`, `"localeLowercase"`, `"uppercase"`, `"localeUppercase"`, `"titleCase"`, `"sentenceCase"`.
* `transform?: (Function)`<br/>Applies a transformation to the localized value. The localized value (after casing styles are applied) will be pass as a prop for your function.

***Valid Example:***
| Keyword             | Localization     |
| ------------------- | ---------------- |
| `HELLO_WORLD_PARAM` | `Hello world %p` |

    var text = langutil.localizeWith({
        keyword: 'HELLO_WORLD_PARAM',
        paramArray: ['foo bar'],
        casing: 'upperCase',
        transform: (value)=>{
            // Self defined transformation that removes all vowels
            return value.replace(/[AEIOU]/g, '')
        }
    })

    console.log(text)
    // Output: HLL WRLD F BR

<br/>

# `logs.show`
Shows all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.

***Valid Example:***

    langutil.logs.show()
<br/>

# `logs.hide`
Hides all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.

***Valid Example:***

    langutil.logs.hide()
<br/>

# `hideLogs`
Call this method to disable logs from langutil. Any langutil methods that are called after this will no longer show logs and warnings.

***Valid Example:***

    langutil.logs.show()


***NOTE: This function will be removed by June 2019. Use `langutil.logs.hide()` or `langutil.logs.show()` instead.***
