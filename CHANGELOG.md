# Update History

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