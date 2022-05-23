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
import { createWarningDebouncer } from '../../internals/warning-debouncer'
import { Watcher } from '../../internals/watcher'
import {
  LangutilDictionaryIsolated,
  LangutilEvent,
  LangutilEventData,
  LangutilInitOptions,
  LangutilKeyword,
  LangutilLanguage,
  LangutilLocalizedValue,
  LangutilMethodObjArgsLocalize,
  LangutilMethodObjArgsLocalizeExplicitly,
  LangutilMethodObjArgsLocalizeFromScratch,
  LangutilSetLanguageOptions,
  LangutilState,
  LangutilStringmapParam,
} from '../../schema'
import { getClientLanguages } from '../get-client-languages'

/**
 * @internal
 */
const pushWarning = IS_DEBUG_ENV ? createWarningDebouncer() : undefined

/**
 * @public
 */
export class LangutilCore<D = LangutilDictionaryIsolated> {

  // /**
  //  * @internal
  //  */
  // private M$initArgs: [D, LangutilLanguage<D>, LangutilInitOptions]
  // TOFIX: 'M$initArgs' is declared but its value is never read.

  /**
   * @internal
   */
  M$dictionary: D

  /**
   * @internal
   */
  M$language: LangutilLanguage<D> = null

  /**
   * @internal
   */
  M$isAuto = false

  /**
   * @internal
   */
  M$watcher = new Watcher<[LangutilEvent<D>]>()

  // TODO: docs
  /**
   * @param dictionary
   * @param language
   * @param options
   * @public
   */
  constructor(
    dictionary: D,
    language: LangutilLanguage<D>,
    options?: LangutilInitOptions
  ) {
    this.M$dictionary = {} as D
    this.hydrate(dictionary, language, options)
    // this.M$initArgs = [dictionary, language, options]
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
  }

  /**
   * @internal
   */
  private M$setLanguageBase = (
    language: LangutilLanguage<D>,
    options?: LangutilSetLanguageOptions
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
    this.M$isAuto = newAuto

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
    return {
      state: {
        // Separately get the values to prevent hard-to-debug mutability issues
        previous: this.getLangutilState(),
        current: this.getLangutilState(),
      }
    }
  }

  // TODO: docs (can copy from `constructor`)
  /**
   * @param dictionary
   * @param language
   * @param options
   * @public
   */
  hydrate(
    dictionary: D | null,
    language: LangutilLanguage<D>,
    options?: LangutilInitOptions
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
    options?: LangutilSetLanguageOptions
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
      isAuto: this.M$isAuto,
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
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    this.M$dictionary = getMergedDictionary(
      this.M$dictionary as unknown as LangutilDictionaryIsolated,
      dictionary
    ) as unknown as D
    this.M$watcher.M$refresh({
      type: LangutilEvents.dictionaryAppend,
      data: {
        state: {
          // Separately get the values to prevent hard-to-debug mutability issues
          previous: this.getLangutilState(),
          current: this.getLangutilState(),
        }
      },
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
        pushWarning
      )
    } else {
      return baseLocalizer(
        this.M$dictionary,
        this.M$language,
        (a as LangutilMethodObjArgsLocalize<D>).keyword,
        (a as LangutilMethodObjArgsLocalize<D>).param,
        pushWarning
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
        pushWarning
      )
    } else {
      return baseLocalizer(
        this.M$dictionary,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).language,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).keyword,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).param,
        pushWarning
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
    return // new LangutilCore()
  }

  /**
   * Creates a copy of this {@link LangutilCore} with its current configuration.
   * @public
   */
  cloneCurrent(): LangutilCore<D> {
    return new LangutilCore(
      this.M$dictionary,
      this.M$language,
      { auto: this.M$isAuto }
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

// interface LangutilCoreInternalInstance<D> {
//   M$dictionary: D
//   M$language: keyof D
//   M$isAuto: LangutilAutoDetectFlag
//   M$watcher: Watcher<[LangutilEvent<D>]>
//   M$refresh(event: LangutilEvent<D>): void
// }

// export function createLangutilCore_OLD<D extends LangutilDictionaryIsolated>(
//   ...initArgs: [D, LangutilLanguage<D>, LangutilInitOptions?]
// ): LangutilCore<D> {

//   const self: LangutilCoreInternalInstance<D> = {
//     M$dictionary: ({} as D),
//     M$language: null,
//     M$isAuto: false,
//     M$watcher: new Watcher<[LangutilEvent<D>]>(),
//     M$refresh: (event: LangutilEvent<D>) => {
//       self.M$watcher.M$refresh(event)
//     },
//   }

//   // === Getters ===

//   const getLanguage = (): LangutilLanguage<D> => self.M$language

//   const getLangutilState = (): LangutilState<D> => ({
//     isAuto: self.M$isAuto,
//     language: self.M$language,
//   })

//   const getAllLanguages = (): Array<LangutilLanguage<D>> => Object.keys(
//     self.M$dictionary
//   )

//   const getDictionary = (): D => self.M$dictionary

//   // === Base Methods ===

//   const __setLanguageBase = (
//     language: LangutilLanguage<D>,
//     options?: LangutilSetLanguageOptions
//   ): LangutilEventData<D> => {
//     const oldLangutilState = { ...getLangutilState() }

//     // Immediately assign new values, if is not auto or auto detect fails
//     // it will fallback to these values
//     let newLanguage = language
//     const newAuto = options?.auto === true

//     if (newAuto) {
//       const rawDetectedLanguage = getClientLanguages()
//       const resolvedLanguage = resolveLanguage(rawDetectedLanguage)
//       if (resolvedLanguage) {
//         newLanguage = resolvedLanguage
//         devInfo(`Automatically recognized language: ${resolvedLanguage}`)
//       } else {
//         devInfo(
//           `Unable to automatically recognize language, falling back to ${language}`
//         )
//       }
//     } else {
//       // Check if language exists in dictionary
//       if (!self.M$dictionary[language]) {
//         // NOTE: Must wrap in `if (IS_DEBUG_ENV) { ... }` otherwise terser will
//         // still include code for `displayStringArray` in the minified bundles.
//         if (IS_DEBUG_ENV) {
//           devWarn(
//             `The language '${language}' does not exist within the ` +
//             'dictionary, available languages: ' +
//             displayStringArray(getAllLanguages() as Array<string>) + '.'
//           )
//         }
//       }
//     }

//     self.M$language = newLanguage
//     self.M$isAuto = newAuto

//     const newLangutilState = getLangutilState()
//     return {
//       state: {
//         previous: oldLangutilState,
//         current: newLangutilState,
//       }
//     }
//   }

//   const __setDictionaryBase = (
//     dictionary: LangutilDictionaryIsolated
//   ): LangutilEventData<D> => {
//     if (typeof dictionary !== TYPE_OBJECT) {
//       throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
//     }
//     // Note: Type of dictionary that is set or appended at runtime is unavailable
//     self.M$dictionary = dictionary as D
//     return {
//       state: {
//         // Separately get the values to prevent hard-to-debug mutability issues
//         previous: getLangutilState(),
//         current: getLangutilState(),
//       }
//     }
//   }

//   // === Setters ===

//   const hydrate = (
//     ...hydrateArgs: [D, LangutilLanguage<D>, LangutilInitOptions?]
//   ): void => {
//     const [dictionary, language, options] = hydrateArgs
//     // NOTE: dictionary is optional here
//     if (dictionary) { __setDictionaryBase(dictionary) }
//     const eventData = __setLanguageBase(language, options)
//     self.M$refresh({
//       type: LangutilEvents.hydration,
//       data: eventData,
//     })
//   }

//   const setLanguage = (
//     language: LangutilLanguage<D>,
//     options?: LangutilSetLanguageOptions
//   ): void => {
//     const eventData = __setLanguageBase(language, options)
//     self.M$refresh({
//       type: LangutilEvents.language,
//       data: eventData,
//     })
//   }

//   const setDictionary = (dictionary: LangutilDictionaryIsolated): void => {
//     const eventData = __setDictionaryBase(dictionary)
//     self.M$refresh({
//       type: LangutilEvents.dictionarySet,
//       data: eventData,
//     })
//   }

//   const appendDictionary = (dictionary: LangutilDictionaryIsolated) => {
//     if (typeof dictionary !== TYPE_OBJECT) {
//       throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
//     }
//     // Note: Type of dictionary that is set or appended at runtime is unavailable
//     self.M$dictionary = getMergedDictionary(self.M$dictionary, dictionary) as D
//     self.M$refresh({
//       type: LangutilEvents.dictionaryAppend,
//       data: {
//         state: {
//           // Separately get the values to prevent hard-to-debug mutability issues
//           previous: getLangutilState(),
//           current: getLangutilState(),
//         }
//       },
//     })
//   }

//   // === Other Exposed Methods ===

//   const localize = (
//     a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
//     b?: LangutilStringmapParam
//   ): LangutilLocalizedValue<D> => {
//     if (typeof a !== TYPE_OBJECT) {
//       return baseLocalizer(
//         self.M$dictionary,
//         self.M$language,
//         a as LangutilKeyword<D>,
//         b,
//         pushWarning
//       )
//     } else {
//       return baseLocalizer(
//         self.M$dictionary,
//         self.M$language,
//         (a as LangutilMethodObjArgsLocalize<D>).keyword,
//         (a as LangutilMethodObjArgsLocalize<D>).param,
//         pushWarning
//       )
//     }
//   }

//   const localizeExplicitly = (
//     a: LangutilLanguage<D> | LangutilMethodObjArgsLocalizeExplicitly<D>,
//     b: LangutilKeyword<D>,
//     c?: LangutilStringmapParam
//   ): LangutilLocalizedValue<D> => {
//     if (typeof a !== TYPE_OBJECT) {
//       return baseLocalizer(
//         self.M$dictionary,
//         a as LangutilLanguage<D>,
//         b,
//         c,
//         pushWarning
//       )
//     } else {
//       return baseLocalizer(
//         self.M$dictionary,
//         (a as LangutilMethodObjArgsLocalizeExplicitly<D>).language,
//         (a as LangutilMethodObjArgsLocalizeExplicitly<D>).keyword,
//         (a as LangutilMethodObjArgsLocalizeExplicitly<D>).param,
//         pushWarning
//       )
//     }
//   }

//   const createIsomorphicLocalizer = (
//     baseLanguage: LangutilLanguage
//   ): ((
//     a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
//     b?: LangutilStringmapParam
//   ) => LangutilLocalizedValue<D>) => {
//     if (IS_CLIENT_ENV) {
//       return (
//         a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
//         b: LangutilStringmapParam
//       ) => localize(a, b)
//     } else {
//       return (
//         a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
//         b: LangutilStringmapParam
//       ) => {
//         const safeBaseLanguage = safelyResolveLanguage(baseLanguage)
//         if (typeof a !== TYPE_OBJECT) {
//           return localizeExplicitly(
//             safeBaseLanguage,
//             a as LangutilKeyword<D>,
//             b
//           )
//         } else {
//           return localizeExplicitly(
//             safeBaseLanguage,
//             (a as LangutilMethodObjArgsLocalize<D>).keyword,
//             (a as LangutilMethodObjArgsLocalize<D>).param
//           )
//         }
//       }
//     }
//   }

//   const resolveLanguage = (
//     language: Array<LangutilLanguage> | LangutilLanguage
//   ): LangutilLanguage<D> | null => {
//     return getResolvedLanguageAnyToMany(
//       language,
//       getAllLanguages()
//     )
//   }

//   const safelyResolveLanguage = (
//     language: Array<LangutilLanguage> | LangutilLanguage
//   ): LangutilLanguage<D> => {
//     return resolveLanguage(language) || Object.keys(self.M$dictionary)[0]
//   }

//   const cloneInitial = (): LangutilCore<D> => {
//     return createLangutilCore(...initArgs)
//   }

//   const cloneCurrent = (): LangutilCore<D> => {
//     return createLangutilCore(
//       self.M$dictionary,
//       self.M$language,
//       { auto: self.M$isAuto }
//     )
//   }

//   // === Initialization ===

//   hydrate(...initArgs)

//   // === Core Instance ===

//   const coreInstance: LangutilCore<D> = {
//     [$$INTERNALS]: null,
//     hydrate,
//     setLanguage,
//     getLanguage,
//     getLangutilState: getLangutilState,
//     getAllLanguages,
//     getDictionary,
//     setDictionary,
//     appendDictionary,
//     localize,
//     localizeExplicitly,
//     createIsomorphicLocalizer,
//     resolveLanguage,
//     safelyResolveLanguage,
//     cloneInitial,
//     cloneCurrent,
//     watch: self.M$watcher.M$watch,
//   }
//   return coreInstance

// }

/**
 * Creates a `LangutilCore` instance.
 * @deprecated Please use `new LangutilCore(...)` instead.
 * @public
 */
export function createLangutilCore<D extends LangutilDictionaryIsolated>(
  dictionary: D,
  language: LangutilLanguage<D>,
  options?: LangutilInitOptions
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
 * @deprecated
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
      pushWarning
    )
  } else {
    return baseLocalizer(
      dictionary,
      (a as LangutilMethodObjArgsLocalizeFromScratch<Dn>).language,
      (a as LangutilMethodObjArgsLocalizeFromScratch<Dn>).keyword,
      (a as LangutilMethodObjArgsLocalizeFromScratch<Dn>).param,
      pushWarning
    )
  }
}

/**
 * @public
 * @deprecated Please use `value instanceof LangutilCore` instead.
 */
export function isLangutilCore(value: unknown): value is LangutilCore {
  return value instanceof LangutilCore
}
