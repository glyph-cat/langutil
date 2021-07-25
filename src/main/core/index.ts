import {
  EVENT_TYPE_DICTIONARY,
  EVENT_TYPE_LANGUAGE,
  INTERNALS_SYMBOL,
  IS_DEBUG_ENV,
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
  LangutilLanguageIsolated,
  LangutilSetLanguageOptions,
  LangutilLocalizedValue,
  LangutilMethodArgsLocalize,
  LangutilMethodArgsLocalizeExplicitly,
  LangutilMethodObjArgsLocalize,
  LangutilMethodObjArgsLocalizeExplicitly,
  LangutilMethodArgsLocalizeFromScratch,
  LangutilMethodObjArgsLocalizeFromScratch,
} from '../../schema'
import { devPrint, displayStringArray } from '../dev'
import getClientLanguage from '../get-client-language'
import getMergedDictionary from '../get-merged-dictionary'
import { baseLocalizer } from '../localizer'
import { getResolvedLanguageFromList } from '../resolve-language'
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

export function createLangutilCore<D extends LangutilDictionaryIsolated>(
  ...initArgs: [D, LangutilLanguage<D>, LangutilInitOptions?]
): LangutilCore<D> {

  const self: LangutilCoreInternalInstance<D> = {
    M$dictionary: null,
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

  // === Base Setters ===

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
      const rawDetectedLanguage = getClientLanguage()
      const resolvedLanguage = getResolvedLanguageFromList(
        rawDetectedLanguage,
        getAllLanguages() as Array<LangutilLanguageIsolated>
      )
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

  const setLanguage = (
    language: LangutilLanguage<D>,
    options: LangutilSetLanguageOptions
  ): void => {
    // `shouldRefresh` defaults to true
    options = { shouldRefresh: true, ...options }
    const { shouldRefresh, ...remainingOptions } = options
    const event = __setLanguageBase(language, remainingOptions)
    if (shouldRefresh) {
      self.M$refresh({
        type: EVENT_TYPE_LANGUAGE,
        data: event,
      })
    }
  }

  const setDictionary = (dictionary: LangutilDictionaryIsolated): void => {
    const event = __setDictionaryBase(dictionary)
    self.M$refresh({
      type: EVENT_TYPE_DICTIONARY,
      data: event,
    })
  }

  const appendDictionary = (dictionary: LangutilDictionaryIsolated) => {
    if (typeof dictionary !== 'object') {
      throw TYPE_ERROR_DICTIONARY_INVALID_TYPE(dictionary)
    }
    // Note: Type of dictionary that is set or appended at runtime is unavailable
    self.M$dictionary = getMergedDictionary(self.M$dictionary, dictionary) as D
    self.M$refresh({
      type: EVENT_TYPE_DICTIONARY,
      data: {
        // Separate `getLangState()` to prevent hard-to-debug mutability issues
        oldLangState: getLangState(),
        newLangState: getLangState(),
      },
    })
  }

  // === Other Exposed Methods ===

  const localize = (
    ...args: LangutilMethodArgsLocalize<D>
  ): LangutilLocalizedValue<D> => {
    const [a, b] = args
    if (typeof a !== 'object') {
      return baseLocalizer(
        self.M$dictionary,
        self.M$language,
        a,
        b,
        pushWarning
      )
    } else {
      return baseLocalizer(
        self.M$dictionary,
        self.M$language,
        (a as LangutilMethodObjArgsLocalize<D>).keyword,
        (a as LangutilMethodObjArgsLocalize<D>).param,
        pushWarning
      )
    }
  }

  const localizeExplicitly = (
    ...args: LangutilMethodArgsLocalizeExplicitly<D>
  ): LangutilLocalizedValue<D> => {
    const [a, b, c] = args
    if (typeof a !== 'object') {
      return baseLocalizer(self.M$dictionary, a, b, c, pushWarning)
    } else {
      return baseLocalizer(
        self.M$dictionary,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).language,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).keyword,
        (a as LangutilMethodObjArgsLocalizeExplicitly<D>).param,
        pushWarning
      )
    }
  }

  const resolveLanguage = (
    language: LangutilLanguageIsolated
  ): LangutilLanguage<D> => {
    return getResolvedLanguageFromList(
      language,
      getAllLanguages() as Array<LangutilLanguageIsolated>
    )
  }

  // === Initialization ===

  if (initArgs.length > 0) {
    const [dictionary, language, options] = initArgs
    __setDictionaryBase(dictionary)
    __setLanguageBase(language, options)
  }

  // === Core Instance ===

  const coreInstance: LangutilCore<D> = {
    setLanguage,
    getLanguage,
    getLangutilState: getLangState,
    getAllLanguages,
    setDictionary,
    appendDictionary,
    localize,
    localizeExplicitly,
    resolveLanguage,
    watch: self.M$watcher.M$watch,
    [INTERNALS_SYMBOL]: {
      M$getDictionary: __getDictionary,
    },
  }
  return coreInstance
}

export function localizeFromScratch<Dn>(
  ...args: LangutilMethodArgsLocalizeFromScratch<Dn>
): LangutilLocalizedValue<Dn> {
  const [dictionary, a, b, c] = args
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

export function isLangutilCore(value: unknown): boolean {
  return typeof value[INTERNALS_SYMBOL] !== 'undefined'
}
