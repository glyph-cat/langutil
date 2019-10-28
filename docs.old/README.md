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

<!-- # Demo Projects

| Usage        | Initialized with    | Repo                                                                     | Status             |
| ------------ | ------------------- | ------------------------------------------------------------------------ | ------------------ |
| React        | `create-react-app`  | [GitHub](https://github.com/chin98edwin/langutil-demo-create-react-app)  | 🔶 **In Progress** |
| Expo         | `expo init`         | [GitHub](https://github.com/chin98edwin/langutil-demo-expo)              | 🔶 **In Progress** |
| NodeJS       | `npm init`          | [GitHub](https://github.com/chin98edwin/langutil-demo-node-js/)          | ✅ Complete        |
| React Native | `react-native init` | [GitHub](https://github.com/chin98edwin/langutil-demo-react-native-init) | 🔶 **In Progress** |

<br/> -->
