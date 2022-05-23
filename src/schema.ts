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
export interface LangutilEventData<D = LangutilDictionaryIsolated> {
  state: {
    previous: LangutilState<D>
    current: LangutilState<D>
  }
}

/**
 * @public
 */
export interface LangutilEvent<D = LangutilDictionaryIsolated> {
  type: LangutilEventType
  data: LangutilEventData<D>
}

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
