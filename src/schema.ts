import { INTERNALS_SYMBOL } from './constants'
import { Watcher } from './main/watcher'

/**
 * @public
 */
export type LangutilLanguage<D> = keyof D

/**
 * @public
 */
export type LangutilKeyword<D> = keyof D[keyof D]

/**
 * @public
 */
export type LangutilLocalizedValue<D> = D[keyof D][keyof D[keyof D]] | string
// KIV: `| string`

/**
 * @public
 */
export type LangutilDictionaryIsolated = Record<string, Record<string, unknown>>

/**
 * @public
 */
export type LangutilLanguageIsolated = string

/**
 * @public
 */
export type LangutilKeywordIsolated = string

/**
 * @public
 */
export type LangutilAutoDetectFlag = boolean

/**
 * @public
 */
export interface LangutilState<D> {
  language: keyof D
  isAuto: boolean
}

/**
 * @public
 */
export interface LangutilInitOptions {
  auto?: boolean
  lifecycle?: {
    init(arg: {
      commit(state: LangutilState<LangutilDictionaryIsolated>): void
    }): void
    didSet?(details: { state: LangutilState<LangutilDictionaryIsolated> }): void
    didReset?(): void
  }
}

/**
 * @public
 */
export interface LangutilSetLanguageOptions extends Pick<LangutilInitOptions, 'auto'> {
  shouldRefresh?: boolean
}

/**
 * @public
 */
export type LangutilEventType = number

/**
 * @public
 */
export interface LangutilEvent<D> {
  type: LangutilEventType
  data: {
    oldLangState: LangutilState<D>
    newLangState: LangutilState<D>
  }
}

/**
 * @public
 */
export type LangutilStringMapParamArray = Array<unknown>

/**
 * @public
 */
export type LangutilStringMapParamObject = Record<string, unknown>

/**
 * @public
 */
export type LangutilStringMapParam =
  | LangutilStringMapParamArray
  | LangutilStringMapParamObject

/**
 * @public
 */
export interface LangutilMethodObjArgsLocalize<D> {
  keyword: LangutilKeyword<D>,
  param?: LangutilStringMapParam
}

/**
 * @public
 */
export interface LangutilMethodObjArgsLocalizeExplicitly<D> extends LangutilMethodObjArgsLocalize<D> {
  language: LangutilLanguage<D>
}

/**
 * @public
 */
export interface LangutilMethodObjArgsLocalizeFromScratch<Dn> extends LangutilMethodObjArgsLocalizeExplicitly<Dn> {
  dictionary: Dn
}

/**
 * @public
 */
export interface LangutilCore<D> {
  /**
   * @internal
   */
  [INTERNALS_SYMBOL]: {
    M$getDictionary?(): D
  }
  /**
   * Sets the language.
   * @public
   */
  setLanguage(
    language: LangutilLanguage<D>,
    options: LangutilSetLanguageOptions
  ): void,
  /**
   * Gets the current language.
   * @public
   */
  getLanguage(): LangutilLanguage<D>,
  /**
   * Lets you know the current language and whether automatic language detection
   * is available.
   * @public
   */
  getLangutilState(): LangutilState<D>,
  /**
   * Get all languages in the dictionary.
   * @public
   */
  getAllLanguages(): Array<LangutilLanguage<D>>
  /**
   * Replaces the current dictionary.
   * @public
   */
  setDictionary(dictionary: LangutilDictionaryIsolated): void
  /**
   * Merges a new dictionay with the current one.
   * @public
   */
  appendDictionary(dictionary: LangutilDictionaryIsolated): void
  /**
   * Maps a keyword to the current localization.
   * @public
   */
  localize(
    keyword: LangutilKeyword<D>,
    param?: LangutilStringMapParam
  ): LangutilLocalizedValue<D>
  localize(...args: [
    LangutilMethodObjArgsLocalize<D>,
    never?
  ]): LangutilLocalizedValue<D>
  /**
   * Maps a keyword to a custom localization.
   * @public
   */
  localizeExplicitly(
    language: LangutilLanguage<D>,
    keyword: LangutilKeyword<D>,
    param?: LangutilStringMapParam
  ): LangutilLocalizedValue<D>
  localizeExplicitly(...args: [
    LangutilMethodObjArgsLocalizeExplicitly<D>,
    never?,
    never?,
  ]): LangutilLocalizedValue<D>
  /**
   * Given a language, get a closest match based on the available languages in
   * the current dictionary.
   * @public
   */
  resolveLanguage(language: LangutilLanguageIsolated): LangutilLanguage<D>
  /**
   * Watch for changes when language is set or dictionary is set or appendded.
   * @public
   */
  watch: Watcher<LangutilEvent<D>>['M$watch']
}
