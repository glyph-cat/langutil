import {
  INTERNALS_SYMBOL,
  IS_BROWSER_ENV,
  IS_DEBUG_ENV,
  IS_TEST_ENV,
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

  const getLangState = (): LangutilState<D> => ({
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
  ) => {
    const oldLangState = { ...getLangState() }

    // Immediately assign new values, if is not auto or auto detect fails
    // it will fallback to these values
    let newLanguage = language
    const newAuto = options.auto === true

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
        devPrint(
          'warn',
          `The language '${language}' does not exist within the dictionary, ` +
          'available languages: ' +
          displayStringArray(getAllLanguages() as Array<string>) + '.'
        )
      }
    }

    self.M$language = newLanguage
    self.M$isAuto = newAuto

    const newLangState = getLangState()
    return { oldLangState, newLangState }
  }

  const __setDictionaryBase = (dictionary: LangutilDictionaryIsolated) => {
    if (typeof dictionary !== 'object') {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    self.M$dictionary = dictionary as D
    const langState = getLangState()
    return {
      oldLangState: langState,
      newLangState: langState,
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
    options: LangutilSetLanguageOptions
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
      type: LangutilEvents.dictionary,
      data: eventData,
    })
  }

  const appendDictionary = (dictionary: LangutilDictionaryIsolated) => {
    if (typeof dictionary !== 'object') {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    self.M$dictionary = getMergedDictionary(self.M$dictionary, dictionary) as D
    const eventData = {
      // Separate `getLangState()` to prevent hard-to-debug mutability issues
      oldLangState: getLangState(),
      newLangState: getLangState(),
    }
    self.M$refresh({
      type: LangutilEvents.dictionary,
      data: eventData,
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
    language: LangutilLanguage | Array<LangutilLanguage>
  ): LangutilLanguage<D> | null => {
    return getResolvedLanguageAnyToMany(
      language,
      getAllLanguages()
    )
  }

  const safelyResolveLanguage = (
    language: LangutilLanguage
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
    getLangutilState: getLangState,
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
    [INTERNALS_SYMBOL]: IS_TEST_ENV ? {
      getDictionary: __getDictionary,
    } : {},
  }
  return coreInstance

}

/**
 * @public
 */
export function localizeFromScratch<Dn>(
  dictionary: Dn,
  language: LangutilLanguage<Dn>,
  keyword?: LangutilKeyword<Dn>,
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
  b?: LangutilKeyword<Dn>,
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
  return typeof value[INTERNALS_SYMBOL] !== 'undefined'
}
