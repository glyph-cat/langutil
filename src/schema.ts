import { INTERNALS_SYMBOL } from './constants'
import { Watcher } from './main/watcher'

// === Dynamic types ===
// * Dictionary as `D`
// * Language as `keyof D`
// * Keyword as `keyof D[keyof D]`
// * Localized as `D[keyof D][keyof D[keyof D]]`

export type LangutilLanguage<D> = keyof D
export type LangutilKeyword<D> = keyof D[keyof D]
export type LangutilLocalizedValue<D> = D[keyof D][keyof D[keyof D]] | string
// KIV: `| string`

export type LangutilDictionaryIsolated = Record<string, Record<string, unknown>>
export type LangutilLanguageIsolated = string
export type LangutilKeywordIsolated = string
export type LangutilAutoDetectFlag = boolean

export interface LangutilState<D> {
  language: keyof D
  isAuto: boolean
}

export interface LangutilHydrationCommitter<S> {
  commit: (state: S) => void
}

export interface LangutilInitOptions {
  auto?: boolean
  lifecycle?: {
    init(
      config: LangutilHydrationCommitter<LangutilState<LangutilDictionaryIsolated>>
    ): void
    didSet?(details: { state: LangutilState<LangutilDictionaryIsolated> }): void
    didReset?(): void
  }
}

export interface LangutilSetLanguageOptions extends Pick<LangutilInitOptions, 'auto'> {
  shouldRefresh?: boolean
}

export type LangutilEventType = number

export interface LangutilEvent<D> {
  type: LangutilEventType
  data: {
    oldLangState: LangutilState<D>
    newLangState: LangutilState<D>
  }
}

export type LangutilStringMapParamArray = Array<unknown>
export type LangutilStringMapParamObject = Record<string, unknown>
export type LangutilStringMapParam =
  | LangutilStringMapParamArray
  | LangutilStringMapParamObject

// === Localization methods: `localize` ===

export interface LangutilMethodObjArgsLocalize<D> {
  keyword: LangutilKeyword<D>,
  param?: LangutilStringMapParam
}

export type LangutilMethodArgsLocalize<D> =
  | [LangutilKeyword<D>, LangutilStringMapParam]
  | [LangutilMethodObjArgsLocalize<D>]

// === Localization methods: `localizeExplicitly` ===

export interface LangutilMethodObjArgsLocalizeExplicitly<D> extends LangutilMethodObjArgsLocalize<D> {
  language: LangutilLanguage<D>
}

export type LangutilMethodArgsLocalizeExplicitly<D> =
  | [LangutilLanguage<D>, LangutilKeyword<D>, LangutilStringMapParam]
  | [LangutilMethodObjArgsLocalizeExplicitly<D>]




// === Localization methods: `localizeFromScratch` ===

export interface LangutilMethodObjArgsLocalizeFromScratch<Dn> extends LangutilMethodObjArgsLocalizeExplicitly<Dn> {
  dictionary: Dn
}

export type LangutilMethodArgsLocalizeFromScratch<Dn> =
  | [Dn, LangutilLanguage<Dn>, LangutilKeyword<Dn>, LangutilStringMapParam]
  | [Dn, LangutilMethodObjArgsLocalizeFromScratch<Dn>]

export interface LangutilCore<D> {
  [INTERNALS_SYMBOL]: {
    M$getDictionary?(): D
  }
  /**
   * Sets the language.
   */
  setLanguage(
    language: LangutilLanguage<D>,
    options: LangutilSetLanguageOptions
  ): void,
  /**
   * Gets the current language.
   */
  getLanguage(): LangutilLanguage<D>,
  /**
   * Lets you know the current language and whether automatic language detection
   * is available.
   */
  getLangutilState(): LangutilState<D>,
  /**
   * Get all languages in the dictionary.
   */
  getAllLanguages(): Array<LangutilLanguage<D>>
  /**
   * Replaces the current dictionary.
   */
  setDictionary(dictionary: LangutilDictionaryIsolated): void
  /**
   * Merges a new dictionay with the current one.
   */
  appendDictionary(dictionary: LangutilDictionaryIsolated): void
  /**
   * Maps a keyword to the current localization.
   */
  localize(...args: LangutilMethodArgsLocalize<D>): LangutilLocalizedValue<D>
  /**
   * Maps a keyword to a custom localization.
   */
  localizeExplicitly(
    ...args: LangutilMethodArgsLocalizeExplicitly<D>
  ): LangutilLocalizedValue<D>
  /**
   * Given a language, get a closest match based on the available languages in
   * the current dictionary.
   */
  resolveLanguage(language: LangutilLanguageIsolated): LangutilLanguage<D>
  /**
   * Watch for changes when language is set or dictionary is set or appendded.
   */
  watch: Watcher<LangutilEvent<D>>['M$watch']
}
