export const INTERNALS_SYMBOL = Symbol()

/**
 * Used to be `IS_BROWSER_ENV` which only `typeof window` is checked.
 * In React Native, the window is not exactly the same as what it is in the
 * browser. Even though it is accessible now, there's no guarantee it will stay
 * the same in the future. A more logical and transparent way is to create a
 * separate build for React Native where `IS_CLIENT_ENV` will always be true.
 */
export const IS_CLIENT_ENV = process.env.BUILD_ENV === 'react-native' ||
  typeof window !== 'undefined'
// ^ NOTE: `typeof window !== 'undefined'` must be placed at the last because
// the value remains unknown at compile time, and will result in dead code not
// trimmed even when `IS_CLIENT_ENV` is undoubtedly true.

export const IS_DEBUG_ENV = process.env.NODE_ENV !== 'production'

export const IS_DIST_ENV = process.env.IS_DIST_ENV === 'true'

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
