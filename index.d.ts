// === Dynamic types ===
// * Dictionary as `D`
// * Language as `keyof D`
// * Keyword as `keyof D[keyof D]`
// * Localized as `D[keyof D][keyof D[keyof D]]`

export interface LangState<D> {
  language: keyof D
  isAuto: boolean
}

export type LangutilLanguageOptions = {
  auto?: boolean
}

export const EVENT_TYPE_DICTIONARY: string
export const EVENT_TYPE_LANGUAGE: string
export type LangutilEventType = 'dictionary' | 'language'

export interface LangutilEvent<D> {
  type: LangutilEventType
  data: {
    oldLangState: LangState<D>
    newLangState: LangState<D>
  }
}

export interface LUsetLanguageInterface<D> {
  (
    language: keyof D,
    options?: LangutilLanguageOptions
  ): void
}

export interface LUgetAllLanguagesInterface<D> {
  (): Array<keyof D>
}

export interface LUgetLangStateInterface<D> {
  (): LangState<D>
}

export interface LUsetDictionaryInterface {
  (dictionary: object): void
}

export interface LUappendDictionaryInterface extends LUsetDictionaryInterface { }

export type StringMapParamType = Array<any> | Record<string, any>

export interface LangutilLocalizeInterface<D> {
  (
    keyword: keyof D[keyof D],
    param?: StringMapParamType
  ): D[keyof D][keyof D[keyof D]]
  (config: {
    keyword: keyof D[keyof D],
    param?: StringMapParamType
  }): D[keyof D][keyof D[keyof D]]
}

export interface LUlocalizeExplicitlyInterface<D> {
  (
    language: keyof D,
    keyword: keyof D[keyof D],
    param?: StringMapParamType
  ): D[keyof D][keyof D[keyof D]]
  (config: {
    language: keyof D,
    keyword: keyof D[keyof D],
    param?: StringMapParamType
  }): D[keyof D][keyof D[keyof D]]
}

export interface LUresolveLanguageInterface<D> {
  (language: keyof D | string): keyof D
}

export interface LangutilCore<D> {
  /**
   * @description Sets the language.
   */
  setLanguage: LUsetLanguageInterface<D>
  /**
   * @description Gets the current language.
   */
  getLanguage: () => keyof D
  /**
   * @description Get all languages in the dictionary.
   */
  getAllLanguages: LUgetAllLanguagesInterface<D>
  /**
   * @description Let's you know the current language and whether
   * automatic language detection is available.
   */
  getLangState: LUgetLangStateInterface<D>
  /**
   * @description Replaces the current dictionary.
   */
  setDictionary: LUsetDictionaryInterface
  /**
   * @description Merges a new dictionay with the current one.
   */
  appendDictionary: LUappendDictionaryInterface
  /**
   * @description Maps a keyword to the current localization.
   */
  localize: LangutilLocalizeInterface<D>
  /**
   * @description Maps a keyword to a custom localization.
   */
  localizeExplicitly: LUlocalizeExplicitlyInterface<D>
  /**
   * @description Maps a keyword to a custom localization from a
   * separate dictionary.
   */
  localizeFromScratch<Dn>(
    dictionary: Dn,
    language: keyof Dn,
    keyword: keyof Dn[keyof Dn],
    param?: StringMapParamType
  ): Dn[keyof Dn][keyof Dn[keyof Dn]]
  /**
   * @description Maps a keyword to a custom localization from a
   * separate dictionary.
   */
  localizeFromScratch<Dn>(config: {
    dictionary: Dn,
    language: keyof Dn,
    keyword: keyof Dn[keyof Dn],
    param?: StringMapParamType
  }): Dn[keyof Dn][keyof Dn[keyof Dn]]
  /**
   * @description Given a language, get a closest match based on
   * the available languages in the current dictionary.
   */
  resolveLanguage: LUresolveLanguageInterface<D>
  /**
   * @description Listen for changes when language is set or dictionary
   * is set or appendded.
   */
  addListener: (callback: (event: LangutilEvent<D>) => void) => number
  /**
   * @description Stop listening to changes.
   */
  removeListener: (listenerId: number) => void,
}

/**
 * @description Creates a Langutil Core instance.
 */
export function createLangutilCore<D>(
  dictionary: D,
  language: keyof D,
  options?: LangutilLanguageOptions
): LangutilCore<D>

/**
 * @description A function that maps values in arrays/objects to a string.
 * This is internally used by Langutil for inserting parameters into
 * localized values.
 */
export function stringMap(str: string, param: StringMapParamType): string
