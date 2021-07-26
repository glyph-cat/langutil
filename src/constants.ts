export const IS_DEBUG_ENV = process.env.NODE_ENV !== 'production'
export const IS_TEST_ENV = process.env.NODE_ENV === 'test'

export const INTERNALS_SYMBOL = Symbol()

export const IS_BROWSER_ENV = typeof window !== 'undefined'
export const IS_SERVER_ENV = typeof window === 'undefined'

/**
 * @public
 */
export enum LangutilEvents {
  hydration = 1,
  dictionary,
  language,
}
