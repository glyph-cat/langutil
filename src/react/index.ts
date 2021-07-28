import hoistNonReactStatics from 'hoist-non-react-statics'
import {
  createElement,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useState,
} from 'react'
import { SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP } from '../errors'
import { LangutilState, LangutilCore, LangutilEvent } from '../schema'
import { componentShouldUpdateFrom } from './component-should-update'
import getDisplayName from './get-display-name'
import useLayoutEffect from './isomorphic-layout-effect'
import unstable_batchedUpdates from './react-batch'

/**
 * @public
 */
export type LangutilReactState<D> = LangutilState<D> & LangutilCore<D>

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

/**
 * @public
 */
export interface withLangutilOptions {
  displayName?: string
}

/**
 * @public
 */
export interface WithLangutilProps<D> extends React.ComponentProps<any> {
  langutilState: LangutilReactState<D>
}

// TODO: Solve the `any` type

/**
 * @public
 */
export function createLangutilHOC<D, P extends WithLangutilProps<D> = WithLangutilProps<D>>(
  core: LangutilCore<D>,
): ((
  WrappedComponent: React.ComponentType<P>,
  options?: withLangutilOptions
) => any) {
  return function withLangutil(
    WrappedComponent: React.ComponentType<P>,
    options?: withLangutilOptions
  ): any {
    const displayName = options?.displayName || getDisplayName(WrappedComponent)
    function WithLangutil(
      props: PropsWithChildren<P>,
      ref: ForwardedRef<React.ComponentType<P>>
    ): JSX.Element {
      const state = useLangutil<D>(core)
      if (props['langutilState']) {
        throw SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP(displayName)
      }
      return createElement(WrappedComponent, {
        langutilState: state,
        ref,
        ...props,
      })
    }
    WithLangutil.displayName = displayName
    hoistNonReactStatics(WithLangutil, WrappedComponent)
    return forwardRef(WithLangutil)
  }
}
