# Migrating from v3 and below

Sad enough to say, I am no longer able to maintain this library with a pretty docs site. This includes a proper migration guide as well.

But this README file should be more than enough to grasp the concept of the new version. It still has familiar method names such as `localize`, `setLanguage` and `setDictionary`, except for a few key changes highlighted below:

Here are some of the key changes summarized:
* You need to create a `LangutilCore` before you can start localizing content;
* Dictionaries must now be structured by language first; 
* Case formatting features have been removed, there are other libraries out there that handles casings waaay better than Langutil.

Although this is one step extra, it actually brings a few benefits. There may be cases where your website needs to display different languages in different containers or canvases and this can be useful. For example, a novel reading website, where novels might only be written in limited languages but the website itself supports 20+ languages.

Of course, that is quite a crazy example, but even if your app is going to need just one `LangutilCore`, you can still benefit from TypeScript autocomplete thanks to the factory pattern in v4. Cheers 🍻

![TypeScript autocomplete - keywords](https://raw.githubusercontent.com/glyph-cat/langutil/main/assets/ts-autocomplete-keywords.png)

<br/>
