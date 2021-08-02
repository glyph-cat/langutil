<div align="center">

[![Langutil](https://raw.githubusercontent.com/chin98edwin/langutil/main/assets/langutil-wording.svg)](https://github.com/chin98edwin/langutil)

[![Version](https://img.shields.io/npm/v/langutil.svg)](https://github.com/chin98edwin/langutil/releases)
![Bundle size](https://img.shields.io/bundlephobia/min/langutil)
![Downloads](https://img.shields.io/npm/dt/langutil)
[![License](https://img.shields.io/npm/l/langutil)](https://github.com/chin98edwin/langutil/blob/main/LICENSE)

[![Works with React](https://img.shields.io/static/v1?label&logo=react&logoColor=61DBFB&message=Works%20with%20React&color=4a4a4a)](#using-with-react)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/chin98edwin/langutil)
[![Become a Patron](https://img.shields.io/static/v1?label&logo=patreon&logoColor=ffffff&message=Become%20a%20Patron&color=ff424d)](https://www.patreon.com/bePatron?u=27931751)

</div>

<br/>

A localization utility for JavaScript that comes with support for React and React Native.

<br/>

# Table of Contents
<!-- Automatically generated by VS Code -->
- [Table of Contents](#table-of-contents)
- [Installation/Setup](#installationsetup)
- [Basic Usage](#basic-usage)
  - [Initialization](#initialization)
  - [Set language](#set-language)
  - [Get language](#get-language)
  - [Get Localized Content](#get-localized-content)
    - [Basic](#basic)
    - [With Dynamic Values](#with-dynamic-values)
    - [Alternative Syntax](#alternative-syntax)
- [Advanced Usage](#advanced-usage)
- [Using with React](#using-with-react)
  - [Function Components](#function-components)
  - [Higher Order Component (For Classes)](#higher-order-component-for-classes)
  - [UNPKG Script tag](#unpkg-script-tag)
- [Testing Recipes](#testing-recipes)
- [Error Codes](#error-codes)
- [Migrating from v3 and below](#migrating-from-v3-and-below)
- [Miscellaneous](#miscellaneous)

<br/>

# Installation/Setup

With [NPM](https://www.npmjs.com/package/langutil):
```sh
npm i langutil
```
<br/>

With [Yarn](https://yarnpkg.com/package/langutil):
```sh
yarn add langutil
```
<br/>

With UNPKG:
```html
<script src="https://unpkg.com/langutil@<VERSION>/dist/umd/index.js" crossorigin></script>
```
Remember to replace `index.js` with `index.min.js` when deploying.

<br/>

# Basic Usage

## Initialization

```js
import { createLangutilCore } from 'langutil'

const dictionary = {
  en: {
    GOOD_MORNING: 'Good morning',
    GOOD_MORNING_NAME: 'Good morning, {:name}.',
    GOOD_MORNING_PNAME: 'Good morning, %p.',
    GOOD_MORNING_NAME_AND_NAME: 'Good morning, {:name1} and {:name2}.',
  },
  id: {
    GOOD_MORNING: 'Selamat pagi.',
    GOOD_MORNING_NAME: 'Selamat pagi, {:name}.',
    GOOD_MORNING_PNAME: 'Selamat pagi, %p.',
    GOOD_MORNING_NAME_AND_NAME: 'Selamat pagi, {:name1} dan {:name2}.',
  },
}

const core = createLangutilCore(dictionary, 'en', { auto: true })
```

## Set language

```js
// With auto-detect
core.setLanguage('en', { auto: true })

// Without auto-detect
core.setLanguage('en')
```

## Get language

```js
core.getLanguage()
// en
```

## Get Localized Content

### Basic

```js
core.localize('GOOD_MORNING')
// Good morning.
```

### With Dynamic Values

```js
// By object (Recommended for strings with multiple placeholders)
core.localize('GOOD_MORNING_NAME_AND_NAME', {
  name1: 'John',
  name2: 'Jane',
})
//  Original: Good morning, {:name1} and {:name1}.
// Localized: Good morning, John and Jane.

// By array (Recommended for strings with only one placeholder)
core.localize('GOOD_MORNING_PNAME', ['John'])
//  Original: Good morning, %p.
// Localized: Good morning, John.
```

### Alternative Syntax

Instead of spreading the parameters, you can pass an object like this:

```js
const localizedValue = core.localize({
  keyword: 'GOOD_MORNING_NAME_AND_NAME',
  param: {
    name1: 'John',
    name2: 'Jane',
  }
})
// Good morning, John and Jane.
```

# Advanced Usage

In rare cases, you might need to get values that are localized into a different language from the one currently set, this is when `.localizeExplicitly` and `localizeFromScratch` become useful.

```js
import { createLangutilCore, localizeFromScratch } from 'langutil'

const dictionary = {
  en: {
    SOMETIMES_IM_A_BEAR: 'Sometimes, I\'m a bear, and at other times I am a be-ar.',
  },
  id: {
    SOMETIMES_IM_A_BEAR: 'Kadang-kadang aku beruang, dan kadang-kadang aku ber-uang.',
  },
  ja: {
    SOMETIMES_IM_A_BEAR: 'ある時はクマ、そしてまたある時は…ク-マ。'
  },
}

const core = createLangutilCore(dictionary, 'en')

core.localizeExplicitly('ja', 'SOMETIMES_IM_A_BEAR')
// ある時はクマ、そしてまたある時は…ク-マ。

core.localizeExplicitly('id', 'SOMETIMES_IM_A_BEAR')
// Kadang-kadang aku beruang, dan kadang-kadang aku ber-uang.

core.localize('SOMETIMES_IM_A_BEAR')
// Sometimes, I'm a bear, and at other times I am a be-ar.

const dictionaryAlt = {
  en: {
    GOOD_NIGHT: 'Good night.',
  },
  ja: {
    GOOD_NIGHT: 'おやすみなさい。',
  },
  id: {
    GOOD_NIGHT: 'Selamat malam.',
  },
}

localizeFromScratch(dictionaryAlt, 'ja', 'GOOD_NIGHT')
// おやすみなさい。

```

<br/>

# Using with React

To use Langutil with React, you will first need to install the `hoist-non-react-statics` package. 

See [React Docs: Higher-Order Components](https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over) (Head over to the section **Static Methods Must Be Copied Over** if the site doesn't automatically scroll to it).

<br/>

## Function Components

```js
import { useLangutil } from 'langutil/react'

// It is recommended to create a custom hook instead of
// directly consuming it in components.
export function useLang() {
  return useLangutil(core)
}

function MyComponent() {
  const langutilState = useLang()
  return <h1>{langutilState.localize('HELLO')}</h1>
}

```

## Higher Order Component (For Classes)

```js
import React from 'react'
import { createLangutilHOC } from 'langutil/react'

export const withLang = createLangutilHOC(core)

class MyComponent extends React.Component {
  render() {
    const { langutilState } = this.props
    return <h1>{langutilState.localize('HELLO')}</h1>
  }
}

export default withLang(MyComponent)

```

## UNPKG Script tag

* The react additions can be imported with a script tag as shown below.
* Remember to replace `index.js` with `index.min.js` when deploying.

```html
<script src="https://unpkg.com/langutil@<VERSION>/react/dist/umd/index.js" crossorigin></script>
```

<br/>

# Testing Recipes

You can check if your dictionary contains missing localizations with the code snippet below. The code below uses [Jest](https://jestjs.io).

```js
import dictionary from './path-to-your-dictionary'

describe('Localizations are tally', () => {
  const languageStack = Object.keys(dictionary)
  const firstLanguage = languageStack[0]
  const firstKeywordStack = Object.keys(dictionary[firstLanguage]).sort()
  for (let i = 1; i < languageStack.length; i++) {
    const language = languageStack[i]
    test(`Comparing ${firstLanguage} - ${language}`, () => {
      const keywordStack = Object.keys(dictionary[language]).sort()
      expect(firstKeywordStack).toStrictEqual(keywordStack)
    })
  }
})
```

<br/>

# Error Codes
In production builds, these error codes are thrown instead of the usual messages.

* **`LangutilE1,x`**<br/>
Expected `param` to be an array or object but got `x`

* **`LangutilE2,x`**<br/>
Expected `dictionary` to be an object but got `x`

* **`LangutilE3,x`**<br/>
Prop conflict for `langutilState` in <`x`/>

<br/>

# Migrating from v3 and below

Sad enough to say, I am no longer able to maintain this library with a pretty docs site. This includes a proper migration guide as well.

But this README file should be more than enough to grasp the concept of the new version. It still has familiar method names such as `localize`, `setLanguage` and `setDictionary`, except for a few key changes highlighted below:

Here are some of the key changes summarized:
* You need to create a `LangutilCore` before you can start localizing content;
* Dictionaries must now be structured by language first; 
* Case formatting features have been removed, there are other libraries out there that handles casings waaay better than Langutil.

Although this is one step extra, it actually brings a few benefits. There may be cases where your website needs to display different languages in different containers or canvases and this can be useful. For example, a novel reading website, where novels might only be written in limited languages but the website itself supports 20+ languages.

Of course, that quite a crazy example, but even if your app is going to need just one `LangutilCore`, you can still benefit from TypeScript autocomplete thanks to the factory pattern in v4. Cheers 🍻

![TypeScript autocomplete - keywords](https://raw.githubusercontent.com/chin98edwin/langutil/main/assets/ts-autocomplete-keywords.png)

<br/>

# Miscellaneous

Looking for a general-purpose state manager for React? Then you might be interested in [React Relink](https://github.com/chin98edwin/react-relink).
