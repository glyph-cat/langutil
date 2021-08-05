# Testing Recipes

You can check if your dictionary contains missing localizations with the code snippet below. The code below uses [Jest](https://jestjs.io).

```js
import dictionary from './path/to/dictionary'

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
