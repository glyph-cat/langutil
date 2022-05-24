import { IS_INTERNAL_DEBUG_ENV } from '../../constants'
import { LangutilKeyword, LangutilLanguage } from '../../schema'
import { devWarn } from '../dev'

/**
 * @internal
 */
type SpyCallback = (msg: string) => void

/**
 * @internal
 */
export class WarningDebouncer {

  memoizedStack: Array<string> = []
  missingLocalizations: MissingLocalizationsSchema = {}
  timer: ReturnType<typeof setTimeout>
  spy: SpyCallback

  constructor(spy?: (msg: string) => void) {
    this.spy = spy
  }

  M$debounce = (callback: (() => void)): (() => void) => {
    return (): void => {
      clearTimeout(this.timer)
      this.timer = setTimeout(callback)
    }
  }

  M$printWarning = this.M$debounce((): void => {
    const mIndex = Object.keys(this.missingLocalizations)
    // Show a one line warning for better readability
    const message = mIndex.length === 1
      ? formatOneLineMissingLoc(this.missingLocalizations)
      : formatMultiLineMissingLoc(this.missingLocalizations)
    this.missingLocalizations = {}
    devWarn(message)
    if (IS_INTERNAL_DEBUG_ENV) {
      // NOTE: Must be nested otherwise terser will not be able to completely
      // remove it.
      if (typeof this.spy === 'function') {
        this.spy(message)
      }
    }
  })

  M$pushWarning = (
    language: LangutilLanguage,
    keyword: LangutilKeyword
  ): void => {
    const memoKey = `${language},${keyword}`
    if (!this.memoizedStack.includes(memoKey)) {
      // Since these slots are dynamically allocated, we need to make sure
      // that every language has an array slot initialized before pushing anything in
      if (!this.missingLocalizations[language]) {
        this.missingLocalizations[language] = []
      }
      // Keywords themselves are pushed into missingLoc
      // so that they can all be logged at once later
      this.missingLocalizations[language].push(keyword)
      // Detected missing localizations are memoized so that they are only warned once
      this.memoizedStack.push(memoKey)
      this.M$printWarning()
    }
  }

}

/**
 * @internal
 */
type MissingLocalizationsSchema = Record<LangutilLanguage, Array<LangutilKeyword>>

/**
 * @internal
 */
export function formatOneLineMissingLoc(
  missingLocalizations: MissingLocalizationsSchema
): string {
  const mIndex = Object.keys(missingLocalizations)
  const sortedKeywords = missingLocalizations[mIndex[0]]
  sortedKeywords.sort()
  return `Missing localizations (${mIndex[0]}): ${sortedKeywords.join(', ')}`
}

/**
 * @internal
 */
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
