import { INTERNALS_SYMBOL } from './constants'
import { Watcher } from './main/watcher'

/**
 * @public
 */
export type LangutilDictionaryIsolated = Record<string, Record<string, unknown>>

/**
 * @public
 */
export type LangutilLanguage<D = LangutilDictionaryIsolated> = keyof D

// /**
//  * @public
//  */
// export type LangutilLanguageLenient<D = LangutilDictionaryIsolated> =
//   | LangutilLanguage<D>
//   | (string & {}) // eslint-disable-line @typescript-eslint/ban-types

/**
 * @public
 */
export type LangutilKeyword<D = LangutilDictionaryIsolated> =
  | keyof D[keyof D]
  | (string & {}) // eslint-disable-line @typescript-eslint/ban-types
// NOTE: This allows for auto-complete while still maintaining the flexibility
// to input a value that is not originally in the dictionary.
// By adding `| (string & {})`, we are able to provide some leniency for methods
// like `setDictionary` and `appendDictionary` so that TypeScript doesn't
// complain about invalid types.

/**
 * @public
 */
export type LangutilLocalizedValue<D = LangutilDictionaryIsolated> = D[keyof D][keyof D[keyof D]] | string

/**
 * @public
 */
export type LangutilAutoDetectFlag = boolean

/**
 * @public
 */
export interface LangutilState<D = LangutilDictionaryIsolated> {
  language: keyof D
  isAuto: boolean
}

/**
 * @public
 */
export interface LangutilInitOptions {
  auto?: boolean
}

/**
 * @public
 */
export type LangutilSetLanguageOptions = LangutilInitOptions

/**
 * @public
 */
export type LangutilEventType = number

/**
 * @public
 */
export interface LangutilEvent<D = LangutilDictionaryIsolated> {
  type: LangutilEventType
  data: {
    oldLangState: LangutilState<D>
    newLangState: LangutilState<D>
  }
}

// /**
//  * @public
//  */
// export type LangutilEventCallback<D = LangutilDictionaryIsolated> = Watcher<LangutilEvent<D>>['M$watch']

/**
 * @public
 */
export type LangutilStringmapParamArray = Array<unknown>

/**
 * @public
 */
export type LangutilStringmapParamObject = Record<string, unknown>

/**
 * @public
 */
export type LangutilStringmapParam =
  | LangutilStringmapParamArray
  | LangutilStringmapParamObject

/**
 * @public
 */
export interface LangutilMethodObjArgsLocalize<D = LangutilDictionaryIsolated> {
  keyword: LangutilKeyword<D>,
  param?: LangutilStringmapParam
}

/**
 * @public
 */
export interface LangutilMethodObjArgsLocalizeExplicitly<D = LangutilDictionaryIsolated> extends LangutilMethodObjArgsLocalize<D> {
  language: LangutilLanguage<D>
}

/**
 * @public
 */
export type LangutilMethodObjArgsLocalizeFromScratch<Dn = LangutilDictionaryIsolated> = LangutilMethodObjArgsLocalizeExplicitly<Dn>

/**
 * @public
 */
export interface LangutilCore<D = LangutilDictionaryIsolated> {
  /**
   * @internal
   */
  [INTERNALS_SYMBOL]: {
    getDictionary?(): D
  }
  hydrate(
    dictionary: D,
    language: LangutilLanguage<D>,
    options?: LangutilInitOptions
  ): void
  /**
   * Sets the language.
   * @public
   */
  setLanguage(
    language: LangutilLanguage<D>,
    options?: LangutilSetLanguageOptions
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
    param?: LangutilStringmapParam
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
    param?: LangutilStringmapParam
  ): LangutilLocalizedValue<D>
  localizeExplicitly(...args: [
    LangutilMethodObjArgsLocalizeExplicitly<D>,
    never?,
    never?,
  ]): LangutilLocalizedValue<D>
  /**
   * Creates an isomorphic `localize` function. When executed in the server,
   * values will be localized according to the language from the request header,
   * when executed in a browser, values will be localized based on the user
   * preference persisted in the browser or the default values.
   * @public
   * @param baseLanguage The language from request the header.
   */
  createIsomorphicLocalizer(baseLanguage: LangutilLanguage): ((
    a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
    b?: LangutilStringmapParam
  ) => LangutilLocalizedValue<D>)
  /**
   * Given a language, get a closest match based on the available languages in
   * the current dictionary.
   * @public
   * @returns A string representing the language, if resolvable, otherwise null.
   */
  resolveLanguage(
    language: Array<LangutilLanguage> | LangutilLanguage
  ): LangutilLanguage<D>
  /**
   * Given a language, get a closest match based on the available languages in
   * the current dictionary.
   * @public
   * @returns A string representing the language, if resolvable, otherwise the
   * first language that is available in the dictionary will be selected.
   */
  safelyResolveLanguage(
    language: Array<LangutilLanguage> | LangutilLanguage
  ): LangutilLanguage<D>
  /**
   * Creates a copy of the Langutil core with the initial configuration.
   * @public
   */
  cloneInitial(): LangutilCore<D>
  /**
   * Creates a copy of the Langutil core with the current configuration.
   * @public
   */
  cloneCurrent(): LangutilCore<D>
  /**
   * Watch for changes when language is set or dictionary is set or appendded.
   * @public
   */
  watch: Watcher<LangutilEvent<D>>['M$watch'] // LangutilEventCallback<D>
}
