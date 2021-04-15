export const INTERNALS_SYMBOL = Symbol()

export const IS_DEBUG_ENV = process.env.NODE_ENV !== 'production'

/** @type {import('../').LangutilEventType} */
export const EVENT_TYPE_DICTIONARY = 'dictionary'

/** @type {import('../').LangutilEventType} */
export const EVENT_TYPE_LANGUAGE = 'language'
