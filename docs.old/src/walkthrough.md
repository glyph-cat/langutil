# Walkthrough
1. [Project Setup](##-Project-Setup)
2. [Basic Usage](##-Basic-Usage)
3. [Switching Languages](##-Switching-Languages)
4. [Auto-detect Language](##-Auto-detect-Language)
5. [Param, Casing & Transformation](##-Param,-Casing-&-Transformation)
6. [Usage in React](##-Usage-in-React)

<br/>

## Project Setup

In `App.js` or `index.js`:

    import langutil from 'langutil'
    import dictionary from './dictionary'
    langutil.init(dictionary, 'en')

The dictionary can be structured either by **language** or **keywords**. `langutil` automatically recognizes which method you're using so no extra parameters or fancy functions (such as `createKey()`) are needed. Note that keywords should always be written in MACRO_CASE.

<br/>

Example of `dictionary.json` structured by language:

    {
        "en": {
            "HELLO": "Hello",
            "FOO": "Foo"
        },
        "zh": {
            "HELLO": "哈咯"
            "FOO": "胡"
        }
    }

<br/>

Example of `dictionary.json` structured by keywords:

    {
        "HELLO": {
            "en": "Hello"
            "zh": "哈咯"
        },
        "FOO": {
            "en": "Foo"
            "zh": "胡"
        }
    }

<br/>

## Basic Usage

The example below is based on the dictionary from the previous section.

    import { localize } from 'langutil'
    localize('HELLO') // Output: Hello

<br/>

## Switching Languages

To switch between languages, call the `setLanguage()` method.

    import { localize, setLanguage } from 'langutil'
    localize('HELLO') // Output: Hello
    setLanguage('zh')
    localize('HELLO') // Output: 哈咯

<br/>

    <select>
        <option onClick={() => { setLanguage('en')} }>
            English
        </option>
        <option onClick={() => { setLanguage('zh')} }>
            Chinese
        </option>
    </select>

<br/>

## Auto-detect Language

For web browsers:

    import { setLanguage, AUTO_DETECT } from 'langutil'
    setLanguage('en', AUTO_DETECT)
    // 'en' will be used if auto-detect fails in this example

<br/>
For React Native:

    import { setLanguage } from 'langutil'
    import { AUTO_DETECT } from 'langutil/native-additions'
    setLanguage('zh', AUTO_DETECT)
    // 'zh' will be used if auto-detect fails in this example

<br/>

## Param, Casing & Transformation

You can make your localizations dynamic by passing in parameters, format it with casing styles or apply custom transformations.

<br/>

Assuming that this dictionary is used:

    {
      en: {
        WELCOME_USER_ARR: 'Welcome, %p.',
        WELCOME_USER_OBJ: 'Welcome, {:user}. You have logged in for {:count} days straight.',
        ESCAPE: 'This is how you escape %%p and {::item}.'
        TITLE: 'this is a title',
      }
    }

<br/>

This is how you can implement these advanced features:

    // Applying param arrays
    localize('WELCOME_USER_ARR', ['Adam'])
    // Output: Welcome, Adam.

    // Applying param objects
    localize('WELCOME_USER_OBJ', { user: 'Belle', count: 3 })
    // Output: Welcome, Belle. You have logged in for 3 days straight.

    // Escaping placeholders
    localize('ESCAPE')
    // Output: This is how you escape %%p and {::item}.

    // Applying casing styles
    localize('WELCOME_USER_OBJ', { user: 'Cain' }, 'uppercase') // Output: WELCOME, CAIN.

    // Applying transformations
    const transformer = value => value.replace(/aeiou/gi, '')
    localize('WELCOME_USER_OBJ', { user: 'Dave' }, 'uppercase', transformer)
    // Output: WLCM, DV.

    // Alternative syntax - for when you only need certain features, skipping the parameters in between
    localize({ keyword: 'TITLE', casing: 'titlecase' })
    // Output: This Is A Title

<br/>

## Usage in React

To ensure your components reflect the correct localization whenever `setLanguage()` is called, wrap them inside `withLang()`.

    import React from 'react'

    const Greeter = ({ name }) => {
        return (
            <p>{localize(WELCOME_USER_OBJ, { user: name })}</p>
        )
    }

    export default withLang(Greeter)

<br/>
