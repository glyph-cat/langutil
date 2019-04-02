# Full Update History

## 1.0.0
* Creation of langutil with 3 core functions and the ability to auto-detect up to 128 languages.

## 1.0.1
* Added a new `hideLogs()` function.

## 1.0.2
* Added Update History to Readme.
* The Language List table has been made more compact. Native names of the languages have been removed since a few are not able to displaye properly on most devices unless additional fonts are installed.

## 1.0.3
* Fixed the issue where the '%q's in localization will be replaced with '%p's. Previously, the algorithm temporarily swapped '%%p' with '%q' to allow escaping '%p'.
* Adapted syntax for CommonJS.
* Added auto suggestions from the Language List to `init()` and `setLanguage()`.
* Added the `chinese` (not simplified ot traditional specific) option to the Language List.
* Examples have been removed from inline documentation as more detailed ones are already available in this readme file.
* `hideLogs()` will be deprecated in future versions in favor of a more flexible method.

## 1.1.0
* `showLogs()` (still usable) will be replaced by `logs.hide()` and `logs.show()`.
* Added 84 new languages to auto detection algorithm: `akan`, `avestan`, `aymara`, `bihari`, `bislama`, `breton`, `burmese`, `bulgarian_old`, `chamorro`, `chechen`, `chuvash`, `cornish`, `cree`, `divehi`, `dzongka`, `ewe`, `faroese`, `fijian`, `fula`, `gaelic_scot`, `gaelic_manx`, `frisian_western`, `greenlandic`, `guarani`, `herero`, `hirimotu`, `ido`, `interlingua`, `interlingue`, `inuktitut`, `inupiak`, `kanuri`, `kashmiri`, `kikuyu`, `kinyarwanda`, `kirundi`, `komi`, `kongo`, `kwanyama`, `limburger`, `lingala`, `lugakatanga`, `luganda`, `manx`, `marshallese`, `moldavian`, `nauru`, `navajo`, `ndonga`, `ndebele_northern`, `norwegian_bokmal`, `norwegian_nynorsk`, `nuosu`, `occitan`, `ojibwe`, `oriya`, `oromo`, `ossetian`, `pali`, `quechua`, `romansh`, `sami`, `sango`, `sanskrit`, `serbian_croatian`, `setswana`, `siswati`, `southern_ndebele`, `swati`, `tagalog`, `tahitian`, `tatar`, `tibetan`, `tigrinya`, `tonga`, `tsonga`, `turkmen`, `twi`, `uyghur`, `venda`, `volapuk`, `wallon`, `wolof` and `zhuang`.

## 1.1.1
* Added some quick hixes to the documentation.

## 1.1.2
* Performance optimization for production mode.

## 1.1.3
* Fixed a bug where certain valid keywords are recognized as invalid.

## 1.1.4
* Minor performance fixes.

## 1.1.5
* Minor performance optimization.
* Fixed some documentation errors.

<br/><hr/>

## 2.0.0
* You can now define dictionaries by Keywords
* There is a new `createKey()` method to help you with that
* Language list now follows ISO language codes but the old convention that langutil 1.x.x still works
* `index.d.ts` integration
* Minified version (75% file size reduction!)
* Everything is still in one file!

## 2.1.0
* Added new method `localizeWith()` for more powerful localizing capabilities: Apply **casing styles** and **custom transformations** to the localized value! 🦄
* Added new method `getDefinedLanguages()` which allows you to access the list of languages defined in the dictionary during runtime.
* You can now assign anything to your localized value, for instance, you might want to have a different logo image for each language if you have a tagline in your logo.
* Fixed a critical bug where there production build fails if logs are shown.

## 2.1.1
* Fixed some documentation errors.
* Added new option `sentenceCase` for the `casing` parameeter in `localizeWith()`.

## 2.1.2
* Fixed an issue where you may encounter an error with a message like "**this.localize is not a function**".

## 2.1.3
* Silenced the unneccessary warning messages when `casing` and `transform` parameters in `localizeWith()` are not defined as they are optional.
* Auto language detection is now supported in React Native.
* Documentations have been updated to reduce package size.
* Fixed the bug where langutil will always launch in minified mode by default.

## 2.2.0
* In case the automatically detected language is not supported in the dictionary, langutil look for an alternative language from the dictionary. For example, if your dictionary contains localizations for `"en"`, but the automatically detected language is `"en_us"`, langutil will set the language to `"en"`.
* Fixed an issue where false warnings about insufficient parameters are shown.
* New `logs.focus()` function allows to you see langutil logs in a specific block of code while hiding the rest, that is, onlt necessary if the logs were already hidden prior to that block.
* New `isAuto()` function to know whether autoDetection is set to true.