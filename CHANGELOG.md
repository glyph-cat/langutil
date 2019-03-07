# langutil 2.0.0

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
![scnshot](https://github.com/chin98edwin/langutil/tree/master/assets/createKey.png)

## Language list now follows ISO language codes
* Language list have been completely replaced by language codes (Don't worry your old stuff still works, but there will be a warning shown to encourage you to switch over to the new convention)
* Refer http://4umi.com/web/html/languagecodes.php
<br/><br/>

## TypeScript Integration
* langutil now makes use of the `index.d.ts` file to allow a better auto-complete experience.
<br/><br/>

## Minified version is here
* Hooray, there's finally a minified version of langutil for a real performance boost. The overall file size has also been drastically reduced... by **75%**!
<br/><br/>

## Everything in one file
* We're glad to announce that langutil is still one single file *(phew)*.
* We managed to simplify everything info one file, but that does not guarantee that langutil will stay as one file forever.
* The only significant change so far is that this package uses TypeScript file and langutil is being splitted into two counterparts - one for **development** and one for **production**.