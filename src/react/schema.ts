import { LangutilCore, LangutilState } from '../schema'

/**
 * @public
 */
export type LangutilReactState<D> = LangutilState<D> & LangutilCore<D>
