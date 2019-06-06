# Table of Contents
1. [Defining by Language](#-1.-Defining-by-Language)
2. [Defining by Keyword](#-2.-Defining-by-Keyword)

<hr/>

# 1. Defining by Language
When defining by language, the dictionary is defined as an object. It should have a shape that looks like this:

    export default {
        "en": {
            "HELLO": "Hello"
            "WORLD": "World"
            "GOOD_MORNING_NAME": "Good morning, %p."
        },
        "ja": {
            "HELLO": "こんにちは"
            "WORLD": "世界",
            "GOOD_MORNING_NAME": "お早よう，%pさん。"
        }
    }
<br/>

# 2. Defining by Keyword
When defining by keyword, the dictionary is defined as an array instead. The `createKey` function provides auto-suggestions to let you know what language codes will be returned if auto detect is set to true later on.

    import { createKey } from langutil

    export default [
        createKey('HELLO', {
            "en": "Hello"
            "ja": "こんにちは"
        }),
        createKey('WORLD', {
            "en": "World"
            "ja": "世界"
        })
        createKey('GOOD_MORNING_NAME', {
            "en": "Good morning, %p."
            "ja": "お早よう，%pさん。"
        })
    ]
<br/>

# 3. Which one should I use?

Each method has its own pros and cons. The table below will compare them in contrast so that you can make better decision.

| | By Language | By Keyword |
| --- | --- | --- |
| **Can be broken down into several files by** | Language | Alphabet (Not recommended) |
| **Standard method in native development** | Yes | No |
| **Can spot missing localizations easier** | No | Yes |
<br/>

While localizing by keywords can be easier for small-scaled apps, it will become hard to maintain as the app evolves and more localizations are added. While it can be broken down by alphabets, it wouldn't make it any easier to maintain either.

Imagine doing this:

    const dictionary = [
        ...require("./a"),
        ...require("./b"),
        ...require("./c"),
        ...require("./d"),
        ...require("./e"),
        // and so on...
    ];

And for each file (A-Z) having to do something like this:

    import { createKey } from 'langutil'
    module.exports = [
        createKey("KEYWORD", {
            "code": "localization"
        })
    ]
<br/>

***Teaser:*** We are in the progress of creating a conversion tool to make the transition from whichever method to the other easier. So feel free to experiment with whichever method that suits your development needs for now.

<br/>