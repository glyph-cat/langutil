import { useState } from 'react'
import { LangutilCore, LangutilEvent } from '../../schema'
import { componentShouldUpdateFrom } from '../component-should-update'
import useLayoutEffect from '../isomorphic-layout-effect'
import unstable_batchedUpdates from '../react-batch'
import { LangutilReactState } from '../schema'

/**
 * @public
 */
export function useLangutil<D>(core: LangutilCore<D>): LangutilReactState<D> {
  const [state, setState] = useState<LangutilReactState<D>>(
    () => ({ ...core, ...core.getLangutilState() }) // Initial state
  )
  useLayoutEffect(() => {
    const unwatch = core.watch((event: LangutilEvent<D>) => {
      if (componentShouldUpdateFrom(event)) {
        // KIV: We might not even need this anymore... depending on when
        // React 18 is released...
        // Ref: https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html
        unstable_batchedUpdates(() => {
          setState({
            ...core,
            ...event.data.state.current,
          })
        })
      }
    })
    return () => { unwatch() }
  }, [core])
  return state
}
