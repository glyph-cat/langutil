import { LangutilCore } from '../main-bundle'
import { LangutilState } from '../schema'

/**
 * @public
 */
export type LangutilReactState<D> = LangutilState<D> & LangutilCore<D>
