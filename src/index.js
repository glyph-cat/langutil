import AutoDetect from './auto-detect'
import {
  EVENT_TYPE_DICTIONARY,
  EVENT_TYPE_LANGUAGE,
  INTERNALS_SYMBOL,
  IS_DEBUG_ENV,
} from './constants'
import { devPrint, displayStringArray } from './dev-log'
import {
  ERROR_DICTIONARY_INVALID_TYPE,
  ERROR_SET_LANGUAGE_OPTIONS_INVALID_TYPE,
} from './errors'
import getMergedDictionary from './get-merged-dictionary'
import { createLangutilListener } from './listener'
import { baseLocalizer } from './localizer'
import { getResolvedLanguageFromList } from './resolve-language'
import { createDebouncedWarning } from './warning-debouncer'

export function createLangutilCore(...initArgs) {
  const self = {
    M$dictionary: {},
    M$listener: createLangutilListener(),
    M$language: null,
    M$isAuto: false,
  }
  if (IS_DEBUG_ENV) {
    self['M$debouncedWarning'] = createDebouncedWarning()
  }

  // === Getters ===

  const getLanguage = () => self.M$language
  const getLangState = () => ({
    isAuto: self.M$isAuto,
    language: self.M$language,
  })
  const getAllLanguages = () => Object.keys(self.M$dictionary)
  const __getDictionary = () => self.M$dictionary

  // === Base Setters ===

  /**
   * @param {string} language
   * @param {import('../').LangutilLanguageOptions} options
   */
  const __setLanguageBase = (language, options = {}) => {
    if (options && typeof options !== 'object') {
      throw new TypeError(ERROR_SET_LANGUAGE_OPTIONS_INVALID_TYPE(options))
    }
    const oldLangState = { ...getLangState() }

    // Immediately assign new values, if is not auto or auto detect fails
    // it will fallback to these values
    let newLanguage = language
    let newAuto = options.auto === true

    if (newAuto) {
      const rawDetectedLanguage = AutoDetect()
      const resolvedLanguage = getResolvedLanguageFromList(
        rawDetectedLanguage,
        getAllLanguages()
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
          `The language '${language}' does not exist within the dictionary, available languages: ${displayStringArray(
            getAllLanguages()
          )}.`
        )
      }
    }

    self.M$language = newLanguage
    self.M$isAuto = newAuto

    const newLangState = getLangState()
    return { oldLangState, newLangState }
  }

  /**
   * @param {object} dictionary
   */
  const __setDictionaryBase = (dictionary) => {
    if (typeof dictionary !== 'object') {
      throw new TypeError(ERROR_DICTIONARY_INVALID_TYPE(dictionary))
    }
    self.M$dictionary = dictionary
    const langState = getLangState()
    return {
      oldLangState: langState,
      newLangState: langState,
    }
  }

  // === Setters ===

  const setLanguage = (...args) => {
    const event = __setLanguageBase(...args)
    const autoConfigsChanged =
      event.oldLangState.isAuto !== event.newLangState.isAuto
    const languagesChanged =
      event.oldLangState.language !== event.newLangState.language
    // If changed, only trigger a refresh
    if (autoConfigsChanged || languagesChanged) {
      self.M$listener.M$refresh(EVENT_TYPE_LANGUAGE, event)
    }
  }

  const setDictionary = (...args) => {
    const event = __setDictionaryBase(...args)
    self.M$listener.M$refresh(EVENT_TYPE_DICTIONARY, event)
  }

  const appendDictionary = (dictionary) => {
    if (typeof dictionary !== 'object') {
      throw new TypeError(ERROR_DICTIONARY_INVALID_TYPE(dictionary))
    }
    self.M$dictionary = getMergedDictionary(self.M$dictionary, dictionary)
    const langState = getLangState()
    self.M$listener.M$refresh(EVENT_TYPE_DICTIONARY, {
      oldLangState: langState,
      newLangState: langState,
    })
  }

  // === Other Exposed Methods ===

  const localize = (a, b) => {
    const isByObj = typeof a === 'object'
    return baseLocalizer(
      self.M$dictionary,
      self.M$language,
      isByObj ? a.keyword : a,
      isByObj ? a.param : b,
      IS_DEBUG_ENV ? self.M$debouncedWarning : undefined
      // Only show warnings if core has been initialized
    )
  }

  const localizeExplicitly = (a, b, c) => {
    const isByObj = typeof a === 'object'
    return baseLocalizer(
      self.M$dictionary,
      isByObj ? a.language : a,
      isByObj ? a.keyword : b,
      isByObj ? a.param : c,
      IS_DEBUG_ENV ? self.M$debouncedWarning : undefined
      // Only show warnings if core has been initialized
    )
  }

  const localizeFromScratch = (dictionary, a, b, c) => {
    // NOTE: `dictionary` cannot be part of the a,b,c because the dictionary
    // itself is an object, which means `isByObj` will always evaluate to true
    const isByObj = typeof a === 'object'
    return baseLocalizer(
      dictionary,
      isByObj ? a.language : a,
      isByObj ? a.keyword : b,
      isByObj ? a.param : c,
      IS_DEBUG_ENV ? self.M$debouncedWarning : undefined
    )
  }

  const resolveLanguage = (language) => {
    return getResolvedLanguageFromList(language, getAllLanguages())
  }

  // === Initialization ===

  if (initArgs.length > 0) {
    const [dictionary, language, options] = initArgs
    __setDictionaryBase(dictionary)
    __setLanguageBase(language, options)
  }

  // === Core Instance ===

  const coreInstance = {
    setLanguage,
    getLanguage,
    getAllLanguages,
    getLangState,
    setDictionary,
    appendDictionary,
    localize,
    localizeExplicitly,
    localizeFromScratch,
    resolveLanguage,
    addListener: self.M$listener.M$add,
    removeListener: self.M$listener.M$remove,
    [INTERNALS_SYMBOL]: {
      getDictionary: __getDictionary,
    },
  }
  return coreInstance
}

export {
  EVENT_TYPE_DICTIONARY,
  EVENT_TYPE_LANGUAGE,
  INTERNALS_SYMBOL,
} from './constants'
export { default as stringMap } from './string-map'
