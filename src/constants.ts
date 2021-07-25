import { LangutilEventType } from './schema'

export const IS_DEBUG_ENV = process.env.NODE_ENV !== 'production'
export const IS_TEST_ENV = process.env.NODE_ENV !== 'test'

export const INTERNALS_SYMBOL = Symbol()

export const EVENT_TYPE_DICTIONARY: LangutilEventType = 1
export const EVENT_TYPE_LANGUAGE: LangutilEventType = 2
