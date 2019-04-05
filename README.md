[![NPM](https://nodei.co/npm/langutil.png)](https://nodei.co/npm/langutil/)<br/>[![npm](https://img.shields.io/npm/v/langutil.svg)](https://github.com/chin98edwin/langutil/blob/master/CHANGELOG.md) ![npm bundle size](https://img.shields.io/bundlephobia/min/langutil.svg) [![npm](https://img.shields.io/npm/dw/langutil.svg)](https://npm-stat.com/charts.html?package=langutil) [![Build Status](https://travis-ci.com/chin98edwin/langutil.svg?branch=master)](https://travis-ci.com/chin98edwin/langutil)


Langutil is a localizing tool for JavaScript. It comes with several powerful and flexible functions yet all in one file. Keep on reading to get started.

## Top Features

* **☝️ Everything in one file**<br/>The core implementation comes in just one file and is free of dependencies.
* **📖 Powerful dictionary inspection tool**<br/>You can get notified about any languages or localizations that you may have forgot to define.
* **⚡️ Dynamic Localizations**<br/>Pass an array of parameters and have them swapped into your localizations with the help of placeholders.
* **💫 Very, Very Flexible output values**<br/>Set anything as the output localization. Yes, you got that right. Numbers, functions, images, boolean values... basically any data type that works in JavaScript. You probably wouldn't need all this flexibilty... but hey, it just works!
* **🦄 Apply Transformation to your Localizations**<br/>Apply casing styles such as **UPPER CASE**, **lower case**, **Title Case** or **Sentence case**. You can even define your own transformations with a custom function!

<br/>

# Table of Contents

1. [Installation](#installation)
2. [Basic Example](#basic-example)
3. [Further Reading](#further-reading)
<br/>

# Installation
In your project's directory, run the command below:

**Using Node Package Manager (NPM):**

    npm install langutil

**Using Yarn:**

    yarn add langutil

# Basic Example

    // <your-project>/dictionary.js

    import { createKey } from 'langutil'
    export default = [
        createKey('HELLO'), {
            "en": "Hello",
            "zh-cn": "哈咯"
        }
    ]
<!---->
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

# Further Reading

* Check out the [Demos](https://github.com/chin98edwin/langutil/tree/master/demo) (Only `demo-node-js` is complete for the time being)
* Read the [Full Documentation](https://github.com/chin98edwin/langutil/blob/master/docs/Api.md)
* Read the [Update History](https://github.com/chin98edwin/langutil/blob/master/docs/UpdateHistory.md)
* Support me in sustaining this project by [donating via PayPal](https://www.paypal.me/chin98edwin)
<br/><br/>