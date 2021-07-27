import { IS_DIST_ENV } from '../../constants'
import { LangutilKeyword, LangutilLanguage } from '../../schema'
import { devPrint } from '../dev'

export type WarningDebouncer = (
  language: LangutilLanguage,
  keyword: LangutilKeyword
) => void

type MissingLocalizationsSchema = Record<LangutilLanguage, Array<LangutilKeyword>>

export function createWarningDebouncer(
  spy?: (msg: string) => void
): WarningDebouncer {
  const memoizedStack: Array<string> = []
  let missingLocalizations: MissingLocalizationsSchema = {}
  let timer: ReturnType<typeof setTimeout>

  const debounce = (callback: () => void) => {
    return function () {
      clearTimeout(timer)
      timer = setTimeout(callback)
    }
  }

  const printWarning = debounce((): void => {
    const mIndex = Object.keys(missingLocalizations)
    // Show a one line warning for better readability
    const message = mIndex.length === 1
      ? formatOneLineMissingLoc(missingLocalizations)
      : formatMultiLineMissingLoc(missingLocalizations)
    missingLocalizations = {}
    devPrint('warn', message)
    if (!IS_DIST_ENV && spy) { spy(message) }
  })

  const pushWarning = (
    language: LangutilLanguage,
    keyword: LangutilKeyword
  ): void => {
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

  return pushWarning
}

export function formatOneLineMissingLoc(
  missingLocalizations: MissingLocalizationsSchema
): string {
  const mIndex = Object.keys(missingLocalizations)
  const sortedKeywords = missingLocalizations[mIndex[0]]
  sortedKeywords.sort()
  return `Missing localizations (${mIndex[0]}): ${sortedKeywords.join(', ')}`
}

export function formatMultiLineMissingLoc(
  missingLocalizations: MissingLocalizationsSchema
): string {
  const mIndex = Object.keys(missingLocalizations)
  const messageStack: Array<string> = []
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
