[![npm](https://img.shields.io/npm/v/langutil.svg)](https://www.npmjs.com/package/langutil)
![npm bundle size](https://img.shields.io/bundlephobia/min/langutil.svg)
[![npm](https://img.shields.io/npm/dt/langutil.svg)](https://npm-stat.com/charts.html?package=langutil)
[![Travis CI](https://img.shields.io/travis/com/chin98edwin/langutil.svg)](https://travis-ci.com/chin98edwin/langutil)

Langutil is a very flexible localizing tool for JavaScript. It works with React and React Native too. Keep on reading to get started.

1. [Installation](#Installation)
2. [Basic Example](#Basic-Example)
3. [Quick Links](#Quick-Links)
4. [Demo Projects](#Demo-Projects)
5. [Concerns in React Native](#-Concerns-in-React-Native)

## Top Features

* **☝️ Everything in one file**<br/>The core implementation comes in just one file and is free of dependencies. (There are additional modules for working with React and React Native)
* **📖 Powerful dictionary inspection tool**<br/>You will be informed if the localizations for each language in your dictionary does not tally.
* **⚡️ Dynamic Localizations**<br/>Pass an array of parameters and have them swapped into your localizations by using placeholders.
* **💫 Flexible output values**<br/>Set anything as the output localization. Yes, you got that right. Numbers, functions, images, boolean values... basically any data type that works in JavaScript. You probably wouldn't need all this flexibilty... but it's there if you need it.
* **🦄 Apply Transformation to your Localizations**<br/>Apply casing styles such as **UPPER CASE**, **lower case**, **Title Case** or **Sentence case**. You can even define your own transformations with a custom function!

<br/>

# Installation
In your project's directory, run the command below:

**Using Node Package Manager (NPM):**

    npm install langutil

**Using Yarn:**

    yarn add langutil

<br/>

# Basic Example

    // <your-project>/dictionary.js

    // Method 1: Defined by languages
    export default {
        "en": { "HELLO": "Hello" },
        "zh-cn": { "HELLO": "哈咯" }
    }

    // Method 2: Defined by keywords
    import { createKey } from 'langutil'
    export default [
        createKey('HELLO'), {
            "en": "Hello",
            "zh-cn": "哈咯"
        }
    ]
<br/>

    // <your-project>/index.js

    import { init, localizeWith } from 'langutil'
    import dictionary from './dictionary'

    init(dictionary, 'en')
    var localizedString = localizeWith({ keyword: 'HELLO' })
    console.log(localizedString) // Output: Hello

    setLanguage('zh-cn') // Switching to other languages
    localizedString = localizeWith({ keyword: 'HELLO' })
    console.log(localizedString) // Output: 哈咯

<br/>

# Quick Links
* [Update History](https://github.com/chin98edwin/langutil/blob/master/docs/UpdateHistory.md)
* [Full Documentation](https://github.com/chin98edwin/langutil/blob/master/docs/Api.md)
* [Support me on PayPal](https://www.paypal.me/chin98edwin)
<br/><br/>

# Demo Projects

| Usage | Initialized with | Repo | Status |
| --- | --- | --- | --- |
| React | `create-react-app` | [GitHub](https://github.com/chin98edwin/langutil-demo-create-react-app) | 🔶 **In Progress** |
| Expo | `expo init` | [GitHub](https://github.com/chin98edwin/langutil-demo-expo) | 🔶 **In Progress** |
| NodeJS | `npm init` | [GitHub](https://github.com/chin98edwin/langutil-demo-node-js/) | ✅ Complete |
| React Native | `react-native init` | [GitHub](https://github.com/chin98edwin/langutil-demo-react-native-init) | 🔶 **In Progress** |

<br/>

# Concerns in React Native

Langutil runs purely on JavaScript. This means you do not need to run `react-native link` or mess around with the configuration at native level after installing.

Langutil would be a good candidate to consider if:
* your app is created using `expo init`
* you do not wish to deal with your project at a native level (Eg: Configuring it with XCode or Android Studio)

If your app is created using `react-native init`, langutil will still work. But the fact that you have chosen to initialize your project this way instead `expo init` probably means you are confident enough to deal with native code. If this is the case and you would like to have a finer control over your app, you may consider using other packages that handles localization at native level.

<br/>