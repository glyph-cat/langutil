import { devPrint } from '../dev-log'

// `spy` allows us to determine how many times a warning has been printed
// This helps us check if warnings are actually batched

export function createDebouncedWarning(spy) {
  const memoizedStack = []
  let missingLocalizations = {}
  let timer = null

  const debounce = (callback) => {
    return function () {
      clearTimeout(timer)
      timer = setTimeout(callback)
    }
  }

  const printWarning = debounce(() => {
    const mIndex = Object.keys(missingLocalizations)
    if (mIndex.length === 1) {
      // Show a one line warning for better readability
      const message = formatOneLineMissingLoc(missingLocalizations)
      devPrint('warn', message)
      if (typeof spy === 'function') {
        spy(message)
      }
    } else if (mIndex.length > 1) {
      const message = formatMultiLineMissingLoc(missingLocalizations)
      devPrint('warn', message)
      if (typeof spy === 'function') {
        spy(message)
      }
    }
    missingLocalizations = {}
  })

  /**
   * @param {string} language
   * @param {string} keyword
   */
  const pushWarning = (language, keyword) => {
    const memoKey = `${language},${keyword}`
    if (!memoizedStack.includes(memoKey)) {
      // Since these slots are dynamically allocated, we need to make sure
      // that every language has an array slot initialized before pushing anything in
      if (!missingLocalizations[language]) {
        missingLocalizations[language] = []
      }
      // Keywords themselves are pushed into missingLoc
      // so that they can all be logged at once later
      missingLocalizations[language].push(keyword)
      // Detected missing localizations are memoized so that they are only warned once
      memoizedStack.push(memoKey)
      printWarning()
    }
  }

  return { pushWarning }
}

export function formatOneLineMissingLoc(missingLocalizations) {
  const mIndex = Object.keys(missingLocalizations)
  const sortedKeywords = missingLocalizations[mIndex[0]]
  sortedKeywords.sort()
  return `Missing localizations (${mIndex[0]}): ${sortedKeywords.join(', ')}`
}

export function formatMultiLineMissingLoc(missingLocalizations) {
  const mIndex = Object.keys(missingLocalizations)
  let messageStack = []
  for (let i = 0; i < mIndex.length; i++) {
    const sortedKeywords = missingLocalizations[mIndex[i]]
    sortedKeywords.sort()
    messageStack.push(`(${mIndex[i]}): ${sortedKeywords.join(', ')}`)
  }
  messageStack.sort((a, b) => {
    // 1. Grab the front part (Eg: '(en): FOO' -> '(en')
    // 2. Remove the front bracket (Eg: '(en' -> 'en')
    const _a = a.match(/^\(.+(?=\):)/)[0].replace(/^\(/, '')
    const _b = b.match(/^\(.+(?=\):)/)[0].replace(/^\(/, '')
    return _a > _b ? 1 : -1
  })
  return `Missing localizations\n${messageStack.join('\n')}`
}
