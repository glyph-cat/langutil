# langutil 2.1.X
* Added new method `localizeWith()` for more powerful localizing capabilities: Apply **casing styles** and **custom transformations** to the localized value! 🦄
* Added new method `getDefinedLanguages()` which allows you to access the list of languages defined in the dictionary during runtime.
* You can now assign anything to your localized value, for instance, you might want to have a different logo image for each language if you have a tagline in your logo.
* Fixed a critical bug where there production build fails if logs are shown.
* Fixed some documentation errors.
* Added new option `sentenceCase` for the `casing` parameeter in `localizeWith()`.
* Fixed an issue where you may encounter an error with a message like "**this.localize is not a function**".
* Silenced the unneccessary warning messages when `casing` and `transform` parameters in `localizeWith()` are not defined as they are optional.
* Auto language detection is now supported in React Native.
* Documentations have been updated to reduce package size.
* Fixed the bug where langutil will always launch in minified mode by default.
* In case the automatically detected language is not supported in the dictionary, langutil look for an alternative language from the dictionary. For example, if your dictionary contains localizations for `"en"`, but the automatically detected language is `"en_us"`, langutil will set the language to `"en"`.
* Fixed an issue where false warnings about insufficient parameters are shown.
* New `logs.focus()` function allows to you see langutil logs in a specific block of code while hiding the rest, that is, onlt necessary if the logs were already hidden prior to that block.
* New `isAuto()` function to know whether autoDetection is set to true.
* (v2.2.1) Emergency fix for a bug where auto detect in v2.2.0 fails for React Native apps
<hr/>

# Hightlights in 2.0.0

## Define dictionaries by Keywords
* Dictionaries can now be grouped by keywords. Don't worry though, your old definitions still work just as they should. However, this will be the prefered convention from this version onwards. Example:
<!---->

    import langutil, { createKey } from 'langutil';
    const dictionary = [
        createKey('GOOD_MORNING', {
            "en": "Good morning",
            "ja": "お早うございます",
            "ms": "Selamat Pagi",
            "zh-cn": "早安"
        }),
    ]
    langutil.init(dictionary, "en");

* Take note that the dictionary is defined as an **array** here.
<br/><br/>

## New `createKey()` method
* With `createKey()` you can define localizations very easily with the help of auto-complete.
<br/><br/>
![scnshot](https://raw.githubusercontent.com/chin98edwin/langutil/master/assets/createKey.png)

## Language list now follows ISO language codes
* Language list have been completely replaced by language codes (Don't worry your old stuff still works, but there will be a warning shown to encourage you to switch over to the new convention)
* Refer http://4umi.com/web/html/languagecodes.php
<br/><br/>

## TypeScript Integration
* langutil now makes use of the `index.d.ts` file to allow a better auto-complete experience.
<br/><br/>

## Minified version is here
* Hooray, there's finally a minified version of langutil for a real performance boost. The overall file size has also been drastically reduced to speed up load time.
<br/><br/>

## Everything in one file
* We're glad to announce that langutil is still one single file *(phew)*.
* We managed to simplify everything info one file, but that does not guarantee that langutil will stay as one file forever.
* The only significant change so far is that this package uses TypeScript file and langutil is being splitted into two counterparts - one for **development** and one for **production**.