export const IS_DEBUG_ENV = process.env.NODE_ENV !== 'production'
export const IS_DIST_ENV = process.env.DIST_ENV === 'true'
export const IS_BROWSER_ENV = typeof window !== 'undefined'
export const INTERNALS_SYMBOL = Symbol()

/**
 * Throughout the entire project, there are many `typeof variable === 'object'`
 * comparisons. By refactoring this `'object'` string, we can save a few bytes.
 */
export const TYPE_OBJECT = 'object'

/**
 * @public
 */
export enum LangutilEvents {
  hydration = 1,
  dictionarySet,
  dictionaryAppend,
  language,
}

/**
 * @public
 */
export const VERSION = process.env.NPM_PACKAGE_VERSION
