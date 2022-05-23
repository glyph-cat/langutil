import { LangutilCore } from '../main-bundle'
import { LangutilState } from '../schema'

/**
 * @public
 * @ReactBundle
 */
export type LangutilReactState<D> = LangutilState<D> & LangutilCore<D>
