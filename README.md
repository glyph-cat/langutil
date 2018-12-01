# Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [The Dictionary](#the-dictionary)
6. [Language List](#language-list)
7. [Strengths and Limitations](#strengths-and-limitations)
8. [Update History](#update-history)

# Introduction
Langutil is a localizing tool for JavaScript. In fact, it is made up of only one file and does not have any dependencies. Langutil is packed with four essential functions. Keep on reading to get started.

<br/>

# Installation
In your project's directory, run the command below:

    npm install langutil

<br/>

# Usage
Below is a basic working example:

    import langutil from 'langutil'

    const dictionary = {
        "english": {
            "HELLO": "Hello",
        },
        "chinese_s": {
            "HELLO": "哈咯",
        }
    }

    langutil.init(dictionary, 'english')

    console.log(langutil.localize('HELLO')) // Output: Hello

    // Switching to other languages
    langutil.setLanguage('chinese_s')
    console.log(langutil.localize('HELLO')) // Output: 哈咯

*NOTE: The dictionary above is just an example. In an actual project, the dictionary content would be much longer, hence it is advisable to save it as a separate JSON file and import it instead.*

<br/>

# Methods

1. [`init(dictionary, language, auto)`](##init(dictionary,-language,-auto))
2. [`setLanguage(language, auto)`](##setLanguage(language,-auto))
3. [`localize(keyword, paramArray)`](##localize(keyword,-paramArray))
4. [`hideLogs()`](##-`hideLogs()`)
<br/>

## `init(dictionary, language, auto)`
This initializes langutil with a dictionary and language. This method must be called before `localize()` can be used. <br/>
* **`dictionary: (Object)`**
The dictionary that stores all your localizations. <br/>
* **`language: (String)`**
The language in which your content will be displayed. The language code that you provided must exist in your dictionary too. <br/>
* **`auto: (Boolean)` [OPTIONAL]**<br/>Set it to `true` to let the computer figure out the client's browser language. In order for auto detection to work properly, the language code in your dictionary should match the ones in our [Language List](#language-list). `language` will be used as the fallback language if auto-detection fails.

***Example:***

    langutil.init(dictionary, 'english')
    langutil.init(dictionary, 'english', false)
    langutil.init(dictionary, 'english', true)
<br/>

## `setLanguage(language, auto)`
Similar to `init()`, but this only sets the language and can be called anytime. This method comes in handy when switching between languages in a preference page.<br/>
* **`language: (String)`**
The language in which your content will be displayed. The language code that you provided must exist in your dictionary too.
* **`auto: (Boolean)` [OPTIONAL]**<br/>Set it to `true` to let the computer figure out the client's browser language. In order for auto detection to work properly, the language code in your dictionary should match the ones in our [Language List](#language-list). `language` will be used as the fallback language if auto-detection fails.

***Example:***

    langutil.setLanguage('english')
    langutil.setLanguage('english', false)
    langutil.setLanguage('english', true)
<br/>

## `localize(keyword, paramArray)`
This is the method that returns the localized strings based on your keywords and language set. <br/>
* **`keyword: (String)`**
A simple string that will be mapped to its localized form in the dictionary.
* **`paramArray: (array)` [OPTIONAL]**
There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead. <br/>

***Example:***

| Keyword               | Localization                      |
| --------------------- | --------------------------------- |
| `HELLO`               | `Hello`                           |
| `N_CHARS_LEFT`        | `%p characters left`              |
| `HELLO_NAME_AND_NAME` | `Hello, %p and %p. `              |

    localize('HELLO')
    // Output: Hello

    localize('N_CHARS_LEFT', [50])
    // Output: 50 characters left

    localize('HELLO_NAME_AND_NAME', ['Adam', 'Susie'])
    // Output: Hello, Adam and Susie.

<br/>

## `hideLogs()`
Use this method to disable logs from langutil. Any langutil methods that are called after this will no longer show logs and warnings. Critical errors will still be thrown.
<br/>

# The Dictionary

The dictionary is where all of your localizations are stored. Let's take a look at a breakdown of the sample dictionary below.

    {
        "english": {
            "HELLO_NAME": "Hello, %p. ",
        }
    }

| Item         | Description                                      |
| ------------ | ------------------------------------------------ |
| `english`    | The language code ([Learn more](#language-list)) |
| `HELLO_NAME` | The keyword for localization                     |
| `Hello, %p`  | The localized string                             |
| `%p`         | Placeholder                                      |

***NOTE:***
* A **keyword** is plain string that should be able to reflect a brief or partial meaning of the localized string. To avoid ambiguation, use uppercase letters only. Underscores and numbers are also allowed but they should not be the first character of the keyword. Examples: `'HELLO'`, `'HELLO_WORLD'`, `'ABOUT_PAGE_PARAGRAPH_3'`.
* If you need langutil to output "%p" as a string, put `%%p` in the dictionary instead.


<br/>

# Language List
You are free to use custom values to represent the languages in your dictionary. For example, you can use `'en'` instead of `'english'` as long as you do so for both your code and dictionary.

But when auto language detection is used, it automatically sets the language with the codes below. To avoid ambiguity and solve problems like differentiating simplified and traditional Chinese, a set of custom language codes that are similar to natural language is used.

|       | Language Codes |
| -----:| ---------------- |
| **A** | `abkhazan`, `achinese`, `acoli`, `adangme`, `adyghe`, `afar`, `afrikaans`, `ainu`, `albanian`, `aleut`, `altai_southern`, `amharic`, `angika`, `arabic`, `aragonese`, `arapaho`, `arawak`, `armenian`, `assamese`, `asturian`, `avaric`, `awadhi`, `azerbaijani` |
| **B** | `balinese`, `bambara`, `bashkir`, `basa`, `basque`, `beja`, `belarusian`, `bemba`, `bengali`, `bosnian`, `bulgarian` |
| **C** | `catalan`, `cebuano`, `chichewa`, `chinese_s`, `chinese_t`, `corsican`, `croatian`, `czech` |
| **D** | `danish`, `dutch` |
| **E** | `english`, `esperanto`, `estonian` |
| **F** | `filipino`,`finnish`, `french`, `frisian` |
| **G** | `galician`, `georgian`, `german`, `greek`, `gujarati` |
| **H** | `haitian_creole`, `hausa`, `hawaiian`, `hebrew`, `hindi`, `hmong`, `hungarian` |
| **I** | `icelandic`, `igbo`, `indonesian`, `irish`, `italian` |
| **J** | `japanese`, `javanese` |
| **K** | `kannada`, `kazakh`, `khmer`, `korean`, `kurdish`, `kyrgyz` |
| **L** | `lao`, `latin`, `latvian`, `lithuanian`, `luxembourgish`|
| **M** | `macedonian`, `malagasy`, `malay`, `malayalam`, `maltese`, `maori`, `mapudungun`, `marathi`, `mongolian`, `myanmar` |
| **N** | `nepali`, `norwegian`|
| **O** | `pashto`, `persian`, `polish`, `portugese`, `punjabi` |
| **R** | `romanian`, `russian` |
| **S** | `samoan`, `scots_gaelic`, `serbian`, `sesotho`, `shona`, `sindhi`, `sinhala`, `slovak`, `slovenian`, `somali`, `spanish`, `sundanese`, `swahili`, `swedish` |
| **T** | `tajik`, `tamil`, `telugu`, `thai`, `turkish` |
| **U** | `ukrainian`, `urdu`, `uzbek` |
| **V** | `vietnamese` |
| **W** | `welsh` |
| **X** | `xhosa` |
| **Y** | `yiddish`, `yoruba`|
| **Z** | `zulu` |

<br/>

# Strengths and Limitations

## Strengths
* **Get notified of any unlocalized keywords during initialization**<br/>As long as there is at least one language that contains the keyword, any other language without it will be listed out.
* **Make your localizations dynamic with placeholders**<br/>You can pass in as much variables as you want into your localizations.
* **It's single and independent**<br/>`langutil` is just a single JavaScript file, and does not have any dependencies. Hence, it can be distributed and reused with as little hastle as possible.

## Limitations
* **Localization of non-existent keywords cannot be detected during initialization**<br/>`langutil` cannot inspect each and every one of your project files. Hence, if a keyword does not exist in the dictionary at all, you will only be notified when the `localize()` method is called.
* **Limited debugging ability**<br/>`langutil` cannot point out the line of code that has missing localizations. However, a warning will be shown in the console, indicating the unlocalized keyword.
* **Limited auto language detection**<br/>`langutil` is currently able to detect up to 128 languages.
<br/>

# Update History

## 1.0.0
* Creation of langutil 3 core functions and the ability to auto-detect up to 128 languages.

## 1.0.1
* Added a new [`hideLogs()`](##-`hideLogs()`) function
* Minor algorithm optimizations
* Fixed a few documentation mistakes.

## 1.0.2
* Added Update History to Readme.
* The [Language List](#language-list) table has been made more compact. Native names of the languages have been removed since a few are not able to displaye properly on most devices unless additional fonts are installed.
* Minor algorithm optimizations
* Fixed a few documentation mistakes.


<br/><hr/>
[Back to Table of Contents](#table-of-contents)