# Dictionary

The dictionary can be structured either by **language** or **keywords**. `langutil` automatically recognizes which method you're using so no extra parameters or fancy functions (such as `createKey()`) are needed. Note that keywords should always be written in MACRO_CASE.

<br/>

Example of `dictionary.json` structured by language:

    {
        "en": {
            "HELLO": "Hello",
            "FOO": "Foo"
        },
        "zh": {
            "HELLO": "哈咯"
            "FOO": "胡"
        }
    }

<br/>

Example of `dictionary.json` structured by keywords:

    {
        "HELLO": {
            "en": "Hello"
            "zh": "哈咯"
        },
        "FOO": {
            "en": "Foo"
            "zh": "胡"
        }
    }
