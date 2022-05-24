import {
  IS_CLIENT_ENV,
  IS_DEBUG_ENV,
  LangutilEvents,
  TYPE_OBJECT,
} from '../../constants'
import { TYPE_ERROR_DICTIONARY_INVALID_TYPE } from '../../errors'
import { devInfo, devWarn, displayStringArray } from '../../internals/dev'
import { getMergedDictionary } from '../../internals/get-merged-dictionary'
import { baseLocalizer } from '../../internals/localizer'
import { getResolvedLanguageAnyToMany } from '../../internals/resolve-language'
import { WarningDebouncer } from '../../internals/warning-debouncer'
import { Watcher } from '../../internals/watcher'
import {
  LangutilCoreOptions,
  LangutilDictionaryIsolated,
  LangutilEvent,
  LangutilEventData,
  LangutilKeyword,
  LangutilLanguage,
  LangutilLocalizedValue,
  LangutilMethodObjArgsLocalize,
  LangutilMethodObjArgsLocalizeExplicitly,
  LangutilMethodObjArgsLocalizeFromScratch,
  LangutilState,
  LangutilStringmapParam,
} from '../../schema'
import { getClientLanguages } from '../get-client-languages'

/**
 * @internal
 */
const warningDebouncer = IS_DEBUG_ENV ? new WarningDebouncer() : undefined

/**
 * @internal
 */
const DEFAULT_LANGUTIL_CORE_OPTIONS: LangutilCoreOptions = {
  auto: false,
}

/**
 * @public
 */
export class LangutilCore<D = LangutilDictionaryIsolated> {

  /**
   * @internal
   */
  private M$initArgs: [D, LangutilLanguage<D>, LangutilCoreOptions]

  /**
   * @internal
   */
  M$dictionary: D = {} as D

  /**
   * @internal
   */
  M$language: LangutilLanguage<D> = null

  /**
   * @internal
   */
  M$coreOptions: LangutilCoreOptions = DEFAULT_LANGUTIL_CORE_OPTIONS

  /**
   * @internal
   */
  M$watcher = new Watcher<[LangutilEvent<D>]>()

  /**
   * @internal
   */
  M$dictionaryMutationCount = 0

  /**
   * @param dictionary - The source of localizations.
   * @param language - The language to localize to.
   * @param options - Additional options.
   * @public
   */
  constructor(
    dictionary: D,
    language: LangutilLanguage<D>,
    options?: LangutilCoreOptions
  ) {

    // === Cache init arguments ===
    const mergedOptions: LangutilCoreOptions = {
      ...DEFAULT_LANGUTIL_CORE_OPTIONS,
      ...options,
    }
    this.M$initArgs = [dictionary, language, mergedOptions]

    // === Method binding ===
    this.hydrate = this.hydrate.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
    this.getLanguage = this.getLanguage.bind(this)
    this.getLangutilState = this.getLangutilState.bind(this)
    this.getAllLanguages = this.getAllLanguages.bind(this)
    this.getDictionary = this.getDictionary.bind(this)
    this.setDictionary = this.setDictionary.bind(this)
    this.appendDictionary = this.appendDictionary.bind(this)
    this.localize = this.localize.bind(this)
    this.localizeExplicitly = this.localizeExplicitly.bind(this)
    this.createIsomorphicLocalizer = this.createIsomorphicLocalizer.bind(this)
    this.resolveLanguage = this.resolveLanguage.bind(this)
    this.safelyResolveLanguage = this.safelyResolveLanguage.bind(this)
    this.cloneInitial = this.cloneInitial.bind(this)
    this.cloneCurrent = this.cloneCurrent.bind(this)
    this.watch = this.watch.bind(this)

    // === Miscellaneous code execution ===
    this.hydrate(dictionary, language, mergedOptions)

  }

  /**
   * @internal
   */
  private M$setLanguageBase = (
    language: LangutilLanguage<D>,
    options?: LangutilCoreOptions
  ): LangutilEventData<D> => {

    const oldLangutilState = { ...this.getLangutilState() }

    // Immediately assign new values, if is not auto or auto detect fails
    // it will fallback to these values
    let newLanguage = language
    const newAuto = options?.auto === true

    if (newAuto) {
      const rawDetectedLanguage = getClientLanguages()
      const resolvedLanguage = this.resolveLanguage(rawDetectedLanguage)
      if (resolvedLanguage) {
        newLanguage = resolvedLanguage
        devInfo(`Automatically recognized language: ${resolvedLanguage}`)
      } else {
        devInfo(
          `Unable to automatically recognize language, falling back to ${language}`
        )
      }
    } else {
      // Check if language exists in dictionary
      if (!this.M$dictionary[language]) {
        // NOTE: Must wrap in `if (IS_DEBUG_ENV) { ... }` otherwise terser will
        // still include code for `displayStringArray` in the minified bundles.
        if (IS_DEBUG_ENV) {
          devWarn(
            `The language '${language}' does not exist within the ` +
            'dictionary, available languages: ' +
            displayStringArray(this.getAllLanguages() as Array<string>) + '.'
          )
        }
      }
    }

    this.M$language = newLanguage
    this.M$coreOptions = {
      ...this.M$coreOptions,
      auto: newAuto,
    }

    const newLangutilState = this.getLangutilState()
    return {
      state: {
        previous: oldLangutilState,
        current: newLangutilState,
      }
    }

  }

  /**
   * @internal
   */
  private M$setDictionaryBase = (
    dictionary: LangutilDictionaryIsolated
  ): LangutilEventData<D> => {
    if (typeof dictionary !== TYPE_OBJECT) {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    this.M$dictionary = dictionary as unknown as D
    this.M$dictionaryMutationCount += 1
    return {
      state: {
        // Get the values separately to prevent hard-to-debug mutability issues
        previous: this.getLangutilState(),
        current: this.getLangutilState(),
      }
    }
  }

  /**
   * @param dictionary - The source of localizations.
   * @param language - The language to localize to.
   * @param options - Additional options.
   * @public
   */
  hydrate(
    dictionary: D | null,
    language: LangutilLanguage<D>,
    options?: LangutilCoreOptions
  ): void {
    if (dictionary) {
      this.M$setDictionaryBase(
        dictionary as unknown as LangutilDictionaryIsolated
      )
    }
    const eventData = this.M$setLanguageBase(language, options)
    this.M$watcher.M$refresh({
      type: LangutilEvents.hydration,
      data: eventData,
    })
  }

  /**
   * Sets the language.
   * @public
   */
  setLanguage(
    language: LangutilLanguage<D>,
    options?: LangutilCoreOptions
  ): void {
    const eventData = this.M$setLanguageBase(language, options)
    this.M$watcher.M$refresh({
      type: LangutilEvents.language,
      data: eventData,
    })
  }

  /**
   * Get the current language.
   * @public
   */
  getLanguage(): LangutilLanguage<D> {
    return this.M$language
  }

  /**
   * Lets you know the current language and whether automatic language detection
   * is enabled.
   * @public
   */
  getLangutilState(): LangutilState<D> {
    return {
      isAuto: this.M$coreOptions.auto,
      language: this.M$language,
    }
  }

  /**
   * Get all languages in the dictionary.
   * @public
   */
  getAllLanguages(): Array<LangutilLanguage<D>> {
    return Object.keys(this.M$dictionary) as Array<LangutilLanguage<D>>
  }

  /**
   * Get the current dictionary.
   * CAUTION: The returned value is a direct reference, mutating it will cause
   * unwanted and hard-to-debug problems.
   * @public
   */
  getDictionary(): D {
    return this.M$dictionary
  }

  /**
   * Replaces the current dictionary.
   * @public
   */
  setDictionary(dictionary: LangutilDictionaryIsolated): void {
    const eventData = this.M$setDictionaryBase(dictionary)
    this.M$watcher.M$refresh({
      type: LangutilEvents.dictionarySet,
      data: eventData,
    })
  }

  /**
   * Merges a new dictionay with the current one.
   * @public
   */
  appendDictionary(dictionary: LangutilDictionaryIsolated): void {
    if (typeof dictionary !== TYPE_OBJECT) {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    const eventData = this.M$setDictionaryBase(
      getMergedDictionary(
        this.M$dictionary as unknown as LangutilDictionaryIsolated,
        dictionary
      )
    )
    this.M$watcher.M$refresh({
      type: LangutilEvents.dictionaryAppend,
      data: eventData,
    })
  }

  /**
   * Maps a keyword to the current localization.
   * @public
   */
  localize(
    keyword: LangutilKeyword<D>,
    param?: LangutilStringmapParam
  ): LangutilLocalizedValue<D>

  /**
   * Maps a keyword to the current localization.
   * @public
   */
  localize(...args: [
    LangutilMethodObjArgsLocalize<D>,
    never?
  ]): LangutilLocalizedValue<D>

  /**
   * @internal
   */
  localize(
    a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
    b?: LangutilStringmapParam
  ): LangutilLocalizedValue<D> {
    if (typeof a !== TYPE_OBJECT) {
      return baseLocalizer(
        this.M$dictionary,
        this.M$language,
        a as LangutilKeyword<D>,
        b,
        warningDebouncer
      )
    } else {
      return baseLocalizer(
        this.M$dictionary,
        this.M$language,
        (a as LangutilMethodObjArgsLocalize<D>).keyword,
        (a as LangutilMethodObjArgsLocalize<D>).param,
        warningDebouncer
      )
    }
  }

  /**
   * Maps a keyword to a custom localization.
   * @public
   */
  localizeExplicitly(
    language: LangutilLanguage<D>,
    keyword: LangutilKeyword<D>,
    param?: LangutilStringmapParam
  ): LangutilLocalizedValue<D>

  /**
   * Maps a keyword to a custom localization.
   * @public
   */
  localizeExplicitly(...args: [
    LangutilMethodObjArgsLocalizeExplicitly<D>,
    never?,
    never?,
  ]): LangutilLocalizedValue<D>

  /**
   * @internal
   */
  localizeExplicitly(
    a: LangutilLanguage<D> | LangutilMethodObjArgsLocalizeExplicitly<D>,
    b: LangutilKeyword<D>,
    c?: LangutilStringmapParam
  ): LangutilLocalizedValue<D> {
    if (typeof a !== TYPE_OBJECT) {
      return baseLocalizer(
        this.M$dictionary,
        a as LangutilLanguage<D>,
        b,
        c,
        warningDebouncer
      )
    } else {
      return baseLocalizer(
        this.M$dictionary,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).language,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).keyword,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).param,
        warningDebouncer
      )
    }
  }

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
  ) => LangutilLocalizedValue<D>) {
    if (IS_CLIENT_ENV) {
      return (
        a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
        b: LangutilStringmapParam
        // @ts-expect-error The call would have succeeded against this
        // implementation, but implementation signatures of overloads are not
        // externally visible.
      ) => this.localize(a, b)
    } else {
      return (
        a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
        b: LangutilStringmapParam
      ) => {
        const safeBaseLanguage = this.safelyResolveLanguage(baseLanguage)
        if (typeof a !== TYPE_OBJECT) {
          return this.localizeExplicitly(
            safeBaseLanguage,
            a as LangutilKeyword<D>,
            b
          )
        } else {
          return this.localizeExplicitly(
            safeBaseLanguage,
            (a as LangutilMethodObjArgsLocalize<D>).keyword,
            (a as LangutilMethodObjArgsLocalize<D>).param
          )
        }
      }
    }
  }

  /**
   * Given a language, get a closest match based on the available languages in
   * the current dictionary.
   * @public
   * @returns A string representing the language, if resolvable, otherwise `null`.
   */
  resolveLanguage(
    language: Array<LangutilLanguage> | LangutilLanguage
  ): LangutilLanguage<D> {
    return getResolvedLanguageAnyToMany(language, this.getAllLanguages())
  }

  /**
   * Given a language, get a closest match based on the available languages in
   * the current dictionary.
   * @public
   * @returns A string representing the language, if resolvable, otherwise the
   * first language that is available in the dictionary will be selected.
   */
  safelyResolveLanguage(
    language: Array<LangutilLanguage> | LangutilLanguage
  ): LangutilLanguage<D> {
    return this.resolveLanguage(language) ||
      Object.keys(this.M$dictionary)[0] as LangutilLanguage<D>
  }

  /**
   * Creates a copy of this {@link LangutilCore} with its initial configuration.
   * @public
   */
  cloneInitial(): LangutilCore<D> {
    // NOTE: Spread operator in 'new' expressions is only available when
    // targeting ECMAScript 5 and higher.
    return new LangutilCore(...this.M$initArgs)
  }

  /**
   * Creates a copy of this {@link LangutilCore} with its current configuration.
   * @public
   */
  cloneCurrent(): LangutilCore<D> {
    return new LangutilCore(
      this.M$dictionary,
      this.M$language,
      this.M$coreOptions,
    )
  }

  /**
   * Watch for changes when language or dictionary changes.
   * @public
   */
  watch(callback: ((event: LangutilEvent<D>) => void)): (() => void) {
    return this.M$watcher.M$watch(callback)
  }

}

/**
 * Creates a `LangutilCore` instance.
 * @deprecated Please use {@link LangutilCore} instead.
 * @public
 */
export function createLangutilCore<D extends LangutilDictionaryIsolated>(
  dictionary: D,
  language: LangutilLanguage<D>,
  options?: LangutilCoreOptions
): LangutilCore<D> {
  return new LangutilCore(dictionary, language, options)
}

/**
 * Same as `createLangutilCore`. See example.
 * @example
 * // Both are equally valid.
 *
 * import Langutil from 'langutil'
 * Langutil.createCore()
 *
 * import { createLangutilCore } from 'langutil'
 * createLangutilCore()
 *
 * @deprecated Please use {@link LangutilCore} instead.
 * @public
 */
export const createCore = createLangutilCore

/**
 * @public
 */
export function localizeFromScratch<Dn>(
  dictionary: Dn,
  language: LangutilLanguage<Dn>,
  keyword: LangutilKeyword<Dn>,
  param?: LangutilStringmapParam
): LangutilLocalizedValue<Dn>

/**
 * @public
 */
export function localizeFromScratch<Dn>(...args: [
  Dn,
  LangutilMethodObjArgsLocalizeFromScratch<Dn>,
  never?,
  never?,
]): LangutilLocalizedValue<Dn>

/**
 * @public
 */
export function localizeFromScratch<Dn>(
  dictionary: Dn,
  a: LangutilLanguage<Dn> | LangutilMethodObjArgsLocalizeFromScratch<Dn>,
  b: LangutilKeyword<Dn>,
  c?: LangutilStringmapParam
): LangutilLocalizedValue<Dn> {
  // NOTE: `dictionary` cannot be part of the a,b,c because the dictionary
  // itself is an object, which means `isByObj` will always evaluate to true
  if (typeof a !== TYPE_OBJECT) {
    return baseLocalizer(
      dictionary,
      a as LangutilLanguage<Dn>,
      b,
      c,
      warningDebouncer
    )
  } else {
    return baseLocalizer(
      dictionary,
      (a as LangutilMethodObjArgsLocalizeFromScratch<Dn>).language,
      (a as LangutilMethodObjArgsLocalizeFromScratch<Dn>).keyword,
      (a as LangutilMethodObjArgsLocalizeFromScratch<Dn>).param,
      warningDebouncer
    )
  }
}

/**
 * @public
 * @deprecated Please use the
 * [instanceof](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/instanceof)
 * operator in conjunction with {@link LangutilCore}` instead.
 */
export function isLangutilCore(value: unknown): value is LangutilCore {
  return value instanceof LangutilCore
}
