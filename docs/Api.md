# Table of Contents
1. [Functions](#-1.-Functions)
    * [init](##-`init`)
    * [setLanguage](##-`setLanguage`)
    * [createKey](##-`createKey`)
    * [localize](##-`localize`)
    * [localizeWith](##-`localizeWith`)
    * [isAuto](##-`isAuto`)
    * [logs](##-`logs`)
        * [show](###-`show`)
        * [hide](###-`hide`)
        * [focus](###-focus`)
2. [Additions](#-2.-Additions)
    * [Localizable](##-`Localizable`)
    * [detectLanguage](##-`detectLanguage`)
3. [Interfaces](#-3.-Interfaces)
    * [Keyword](##-`Keyword`)
    * [LocalizeWithProps](##-`LocalizeWithProps`)
    * [LocalizableLanguages](##-`LocalizableLanguages`)
4. [Types](#-4.-Types)
    * [LocalizableCasings](##-`LocalizableCasings`)
    * [LanguageCodes](##-`LanguageCodes`)
5. [Appendix](#-5.-Appendix)
    * [Language List](##-Language-List)

## Note
You may encounter some `unknown` data types below. But in reality, it's not all the mysterious. The `unknown` type is very similar to the `any` type.

> TypeScript 3.0 introduces a new top type unknown. unknown is the type-safe counterpart of any. Anything is assignable to unknown, but unknown isn’t assignable to anything but itself and any without a type assertion or a control flow based narrowing. Likewise, no operations are permitted on an unknown without first asserting or narrowing to a more specific type.<br/><br/>***Source:*** [***typescriptlang.org***](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)

<br/><hr/>
<br/>

# 1. Functions

_Note: Parameters with a trailing question mark (Eg: `param?`) are optional._

<br/>

## `init`
Use this function to initialize langutil with a dictionary and language. This function must be called first in order for your localizations to take effect.

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| `dictionary` | The object storing all your localizations. | `Array<`[`Keyword`](##-`Keyword`)`>` or `object` | |
| `language` | Refer to `setLanguage` | [`LanguageCodes`](##-`LanguageCodes`) | |
| `auto?` | Refer to `setLanguage` | `boolean` | `false` |
<br/>

_(This function does not return any values.)_

<br/>

***Examples:***

    import dictionary from './dictionary'

    langutil.init(dictionary, 'en')
    langutil.init(dictionary, 'en', false)
    langutil.init(dictionary, 'en', true)
    // All syntaxes above are valid

<br/>

## `setLanguage`
Allows the prefered language to be changed during runtime such as when switching between languages in a preference page. By default, this function is triggered you call the `init` function.

| Parameter  | Description | Type | Default Value |
| --- | --- | --- | --- |
| `language` | The language in which your content will be displayed. | [`LanguageCodes`](##-`LanguageCodes`) | |
| `auto?` | Should the device attempt to figure out the user's language? if it fails, `language` will be used as fallback instead. | `boolean` | `false` |
<br/>

_(This function does not return any values.)_

<br/>

The way auto language detection works in React Native is slightly different. It will be explained in [another section](##-`detectLanguage`) of this documentation.

<br/>

***Examples:***

    // The basic method
    langutil.setLanguage('en')

    // Set language with auto detection
    langutil.setLanguage('zh-cn', false)

    // For such scenarios, be sure to have
    // a language called "unicorn" in your dictionary
    // However, auto detect will not be able to make use of this language because is not one of the listed languages by ISO.
    langutil.setLanguage('unicorn', true)
<br/>

## `createKey`
Allows you to define your dictionary by keyword.

| Parameter  | Description | Type |
| --- | --- | --- |
| `keyword` | A plain string that should be able to reflect a brief or partial meaning of the localized string. | `string` |
| `localizations` | The translations. | `object` |
<br/>

| Returns | Type |
| --- | --- |
| A Keyword object. | [`Keyword`](##-`Keyword`) |
<br/>

***Examples:***

    // dictionary.js

    // Method 1: Defined by languages
    export default {
        "en": {
            "HELLO_NAME": "Hello, %p. ",
            "GOODBYE": "Goodbye"
        },
        "zh-cn": {
            "HELLO_NAME": "%p，你好。",
            "GOODBYE": "再见"
        }
    }

    // Method 2: Defined by keywords
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

## `localize`
Maps a keyword to its localized value.

| Parameter  | Description | Type |
| --- | --- | --- |
| `keyword` | A short string representing the localized value. | `string` |
| `paramArray?` | There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead. | `Array<unknown>` |
<br/>

| Returns | Type |
| --- | --- |
| The localized value. | `unknown` |
<br/>

***Examples:***

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

## `localizeWith`
Maps a keyword to its localized value with additional options.

| Parameter  | Description | Type |
| --- | --- | --- |
| `props` | Configuration props for the localization | `object` |
<br/>

| Props | Decription | Type |
| --- | --- | --- |
| `keyword` | A short string representing the localized value. | `string` |
| `paramArray?` | There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead. | `Array<unknown>` |
| `casing?` | Casing styles that will be applied to if the localized value is a string. | [`LocalizableCasings`](##-`LocalizableCasings`) |
| `transform?` | Applies a transformation to the localized value. The localized value (after casing styles are applied) will be pass as a prop for your function. | `Function` |
<br/>

| Returns | Type |
| --- | --- |
| The localized value. | `unknown` |
<br/>

***Example:***

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

## `isAuto`
Checks if auto language detection is enabled.

| Returns | Type |
| --- | --- |
| Usage of auto language detection. | `boolean` |
<br/>

***Example:***

    langutil.isAuto()
<br/>

## `logs`
This object contains 3 functions for all your logging needs.

### `show`
Shows all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.

***Example:***

    langutil.logs.show()
<br/>

### `hide`
Hides all logs from `langutil`. Logs are shown by default in development mode and disabled entirely in production mode regardless of this method.

***Example:***

    langutil.logs.hide()
<br/>

### `focus`
If you have choosen to hide away langutil logs from the beginning and only want to log a portion of it, place your code inside a callback in this function.

The callback which you want langutil to focus its logs on.

| Parameter  | Description | Type |
| --- | --- | --- |
| `callback` | The callback which you want langutil to focus its logs on. | `Function` |
<br/>

| Returns | Type |
| --- | --- |
| Whether the callback was sucessful or not. | `boolean` |
<br/>

***Valid Example:***

    let localizedString
    langutil.logs.focus(()=>{
        localizedString = langutil.localizeWith({
            keyword: "HELLO_PARAM",
            paramArray: ["World"]
        })
    })
<br/>

# 2. Additions
Additions can be imported separately only when needed. As of now, there are two addition packs: one for [React](https://reactjs.org) and one for [React Native](https://facebook.github.io/react-native/).

<br/>

## `Localizable`
A wrapper component for rendering HTML or custom React elements as well as `<Text/>` in React Native.

| Props | Decription | Type | Used in React | Used in React Native |
| --- | --- | --- | --- | --- |
| `keyword` | A short string representing the localized value. | `string` | Yes | Yes |
| `paramArray?` | There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead. | `Array<unknown>` | Yes | Yes |
| `casing?` | Casing styles that will be applied to if the localized value is a string. | [`LocalizableCasings`](##-`LocalizableCasings`) | Yes | Yes |
| `transform?` | Applies a transformation to the localized value. The localized value (after casing styles are applied) will be pass as a prop for your function. | `Function` | Yes | Yes |
| `renderAs?` | Specify which type of HTML/React element you would like your localizations to be rendered into. By default it is rendered as a `<span>`. | `unknown` | Yes | **No** |
<br/>

***Examples:***

    // --- REACT ---
    import React from 'react'
    import { Localizable } from 'langutil/react-additions'

    export default function MyScreen() {
        return (
            <div>
                <Localizable renderAs="h1" keyword="WELCOME_TO_MY_PAGE">
                <Localizable renderAs="p" keyword="LOREM_IPSUM">
            </div>
        )
    }
<br/>

    // --- REACT NATIVE ---
    import React from 'react'
    import { StyleSheet, View } from 'react-native'
    import { Localizable } from 'langutil/native-additions'

    export default function MyScreen() {
        return (
            <View>
                <Localizable keyword="WELCOME_TO_MY_PAGE" style={styles.title}>
                <Localizable keyword="LOREM_IPSUM" style={styles.content}>
            </View>
        )
    }

    const styles = StyleSheet.create({
        title: {
            fontSize: 32,
            fontWeight: 'bold'
        },
        content: {
            fontSize: 16
        }
    })
<br/>

## `detectLanguage`
Detect language in _(and only for)_ React Native.

***Example:***

    import { init } from 'langutil'
    import dictionary from './dictionary'
    import { detectLanguage } from 'langutil/native-additions'

    // ❌ This will not work
    init(dictionary, 'en', true)

    // ✅ This will work
    init(dictionary, 'en', detectLanguage)
<br/>

# 3. Interfaces

## `Keyword`

| Parameter | Description | Type |
| --- | --- | --- |
| `keyword` | The keyword for localization. | `string` |
| `localizations` | The translations of the keyword in each language. | [`LocalizableLanguages`](##-`LocalizableLanguages`) |
<br/>

## `LocalizeWithProps`

| Parameter | Description | Type |
| --- | --- | --- |
| `keyword` | The keyword for localization. | `string` |
| `paramArray?` | An array of parameters that can be passed into the localization. | `Array<unknown>` |
| `casing?` | Casing styles that will be applied to if the localized value is a string. | [`LocalizableCasings`](##-LocalizableCasings) |
| `transform?` | Applies a transformation to the localized value. | `Function` |
<br/>

## `LocalizableLanguages`
| Parameter | Description | Type |
| --- | --- | --- |
| `"af"` | Afrikaans | `string` |
| `"sq"` | Albanian | `string` |
| `"ar-sa"` | Arabic (Saudi Arabia) | `string` |
| ... | ... | `string` |


Please refer to [Language List](##-Language-List) in the Appendix for a complete list of language and their codes.

<br/>

# 4. Types

## `LocalizableCasings`
* `"lowercase"`
* `"localeLowercase"`
* `"uppercase"`
* `"localeUppercase"`
* `"titleCase"`
* `"sentenceCase"`

<br/>

## `LanguageCodes`
* `"af"`
* `"sq"`
* `"ar-sa"`
* ... _(and so on)_

Please refer to [Language List](##-Language-List) in the Appendix for a complete list of language codes.

<br/>

# 5. Appendix

## Language List

| | Language | Code |
| --- | --- | --- |
| **A** | Afrikaans | `"af"` |
| | Albanian | `"sq"` |
| | Arabic (Saudi Arabia) | `"ar-sa"` |
| | Arabic (Iraq) | `"ar-iq"` |
| | Arabic (Egypt) | `"ar-eg"` |
| | Arabic (Libya) | `"ar-ly"` |
| | Arabic (Algeria) | `"ar-dz"` |
| | Arabic (Morocco) | `"ar-ma"` |
| | Arabic (Tunisia) | `"ar-tn"` |
| | Arabic (Oman) | `"ar-om"` |
| | Arabic (Yemen) | `"ar-ye"` |
| | Arabic (Syria) | `"ar-sy"` |
| | Arabic (Jordan) | `"ar-jo"` |
| | Arabic (Lebanon) | `"ar-lb"` |
| | Arabic (Kuwait) | `"ar-kw"` |
| | Arabic (Bahrain) | `"ar-bh"` |
| | Arabic (Qatar) | `"ar-qa"` |
| **B** | Basque | `"eu"` |
| | Bulgarian | `"bg"` |
| | Belarusian | `"be"` |
| **C** | Catalan | `"ca"` |
| | Chinese (Taiwan) | `"zh-tw"` |
| | Chinese (PRC) | `"zh-cn"` |
| | Chinese (Hong Kong SAR) | `"zh-hk"` |
| | Chinese (Singapore) | `"zh-sg"` |
| | Croatian | `"hr"` |
| | Czech | `"cs"` |
| **D** | Danish | `"da"` |
| | Dutch (Standard) | `"nl"` |
| | Dutch (Belgium) | `"nl-be"` |
| **E** | English, English (Caribbean) | `"en"` |
| | English (United States) | `"en-us"` |
| | English (United Kingdom) | `"en-gb"` |
| | English (Australia) | `"en-au"` |
| | English (Canada) | `"en-ca"` |
| | English (New Zealand) | `"en-nz"` |
| | English (Ireland) | `"en-ie"` |
| | English (South Africa) | `"en-za"` |
| | English (Jamaica) | `"en-jm"` |
| | English (Belize) | `"en-bz"` |
| | English (Trinidad) | `"en-tt"` |
| | Estonian | `"et"` |
| **F** | Faeroese | `"fo"` |
| | Farsi | `"fa"` |
| | Finnish | `"fi"` |
| | French (Standard) | `"fr"` |
| | French (Belgium) | `"fr-be"` |
| | French (Canada) | `"fr-ca"` |
| | French (Switzerland) | `"fr-ch"` |
| | French (Luxembourg) | `"fr-lu"` |
| **G** | Gaelic (Scotland) | `"gd"` |
| | Gaelic (Ireland) | `"gd-ie"` |
| | German (Standard) | `"de"` |
| | German (Switzerland) | `"de-ch"` |
| | German (Austria) | `"de-at"` |
| | German (Luxembourg) | `"de-lu"` |
| | German (Liechtenstein) | `"de-li"` |
| | Greek | `"el"` |
| **H** | Hebrew | `"he"` |
| | Hindi | `"hi"` |
| | Hungarian | `"hu"` |
| **I** | Icelandic | `"is"` |
| | Indonesian | `"id"` |
| | Italian (Standard) | `"it"` |
| | Italian (Switzerland) | `"it-ch"` |
| **J** | Japanese | `"ja"` |
| **K** | Korean, Korean (Johab) | `"ko"` |
| **L** | Latvian | `"lv"` |
| | Lithuanian | `"lt"` |
| **M** | Macedonian | `"mk"` |
| | Malaysian | `"ms"` |
| | Maltese | `"mt"` |
| **N** | Norwegian (Bokmal), Norwegian (Nynorsk) | `"no"` |
| **P** | Polish | `"pl"` |
| | Portuguese (Brazil) | `"pt-br"` |
| | Portuguese (Portugal) | `"pt"` |
| **R** | Romanian | `"ro"` |
| | Romanian (Moldavia) | `"ro-mo"` |
| | Russian | `"ru"` |
| | Russian (Moldavia) | `"ru-mo"` |
| **S** | Sami (Lappish) | `"sz"` |
| | Serbian (Cyrillic), Serbian (Latin) | `"sr"` |
| | Slovak | `"sk"` |
| | Slovenian | `"sl"` |
| | Sorbian | `"sb"` |
| | Spanish (Argentina) | `"es-ar"` |
| | Spanish (Guatemala) | `"es-gt"` |
| | Spanish (Costa Rica) | `"es-cr"` |
| | Spanish (Panama) | `"es-pa"` |
| | Spanish (Dominican Republic) | `"es-do"` |
| | Spanish (Mexico) | `"es-mx"` |
| | Spanish (Venezuela) | `"es-ve"` |
| | Spanish (Colombia) | `"es-co"` |
| | Spanish (Peru) | `"es-pe"` |
| | Spanish (Ecuador) | `"es-ec"` |
| | Spanish (Chile) | `"es-cl"` |
| | Spanish (Uruguay) | `"es-uy"` |
| | Spanish (Paraguay) | `"es-py"` |
| | Spanish (Bolivia) | `"es-bo"` |
| | Spanish (El Salvador) | `"es-sv"` |
| | Spanish (Honduras) | `"es-hn"` |
| | Spanish (Nicaragua) | `"es-ni"` |
| | Spanish (Puerto Rico) | `"es-pr"` |
| | Sutu | `"sx"` |
| | Swedish | `"sv"` |
| | Swedish (Finland) | `"sv-fi"` |
| **T** | Thai | `"th"` |
| | Tsonga | `"ts"` |
| | Tswana | `"tn"` |
| | Turkish | `"tr"` |
| **U** | Ukrainian | `"uk"` |
| | Urdu | `"ur"` |
| **V** | Venda | `"ve"` |
| | Vietnamese | `"vi"` |
| **X** | Xhosa | `"xh"` |
| **Y** | Yiddish | `"ji"` |
| **Z** | Zulu | `"zu"` |
<br/>