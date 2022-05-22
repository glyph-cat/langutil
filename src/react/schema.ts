import { LangutilCore } from '../main/core'
import { LangutilState } from '../schema'

/**
 * @public
 */
export type LangutilReactState<D> = LangutilState<D> & LangutilCore<D>
