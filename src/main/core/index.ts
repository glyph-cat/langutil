import {
  INTERNALS_SYMBOL,
  IS_BROWSER_ENV,
  IS_DEBUG_ENV,
  IS_DIST_ENV,
  LangutilEvents,
} from '../../constants'
import { TYPE_ERROR_DICTIONARY_INVALID_TYPE } from '../../errors'
import {
  LangutilState,
  LangutilAutoDetectFlag,
  LangutilCore,
  LangutilDictionaryIsolated,
  LangutilEvent,
  LangutilInitOptions,
  LangutilLanguage,
  LangutilSetLanguageOptions,
  LangutilLocalizedValue,
  LangutilMethodObjArgsLocalize,
  LangutilMethodObjArgsLocalizeExplicitly,
  LangutilMethodObjArgsLocalizeFromScratch,
  LangutilKeyword,
  LangutilStringmapParam,
  LangutilEventData,
} from '../../schema'
import { devPrint, displayStringArray } from '../dev'
import getClientLanguages from '../get-client-languages'
import getMergedDictionary from '../get-merged-dictionary'
import { baseLocalizer } from '../localizer'
import { getResolvedLanguageAnyToMany } from '../resolve-language'
import { VirtualBatchFunction, createVirtualBatcher } from '../virtual-batch'
import { createWarningDebouncer } from '../warning-debouncer'
import { createWatcher, Watcher } from '../watcher'

interface LangutilCoreInternalInstance<D> {
  M$dictionary: D
  M$language: keyof D
  M$isAuto: LangutilAutoDetectFlag
  M$batch: VirtualBatchFunction
  M$watcher: Watcher<LangutilEvent<D>>
  M$refresh(event: LangutilEvent<D>): void
}

const pushWarning = IS_DEBUG_ENV ? createWarningDebouncer() : undefined

/**
 * Creates a Langutil Core instance.
 * @public
 */
export function createLangutilCore<D extends LangutilDictionaryIsolated>(
  ...initArgs: [D, LangutilLanguage<D>, LangutilInitOptions?]
): LangutilCore<D> {

  const self: LangutilCoreInternalInstance<D> = {
    M$dictionary: ({} as D),
    M$language: null,
    M$isAuto: false,
    M$batch: createVirtualBatcher(),
    M$watcher: createWatcher<LangutilEvent<D>>(),
    M$refresh: (event: LangutilEvent<D>) => {
      self.M$batch(() => { self.M$watcher.M$refresh(event) })
    },
  }

  // === Getters ===

  const getLanguage = (): LangutilLanguage<D> => self.M$language

  const getLangutilState = (): LangutilState<D> => ({
    isAuto: self.M$isAuto,
    language: self.M$language,
  })

  const getAllLanguages = (): Array<LangutilLanguage<D>> => Object.keys(
    self.M$dictionary
  )

  const __getDictionary = (): D => self.M$dictionary

  // === Base Methods ===

  const __setLanguageBase = (
    language: LangutilLanguage<D>,
    options?: LangutilSetLanguageOptions
  ): LangutilEventData<D> => {
    const oldLangutilState = { ...getLangutilState() }

    // Immediately assign new values, if is not auto or auto detect fails
    // it will fallback to these values
    let newLanguage = language
    const newAuto = options?.auto === true

    if (newAuto) {
      const rawDetectedLanguage = getClientLanguages()
      const resolvedLanguage = resolveLanguage(rawDetectedLanguage)
      if (resolvedLanguage) {
        newLanguage = resolvedLanguage
        devPrint(
          'info',
          `Automatically recognized language: ${resolvedLanguage}`
        )
      } else {
        devPrint(
          'info',
          `Unable to automatically recognize language, falling back to ${language}`
        )
      }
    } else {
      // Check if language exists in dictionary
      if (!self.M$dictionary[language]) {
        // NOTE: Must wrap in `if (IS_DEBUG_ENV) { ... }` otherwise terser will
        // still include code for `displayStringArray` in the minified bundles.
        if (IS_DEBUG_ENV) {
          devPrint(
            'warn',
            `The language '${language}' does not exist within the dictionary, ` +
            'available languages: ' +
            displayStringArray(getAllLanguages() as Array<string>) + '.'
          )
        }
      }
    }

    self.M$language = newLanguage
    self.M$isAuto = newAuto

    const newLangutilState = getLangutilState()
    return {
      state: {
        previous: oldLangutilState,
        current: newLangutilState,
      }
    }
  }

  const __setDictionaryBase = (
    dictionary: LangutilDictionaryIsolated
  ): LangutilEventData<D> => {
    if (typeof dictionary !== 'object') {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    self.M$dictionary = dictionary as D
    return {
      state: {
        // Separately get the values to prevent hard-to-debug mutability issues
        previous: getLangutilState(),
        current: getLangutilState(),
      }
    }
  }

  // === Setters ===

  const hydrate = (
    ...hydrateArgs: [D, LangutilLanguage<D>, LangutilInitOptions?]
  ): void => {
    const [dictionary, language, options] = hydrateArgs
    // NOTE: dictionary is optional here
    if (dictionary) { __setDictionaryBase(dictionary) }
    const eventData = __setLanguageBase(language, options)
    self.M$refresh({
      type: LangutilEvents.hydration,
      data: eventData,
    })
  }

  const setLanguage = (
    language: LangutilLanguage<D>,
    options?: LangutilSetLanguageOptions
  ): void => {
    const eventData = __setLanguageBase(language, options)
    self.M$refresh({
      type: LangutilEvents.language,
      data: eventData,
    })
  }

  const setDictionary = (dictionary: LangutilDictionaryIsolated): void => {
    const eventData = __setDictionaryBase(dictionary)
    self.M$refresh({
      type: LangutilEvents.dictionarySet,
      data: eventData,
    })
  }

  const appendDictionary = (dictionary: LangutilDictionaryIsolated) => {
    if (typeof dictionary !== 'object') {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    self.M$dictionary = getMergedDictionary(self.M$dictionary, dictionary) as D
    self.M$refresh({
      type: LangutilEvents.dictionaryAppend,
      data: {
        state: {
          // Separately get the values to prevent hard-to-debug mutability issues
          previous: getLangutilState(),
          current: getLangutilState(),
        }
      },
    })
  }

  // === Other Exposed Methods ===

  const localize = (
    a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
    b?: LangutilStringmapParam
  ): LangutilLocalizedValue<D> => {
    if (typeof a !== 'object') {
      return baseLocalizer(self.M$dictionary, self.M$language, a, b, pushWarning)
    } else {
      return baseLocalizer(
        self.M$dictionary,
        self.M$language,
        a.keyword,
        a.param,
        pushWarning
      )
    }
  }

  const localizeExplicitly = (
    a: LangutilLanguage<D> | LangutilMethodObjArgsLocalizeExplicitly<D>,
    b: LangutilKeyword<D>,
    c?: LangutilStringmapParam
  ): LangutilLocalizedValue<D> => {
    if (typeof a !== 'object') {
      return baseLocalizer(self.M$dictionary, a, b, c, pushWarning)
    } else {
      return baseLocalizer(
        self.M$dictionary,
        a.language,
        a.keyword,
        a.param,
        pushWarning
      )
    }
  }

  const createIsomorphicLocalizer = (
    baseLanguage: LangutilLanguage
  ): ((
    a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
    b?: LangutilStringmapParam
  ) => LangutilLocalizedValue<D>) => {
    if (IS_BROWSER_ENV) {
      return (
        a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
        b: LangutilStringmapParam
      ) => localize(a, b)
    } else {
      return (
        a: LangutilKeyword<D> | LangutilMethodObjArgsLocalize<D>,
        b: LangutilStringmapParam
      ) => {
        const safeBaseLanguage = safelyResolveLanguage(baseLanguage)
        if (typeof a !== 'object') {
          return localizeExplicitly(safeBaseLanguage, a, b)
        } else {
          return localizeExplicitly(safeBaseLanguage, a.keyword, a.param)
        }
      }
    }
  }

  const resolveLanguage = (
    language: Array<LangutilLanguage> | LangutilLanguage
  ): LangutilLanguage<D> | null => {
    return getResolvedLanguageAnyToMany(
      language,
      getAllLanguages()
    )
  }

  const safelyResolveLanguage = (
    language: Array<LangutilLanguage> | LangutilLanguage
  ): LangutilLanguage<D> => {
    return resolveLanguage(language) || Object.keys(self.M$dictionary)[0]
  }

  const cloneInitial = (): LangutilCore<D> => {
    return createLangutilCore(...initArgs)
  }

  const cloneCurrent = (): LangutilCore<D> => {
    return createLangutilCore(
      self.M$dictionary,
      self.M$language,
      { auto: self.M$isAuto }
    )
  }

  // === Initialization ===

  if (initArgs) { hydrate(...initArgs) }

  // === Core Instance ===

  const coreInstance: LangutilCore<D> = {
    hydrate,
    setLanguage,
    getLanguage,
    getLangutilState: getLangutilState,
    getAllLanguages,
    setDictionary,
    appendDictionary,
    localize,
    localizeExplicitly,
    createIsomorphicLocalizer,
    resolveLanguage,
    safelyResolveLanguage,
    cloneInitial,
    cloneCurrent,
    watch: self.M$watcher.M$watch,
    [INTERNALS_SYMBOL]: IS_DIST_ENV ? {} : {
      getDictionary: __getDictionary,
    },
  }
  return coreInstance

}

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
  if (typeof a !== 'object') {
    return baseLocalizer(dictionary, a, b, c, pushWarning)
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
 */
export function isLangutilCore(value: unknown): boolean {
  // NOTE: Must do preliminary check. If value is undefined, trying to directly
  // access `value[INTERNALS_SYMBOL]` would've resulted in an error.
  if (!value) { return false }
  return typeof value[INTERNALS_SYMBOL] !== 'undefined'
}
