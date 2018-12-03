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