# Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [The Dictionary](#the-dictionary)
5. [Language List](#language-list)
6. [Strengths and Limitations](#strengths-and-limitations)

# Introduction
Langutil is a localizing tool for JavaScript. In fact, it is made up of only one file and does not have any dependencies. Langutil is packed with three simple yet powerful functions. Keep on reading to get started.

<br/>

# Installation
In your project's directory, run the command below:

    npm install langutil

<br/>

# Usage
Below is a very basic working example:

    import langutil from 'langutil'

    const dictionary = {
        "english": {
            "HELLO": "Hello",
        },
        "chinese_sim": {
            "HELLO": "哈咯",
        }
    }

    langutil.init(dictionary, 'english')

    console.log(langutil.localize('HELLO')) // Output: Hello

    // Switching to other languages
    langutil.setLanguage('chinese_sim')
    console.log(langutil.localize('HELLO')) // Output: 哈咯

_NOTE: The dictionary above is just an example. In an actual project, the dictionary content would be much longer, hence it is advisable to save it as a separate JSON file and import it instead._

<br/>

# Methods

1. [`init(dictionary, language, auto)`](#init(dictionary,-language,-auto))
2. [`setLanguage(language, auto)`](#setLanguage(language,-auto))
3. [`localize(keyword, paramArray)`](#localize(keyword,-paramArray))
<!-- 4. [`getSampleDictionary()`](#getSampleDictionary()) -->
<!-- 5. [`getLanguageList()`](#getLanguageList()) -->
<br/>

## `init(dictionary, language, auto)`
This initializes langutil with a dictionary and language. This method must be called before `localize()` can be used. <br/>
* **`dictionary: (Object)`**<br/>
The dictionary that stores all your localizations.
* **`language: (String)`**<br/>
The language in which your content will be displayed. The language code that you provided must exist in your dictionary too.
* **`auto: (Boolean)` [OPTIONAL]**<br/>Set it to `true` to let the computer figure out the client's browser language. In order for auto detection to work properly, the language code in your dictionary should match the ones in our [Language List](#language-list). `language` will be used as the fallback language if auto-detection fails.

Valid examples:

    langutil.init(dictionary, 'english')
    langutil.init(dictionary, 'english', false)
    langutil.init(dictionary, 'english', true)
<br/>

## `setLanguage(language, auto)`
Similar to `init()`, but this only sets the language and can be called anytime. This method can come in handy when users want to change the language.
* **`language: (String)`**<br/>
The language in which your content will be displayed. The language code that you provided must exist in your dictionary too.
* **`auto: (Boolean)` [OPTIONAL]**<br/>Set it to `true` to let the computer figure out the client's browser language. In order for auto detection to work properly, the language code in your dictionary should match the ones in our [Language List](#language-list). `language` will be used as the fallback language if auto-detection fails.

Valid examples:

    langutil.setLanguage('english')
    langutil.setLanguage('english', false)
    langutil.setLanguage('english', true)
<br/>

## `localize(keyword, paramArray)`
This is the method that returns the localized strings based on your keywords and language set.
* **`keyword: (String)`**<br/>
A simple string that will be mapped to its localized form in the dictionary.
* **`paramArray: (array)` [OPTIONAL]**<br/>
There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead.

Valid examples:

| Keyword               | Localization         |
| --------------------- | -------------------- |
| `HELLO`               | `Hello`              |
| `N_CHARS_LEFT`        | `%p characters left` |
| `HELLO_NAME_AND_NAME` | `Hello, %p and %p. ` |

    localize('HELLO')
    // Output: Hello

    localize('N_CHARS_LEFT', [50])
    // Output: 50 characters left

    localize('HELLO_NAME_AND_NAME', ['Adam', 'Susie'])
    // Output: Hello, Adam and Susie.

<br/>

<!-- ## `getSampleDictionary()`

Returns a sample dictionary in case you need one to refer to. <br/>

<br/>

## `getLanguageList()`
Returns a list of the codes of languages that `langutil` is able to auto-detect in case you need to refer to. A complete list is also available [here](#language-list).


<br/> -->

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

_NOTE: A **keyword** is plain string that should be able to reflect a brief or partial meaning of the localized string. To avoid ambiguation, use uppercase letters only. Underscores and numbers are also allowed but they should not be the first character of the keyword. Valid examples: `'HELLO'`, `'HELLO_WORLD'`, `'ABOUT_PAGE_PARAGRAPH_3'`._

<!-- A breakdown of the dictionary structure:
Note: The keywords are names that you will refer to when localizing. To include additional parameters into the localizations, use `%p` as placeholders. -->

<br/>

# Language List
You are free to use your own way to represent languages in your dictionary. But when auto language detection is used, it automatically sets the language with the codes below.

To avoid ambiguity and solve problems like determining simplified and traditional Chinese, a set of custom language codes that are similar to natural language is used.

|       | Language Code    | Native Name           |
| -----:| ---------------- | --------------------- |
| **A** | `abkhazan`       | Аҧсуа бызшәа |
|       | `achinese`       | بهسا اچيه |
|       | `acoli`          | Lwo |
|       | `adangme`        | Dangme |
|       | `adyghe`         | Адыгабзэ |
|       | `afar`           | Qafaraf |
|       | `afrikaans`      | Afrikaans |
|       | `ainu`           | アイヌ・イタㇰ |
|       | `albanian`       | Shqip |
|       | `aleut`          | Унáӈам тунуý |
|       | `altai_southern` | Алтай тили |
|       | `amharic`        | አማርኛ |
|       | `angika`         |  |
|       | `arabic`         | العَرَبِيَّة |
|       | `aragonese`      | aragonés |
|       | `arapaho`        | Hinónoʼeitíít |
|       | `arawak`         | Lokono |
|       | `armenian`       | Հայերէն; Հայերեն |
|       | `assamese`       | অসমীয়া |
|       | `asturian`       | Asturianu |
|       | `avaric`         | Магӏарул мацӏ |
|       | `awadhi`         | अवधी |
|       | `azerbaijani`    | Azərbaycan dili |
| **B** | `balinese`       | ᬪᬵᬱᬩᬮᬶ |
|       | `balinese`       | ᬪᬵᬱᬩᬮᬶ |
|       | `bambara`        | ߓߊߡߊߣߊߣߞߊߣ |
|       | `bashkir`        | Башҡорт теле |
|       | `basa`           | Ɓasaá |
|       | `basque`         | euskara |
|       | `beja`           | Bidhaawyeet |
|       | `belarusian`     | Беларуская мова |
|       | `bemba`          | Chibemba |
|       | `bengali`        | বাংলা |
|       | `bosnian`        | bosanski |
|       | `bulgarian`      | български език |
| **C** | `catalan`        | català |
|       | `cebuano`        | Sinugbuanong Binisayâ |
|       | `chichewa`       | Chichewa |
|       | `chinese_s`      | 简体中文 |
|       | `chinese_t`      | 繁體中文 |
|       | `corsican`       | Corsu |
|       | `croatian`       | hrvatski |
|       | `czech`          | čeština |
| **D** | `danish`         | dansk |
|       | `dutch`          | Nederlands |
| **E** | `english`        | English |
|       | `esperanto`      | Esperanto |
|       | `estonian`       | eesti keel |
| **F** | `filipino`       | Wikang Filipino |
|       | `finnish`        | suomen kieli |
|       | `french`         | français |
|       | `frisian`        | Seeltersk; Frasch; Frysk
| **G** | `galician`       | galego |
|       | `georgian`       | ქართული |
|       | `german`         | Deutsch |
|       | `greek`          | Νέα Ελληνικά |
|       | `gujarati`       | ગુજરાતી |
| **H** | `haitian_creole` | kreyòl ayisyen |
|       | `hausa`          | هَرْشَن |
|       | `hawaiian`       | ʻŌlelo Hawaiʻi |
|       | `hebrew`         | עברית |
|       | `hindi`          | हिन्दी |
|       | `hmong`          | lus Hmoob |
|       | `hungarian`      | magyar nyelv |
| **I** | `icelandic`      | íslenska |
|       | `igbo`           | Asụsụ Igbo	|
|       | `indonesian`     | Bahasa Indonesia |
|       | `irish`          | Gaeilge |
|       | `italian`        | italiano |
| **J** | `japanese`       | 日本語 |
|       | `javanese`       | ꦧꦱꦗꦮ |
| **K** | `kannada`        | ಕನ್ನಡ |
|       | `kazakh`         | қазақ тілі |
|       | `khmer`          | ភាសាខ្មែរ |
|       | `korean`         | 한국어 |
|       | `kurdish`        | کوردی |
|       | `kyrgyz`         | кыргызча |
| **L** | `lao`            | ພາສາລາວ |
|       | `latin`          | Lingua latīna |
|       | `latvian`        | Latviešu valoda |
|       | `lithuanian`     | lietuvių kalba |
|       | `luxembourgish`  | Lëtzebuergesch |
| **M** | `macedonian`     | македонски јазик |
|       | `malagasy`       |  |
|       | `malay`          | Bahasa Melayu |
|       | `malayalam`      | മലയാളം |
|       | `maltese`        | Malti |
|       | `maori`          | Te Reo Maori |
|       | `mapudungun`     |  |
|       | `marathi`        | मराठी |
|       | `mongolian`      | монгол хэл |
|       | `myanmar`        | မြန်မာစာ |
| **N** | `nepali`         | नेपाली भाषा |
|       | `norwegian`      | norsk |
| **O** | `pashto`         | پښتو |
|       | `persian`        | فارسی |
|       | `polish`         | Język polski |
|       | `portugese`      | português |
|       | `punjabi`        | ਪੰਜਾਬੀ |
| **R** | `romanian`       | limba română |
|       | `russian`        | русский язык |
| **S** | `samoan`         | Gagana faʻa Sāmoa |
|       | `scots_gaelic`   | Gàidhlig |
|       | `serbian`        | српски |
|       | `sesotho`        | Sesotho sa Leboa |
|       | `shona`          | chiShona |
|       | `sindhi`         | سنڌي |
|       | `sinhala`        | සිංහල |
|       | `slovak`         | slovenčina |
|       | `slovenian`      | slovenski jezik |
|       | `somali`         | af Soomaali |
|       | `spanish`        | español |
|       | `sundanese`      | ᮘᮞ ᮞᮥᮔ᮪ᮓ  |
|       | `swahili`        | Kiswahili |
|       | `swedish`        | svenska |
| **T** | `tajik`          | тоҷикӣ |
|       | `tamil`          | தமிழ் |
|       | `telugu`         | తెలుగు |
|       | `thai`           | ภาษาไทย |
|       | `turkish`        | Türkçe |
| **U** | `ukrainian`      | українська мова |
|       | `urdu`           | اُردُو |
|       | `uzbek`          | Oʻzbekcha |
| **V** | `vietnamese`     | Tiếng Việt |
| **W** | `welsh`          | Cymraeg |
| **X** | `xhosa`          | isiXhosa |
| **Y** | `yiddish`        | אידיש |
|       | `yoruba`         | èdè Yorùbá |
| **Z** | `zulu`           | isiZulu |

<br/>

# Strengths and Limitations

## Strengths
* **Get notified of any unlocalized keywords during initialization**<br/>As long as there is at least one language that contains the keyword, any other language without it will be listed out.
* **Make your localizations dynamic with placeholders**<br/>You can pass in as much variables as you want into your localizations.
* **It is single and independent**<br/>`langutil` is just a single JavaScript file, and does not have any dependencies. Hence, it can be distributed and reused with as little hastle as possible.

## Limitations
* **Localization of non-existent keywords cannot be detected during initialization**<br/>`langutil` cannot inspect each and every one of your project files. Hence, if a keyword does not exist in the dictionary at all, you will only be notified when the `localize()` method is called.
* **Limited debugging ability**<br/>`langutil` cannot point out the line of code that has missing localizations. However, a warning will be shown in the console, indicating the unlocalized keyword.
* **Limited auto language detection**<br/>`langutil` is currently able to detect up to 128 languages.

<br/><hr/>
[Back to Table of Contents](#table-of-contents)