/**
 * @public
 */
export enum LangutilBuildType {
  /**
   * React Native
   */
  RN = 'RN',
  /**
   * Common JS
   */
  CJS = 'CJS',
  /**
   * EcmaScript
   */
  ES = 'ES',
  /**
   * EcmaScript (minified)
   */
  MJS = 'MJS',
  /**
   * Universal Module Definition
   */
  UMD = 'UMD',
  /**
   * Universal Module Definition (Minified)
   */
  UMD_MIN = 'UMD_MIN',
}

/**
 * @public
 */
export const BUILD_TYPE = process.env.BUILD_TYPE as LangutilBuildType

/**
 * @public
 */
export const BUILD_HASH = process.env.BUILD_HASH

/**
 * @public
 */
export const VERSION = process.env.NPM_PACKAGE_VERSION

/**
 * @public
 */
export enum LangutilEvents {
  hydration = 1,
  dictionarySet,
  dictionaryAppend,
  language,
}
