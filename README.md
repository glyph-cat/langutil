[![npm](https://img.shields.io/npm/v/langutil.svg)](https://www.npmjs.com/package/langutil)
![npm bundle size](https://img.shields.io/bundlephobia/min/langutil.svg)
[![npm](https://img.shields.io/npm/dt/langutil.svg)](https://npm-stat.com/charts.html?package=langutil)
[![Travis CI](https://img.shields.io/travis/com/chin98edwin/langutil.svg)](https://travis-ci.com/chin98edwin/langutil)

Langutil is a localizing tool for JavaScript. It comes with several powerful and flexible functions with it's core functions all in one file. Additional modules for special use cases can be imported separately only when needed. Keep on reading to get started.

1. [Installation](#installation)
2. [Basic Example](#basic-example)
3. [Quick Links](#quick-links)
3. [Demo Projects](#demo-projects)

## Top Features

* **☝️ Everything in one file**<br/>The core implementation comes in just one file and is free of dependencies. (Works with React and React Native too)
* **📖 Powerful dictionary inspection tool**<br/>You can get notified about any languages or localizations that you may have forgot to define.
* **⚡️ Dynamic Localizations**<br/>Pass an array of parameters and have them swapped into your localizations with the help of placeholders.
* **💫 Very, Very Flexible output values**<br/>Set anything as the output localization. Yes, you got that right. Numbers, functions, images, boolean values... basically any data type that works in JavaScript. You probably wouldn't need all this flexibilty... but hey, it just works!
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

| Usage with | Repo | Status |
| --- | --- | --- |
| `create-react-app` | [GitHub](https://github.com/chin98edwin/langutil-demo-create-react-app) | 🔶 **In Progress** |
| Expo | [GitHub](https://github.com/chin98edwin/langutil-demo-expo) | 🔶 **In Progress** |
| NodeJS | [GitHub](https://github.com/chin98edwin/langutil-demo-node-js/) | ✅ Complete |
| `react-native init` | [GitHub](https://github.com/chin98edwin/langutil-demo-react-native-init) | 🔶 **In Progress** |

<br/><br/>