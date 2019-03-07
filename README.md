[![NPM](https://nodei.co/npm/langutil.png)](https://nodei.co/npm/langutil/)

Langutil is a localizing tool for JavaScript. In fact, it is made up of only one file and does not have any dependencies. Langutil is packed with four essential functions. <br/> Keep on reading to get started.

1. [Installation](#installation)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Language List](#language-list)
5. [Strengths and Limitations](#strengths-and-limitations)
6. [Update Logs](#update-logs)

# Installation
In your project's directory, run the command below:

    npm install langutil

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
5. [`logs.show`](##`logs.show()`)
6. [`logs.hide`](##`logs.hide()`)
7. [`hideLogs`](##-`hideLogs()`)

## `init(dictionary, language, autoDetect?): void`
This initializes langutil with a dictionary and language.
* **`dictionary: (Array<Keyword>|Object)`**<br/>The dictionary that stores all your localizations.
* **`language: (string)`**<br/>Refer to `setLanguage()`
* **`autoDetect?: (boolean)`**<br/>Refer to `setLanguage()`

***Valid Examples:***

    langutil.init(dictionary, 'en')
    langutil.init(dictionary, 'en', false)
    langutil.init(dictionary, 'en', true)

<br/>

## `setLanguage(language, autoDetect?): void`
Allows the prefered language to be changed during runtime such as when switching between languages in a preference page.
* **`language: (string)`**<br/>The language in which your content will be displayed. The language code that you provided must exist in your dictionary too.
* **`autoDetect?: (boolean)`**<br/>Optional. This only works for browsers for now. Set it to `true` to let the computer figure out the client's browser language. The `language` parameter will be used as a fallback value if auto-detection fails.

***Valid Examples:***

    langutil.setLanguage('en')
    langutil.setLanguage('en', false)
    langutil.setLanguage('en', true)
<br/>

## `createKey(keyword, localizations): Keyword`
Helps you create keywords for your dictionary.
* **`keyword: (string)`**<br/>A plain string that should be able to reflect a brief or partial meaning of the localized string.
* **`localizations(object): `** The translation of the keyword.

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

## `localize(keyword, paramArray?): string`
This is the method that returns the localized strings based on the definitions in your dictionary.
* **`keyword: (string)`**<br/>A simple string that will be mapped to its localized value in the dictionary.
* **`paramArray?: (Array<any>)`**<br/>Optional. There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead.

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

## `logs.show()`
Shows all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.
<br/>

## `logs.hide()`
Hides all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.
<br/>

## `hideLogs()`
***NOTE: To be removed entirely by June 2019. Use `langutil.logs.hide()` or `langutil.logs.show()` instead***<br/>
Call this method to disable logs from langutil. Any langutil methods that are called after this will no longer show logs and warnings.

<br/><br/>

# Language List
You're free to use other strings to represent languages in your dictionary. But in order for your localizations to work in conjunction with langutil's auto-detect feature, we encourage you to use ISO language codes in your dictionary.

<br/>

# Strengths and Limitations

## Strengths
* **Powerful dictionary inspection tool**<br/>Langutil notifies you of any languages or localizations that you may have missed out in your dictionary.
* **Make your localizations dynamic with placeholders**<br/>You can pass in as much variables as you want into your localizations.
* **It's single and independent**<br/>`langutil` comes in one file and does not have any dependencies. So you can even distribute and reuse it by just copying out the source file if you wish with as little hassle as possible.

## Limitations
* **Limited Debugging**<br/>`langutil` cannot inspect each and every one of your project files. If you try to `localize` a non-existed keyword in your code, you will only receive a warning at runtime.
<br/>
<br/>
<hr/>

**[Click here to read the complete update history](https://github.com/chin98edwin/langutil/blob/master/UpdateHistory.md)**

<hr/>
If you liked my project, consider supporting me on PayPal :)

[![Imgur](https://i.imgur.com/txNa9BC.png)](https://www.paypal.me/chin98edwin)
<hr/>
[Back to Table of Contents](#table-of-contents)