There are two ways to define the dictionary:
1. By Keyword
2. By Language

<hr/>

# By Language
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

# By Keyword
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