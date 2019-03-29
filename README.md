[![NPM](https://nodei.co/npm/langutil.png)](https://nodei.co/npm/langutil/) [![Build Status](https://travis-ci.com/chin98edwin/langutil.svg?branch=master)](https://travis-ci.com/chin98edwin/langutil)

Langutil is a localizing tool for JavaScript. In fact, it is made up of only one file and does not have any dependencies. It is packed with several powerful and flexible functions for you to localize your app. Keep on reading to get started.

## Top Features

* **☝️ Everything in one file**<br/>The implementation comes in just one file and is free of dependencies.
* **📖 Powerful dictionary inspection tool**<br/>Get notified about any languages or localizations that you may have missed out in your dictionary.
* **⚡️ Dynamic Localizations**<br/>Pass an array of parameters and have them swapped into the placeholders of your localizations.
* **💫 Very, Very Flexible output values**<br/>You can set anything as the output localization. Yes, you got that right. Numbers, functions, images, boolean values... basically any data type that works in JavaScript. You probably wouldn't need all this flexibilty... but hey, it just works!
* **🦄 Apply Transformation to your Localizations**<br/>Apply casing styles such as **UPPER CASE**, **lower case**, **Title Case** or **Sentence case**. You can even define your own transformations with a custom function!

<br/>

# Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Update Logs](#update-logs)
<br/>

# Installation
In your project's directory, run the command below:

**Using Node Package Manager (NPM):**

    npm install langutil

**Using Yarn:**

    yarn add langutil

# Usage
Below is a basic working example:

    import langutil, { createKey } from 'langutil'

    const dictionary = [
        createKey('HELLO'), {
            en: 'Hello',
            zh: '哈咯'
        }
    ]

    langutil.init(dictionary, 'en')
    const localizedString = langutil.localize('HELLO')
    console.log(localizedString) // Output: Hello

    // Switching to other languages
    langutil.setLanguage('zh-cn')
    console.log(langutil.localize('HELLO')) // Output: 哈咯

*NOTE: The dictionary above is just an example. In an actual project, the dictionary content would be much larger, hence it is advisable to save it as a separate JavaScript file and import it instead.*
<br/>

# Methods
1. [`init`](##-`init(dictionary,-language,-autoDetect?):-void`)
2. [`setLanguage`](##-`setLanguage(language,-autoDetect?):-void`)
3. [`createKey`](##-`createKey(keyword,-localizations):-Keyword`)
4. [`localize`](##-`localize(keyword,-paramArray?):-string`)
4. [`localizeWith`](##-`localizeWith({-keyword,-paramArray?,-casing?,-transform?-}):-unknown`)
5. [`logs.show`](##`logs.show()`)
6. [`logs.hide`](##`logs.hide()`)
7. [`hideLogs`](##-`hideLogs()`)

## `init(dictionary, language, autoDetect?): void`
This initializes langutil with a dictionary and language.
* **`dictionary: (Array<Keyword>|Object)`**<br/>The object storing all your localizations.
* **`language: (string)`**<br/>Refer to `setLanguage()`
* **`autoDetect?: (boolean)`**<br/>Refer to `setLanguage()`

***Valid Examples:***

    langutil.init(dictionary, 'en')
    langutil.init(dictionary, 'en', false)
    langutil.init(dictionary, 'en', true)

<br/>

## `setLanguage(language, autoDetect?): void`
Allows the prefered language to be changed during runtime such as when switching between languages in a preference page.
* **`language: (string)`**<br/>The language in which your content will be displayed. The language code that you provided here has to be in your dictionary too. You're free to use other strings to represent the languages in your dictionary. But we encourage you to use ISO language codes in order for your localizations to work with langutil's auto-detect feature.
* **`autoDetect?: (boolean)`**<br/>Optional. This only works for browsers for now. Set it to `true` to let the computer figure out the client's browser language. The `language` parameter will be used as a fallback value if auto-detection fails.

***Valid Examples:***

    langutil.setLanguage('en')
    langutil.setLanguage('en', false)
    langutil.setLanguage('en', true)
<br/>

## `createKey(keyword, localizations): Keyword`
Helps you create keywords for your dictionary.
* **`keyword: (string)`**<br/>A plain string that should be able to reflect a brief or partial meaning of the localized string.
* **`localizations(object): `** The translations.

*Example:*

    // Dictionary.js
    import { createKey } from 'langutil'

    export default [
        createKey('HELLO_NAME', {
            en: 'Hello, %p. ',
            'zh-cn': '%p，你好。'
        }),
        createKey('GOODBYE', {
            en: 'Goodbye',
            'zh-cn': '再见'
        })
    ]

***NOTE:***
* Use CAPITALIZED_SNAKE_CASE for your keywords to avoid ambiguation. Valid examples: `'HELLO'`, `'HELLO_WORLD'`, `'ABOUT_PAGE_PARAGRAPH_3'`.
* If you need langutil to output "%p" as a string, use `%%p` in the dictionary instead.

<br/>

## `localize(keyword, paramArray?): unknown`
Maps a keyword to its localized value with additional options.
* **`keyword: (string)`**<br/>A short string representing the localized value.
* **`paramArray?: (Array<unknown>)`**<br/>Optional. There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead.

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

## `localizeWith({ keyword, paramArray?, casing?, transform? }): unknown`
Maps a keyword to its localized value with additional options.
* **`keyword: (string)`**<br/>A short string representing the localized value.
* **`paramArray?: (Array<unknown>)`**<br/>Optional. There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead.
* **`casing: (localizableCasings)`**<br/>Casing styles that will be applied to if the localized value is a string.
`localizableCasings` should be one of `"lowercase"`, `"localeLowercase"`, `"uppercase"`, `"localeUppercase"`, `"titleCase"`, `"sentenceCase"`.
* **`transform: (Function)`**<br/>Applies a transformation to the localized value. The localized value (after casing styles are applied) will be pass as a prop for your function.

***Valid Examples:***
| Keyword             | Localization     |
| ------------------- | ---------------- |
| `HELLO_WORLD_PARAM` | `Hello world %p` |

    langutil.localizeWith({
        keyword: 'HELLO_WORLD_PARAM',
        paramArray: ['foo bar'],
        casing: 'upperCase',
        transform: (value)=>{
            // Transformation that removes all vowels
            return value.replace(/[AEIOU]/g, '')
        }
    })

    // Output: HLL WRLD F BR

<br/>

## `logs.show()`
Shows all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.
<br/>

## `logs.hide()`
Hides all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.
<br/>

## `hideLogs()`
***NOTE: To be removed entirely by June 2019. Use `langutil.logs.hide()` or `langutil.logs.show()` instead***<br/>
Call this method to disable logs from langutil. Any langutil methods that are called after this will no longer show logs and warnings.


<br/>
<hr/>

# Update Logs
**[Click here to read the complete update history](https://github.com/chin98edwin/langutil/blob/master/UpdateHistory.md)**
<br/><br/>

<hr/>
If you liked my project, consider supporting me on PayPal :)

[![Imgur](https://i.imgur.com/txNa9BC.png)](https://www.paypal.me/chin98edwin)
<hr/>

[Back to Table of Contents](#table-of-contents)