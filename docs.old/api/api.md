# Table of Contents

<br/>

## `init`
Initialize langutil with a dictionary and language. Shorthand for `setDictionary` and `setLanguage`.

| Parameter | Description | Type |
| --- | --- | --- |
| `dictionary` | The object containing all localizations. | `object` |
| `language` | The language to use. | `string` |
| `auto?` | A langutil built-in function, pass `AUTO_DETECT` into this parameter to allow auto-language detection. | `object` |

<br/>

## `setDictionary`
Sets the dictionary. We encourage using `init` and not changing the contents of the dictionary in halfway. Unless the dictionary has been splitted up into sections for lazy loading.

| Parameter | Description | Type |
| --- | --- | --- |
| `dictionary` | The object containing all localizations. | `object` |

<br/>

## `setLanguage`
Sets the language.

| Parameter | Description | Type |
| --- | --- | --- |
| `language` | The language to use. | `string` |
| `auto?` | A langutil built-in function, pass `AUTO_DETECT` into this parameter to allow auto-language detection. | `object` |

<br/>

## `localize`
Maps a keyword to its localized value.

| Parameter | Description | Type |
| --- | --- | --- |
| `keyword` | A short string representing the localized value. | `string` |
| `param` | An array or object which each of their values can be swapped into localizations. | `Array<unknown>` \| `object` |
| `casing` | Casing styles that will be applied to the localized value if it is a string. | One of `'lowerCase'`, `'localeLowercase'`, `'localeUpperCase'`, `'sentenceCase'`, `'titleCase'`, `'upperCase'` |
| `transform` | Apply a transformation to the localized value. | `Function` |

* **Return type:** `unknown`

<br/>

## `getCurrentLanguage`
Get the currently set language.
<br/>
* **Return type:** `string`

<br/>

## `getDefinedLanguages`

Get the currently set language.
<br/>
* **Return type:** `Array<string>`

<br/>

## `withLang`
A Higher-order component that allows your existing components to listen for changes in langutil and update themselves accordingly.

| Parameter | Description | Type |
| --- | --- | --- |
| WrappedComponent | Your existing component to be wrapped | (Any React class or functional component) |

* **Return Type:** `React.Component`

<br/>

## `isAuto`
Get the currently set language.
<br/>
* **Return type:** `Array<string>`

<br/>

## `logs.show`
Show logs from langutil.

<br/>

## `logs.hide`
Hide logs from langutil.

<br/>

## `logs.showVerbose`
Show verbose logs from langutil.

<br/>

## `logs.hideVerbose`
Hide verbose logs from langutil.

<br/>

## `logs.focus`
If you have chosen to hide away langutil logs but want to log a portion of code with it, place your code inside the callback.

| Parameter | Description | Type |
| --- | --- | --- |
| `fn` | The callback which you want langutil to focus its logs on. | `Function` |

* **Returns:** `true` if the callback was sucessful.
* **Return Type:** `boolean`

<br/>

## `createKey`
Allows you to define your dictionary by keyword.

Deprecated since: 2.4.0 (Will be removed by March 2020)

| Parameter  | Description | Type |
| --- | --- | --- |
| `keyword` | A plain string that should be able to reflect a brief or partial meaning of the localized string. | `string` |
| `localizations` | The translations. | `object` |

* **Returns:** A Keyword object.
* **Return Type:** `object`

<br/>

## `getLanguage`
Get the currently set language.

Deprecated since: 2.4.0 (Will be removed by March 2020)
* **Returns:** The string representation of the language.
* **Return Type:** `string`

<br/>

## `localizeWith`
Maps a keyword to its localized value.

Deprecated since: 2.4.0 (Will be removed by March 2020)

| Parameter | Decription | Type |
| --- | --- | --- |
| `keyword` | A short string representing the localized value. | `string` |
| `paramArray?` | There are times when it is not possible to define every possible string in the dictionary due to changing variables. This is how you can combine them with your localizations instead. | `Array<unknown>` |
| `casing?` | Casing styles that will be applied to if the localized value is a string. | One of `'lowerCase'`, `'localeLowercase'`, `'localeUpperCase'`, `'sentenceCase'`, `'titleCase'`, `'upperCase'` |
| `transform?` | Applies a transformation to the localized value. The localized value (after casing styles are applied) will be pass as a prop for your function. | `Function` |
| `allowEmpty` | Ignore warnings about empty keywords. | `bool` |

* **Returns:** The localized value.
* **Returns Type:** `string`

<br/>

## `snoozeInspectionUntil`
If your dictionary has not yet been completed and the warning about missing localizations bother you, you can use this to suppress the warning until a given date.

Deprecated since: 2.4.0 (Will be removed by March 2020)

Dictionary inspection do not happen by default in favor of performance, you can use `inspectDict` from `dev-additions` to run the inspection.
