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

<br/>

# Installation

In your project's directory, run either of the commands below:

    # Using NPM
    npm install langutil

    # Using Yarn
    yarn add langutil

<br/>

# Basic Example

    // In your-project/dictionary.json
    {
        "en": {
            "ACCOUNT": "Account",
            "LOGIN": "Login"
        },
        "zh": {
            "ACCOUNT": "账户",
            "LOGIN": "登入"
        }
    }

<br/>

    // In your-project/index.js
    import { init, localize } from 'langutil'
    import dictionary from './dictionary'

    init(dictionary, 'en') // Initialization
    console.log(localize('ACCOUNT')) // Output: Account

    setLanguage('zh') // Switching to other languages
    console.log(localize('LOGIN')) // Output: 登入

<br/>

    // Implementating in React or React Native
    // NOTE: Peer dependency 'hoist-non-react-statics' is required

    import { localize } from 'langutil'
    import { withLang } from 'langutl/react-additions'

    const MyComponent = () => <p>{localize(LOGIN)}</p>
    export default withLang(MyComponent)

<br/>

# Quick Links

- [Update History](https://github.com/chin98edwin/langutil/blob/master/docs/UpdateHistory.md)
- [Full Documentation](https://github.com/chin98edwin/langutil/blob/master/docs/Api.md)
- [Support me on PayPal](https://www.paypal.me/chin98edwin)
  <br/><br/>

<!-- # Demo Projects

| Usage        | Initialized with    | Repo                                                                     | Status             |
| ------------ | ------------------- | ------------------------------------------------------------------------ | ------------------ |
| React        | `create-react-app`  | [GitHub](https://github.com/chin98edwin/langutil-demo-create-react-app)  | 🔶 **In Progress** |
| Expo         | `expo init`         | [GitHub](https://github.com/chin98edwin/langutil-demo-expo)              | 🔶 **In Progress** |
| NodeJS       | `npm init`          | [GitHub](https://github.com/chin98edwin/langutil-demo-node-js/)          | ✅ Complete        |
| React Native | `react-native init` | [GitHub](https://github.com/chin98edwin/langutil-demo-react-native-init) | 🔶 **In Progress** |

<br/> -->

# Concerns in React Native

Langutil runs purely on JavaScript. This means you do not need to run `react-native link` or mess around with the configuration at native level after installing.

Langutil would be a good library to consider especially if:

- your app is created using `expo init`, or
- you do not wish to deal with your project at native level (Using Android Studio or XCode).

Langutl still works even if your app is created using `react-native init`. But the fact that you have chosen to initialize your project with this command probably means that you're confident enough to deal with your project natively. If this is the case and you would like to have a finer control over your app, you may consider using other packages that handles localization at native level.

<br/>
