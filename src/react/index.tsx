import hoist from 'hoist-non-react-statics'
import { ForwardedRef, forwardRef, PropsWithChildren, useState } from 'react'
import { SYNTAX_ERROR_CONFLICTING_LANGSTATE_PROP } from '../errors'
import { LangutilState, LangutilCore, LangutilEvent } from '../schema'
import { componentShouldUpdateFrom } from './component-should-update'
import getDisplayName from './get-display-name'
import useLayoutEffect from './isomorphic-layout-effect'
import unstable_batchedUpdates from './react-batch'

export type LangutilReactState<D> = LangutilState<D> & LangutilCore<D>

export function useLangutil<D>(core: LangutilCore<D>): LangutilReactState<D> {
  const [state, setState] = useState<LangutilReactState<D>>(
    () => ({ ...core, ...core.getLangutilState() }) // Initial state
  )
  useLayoutEffect(() => {
    const unwatch = core.watch((event: LangutilEvent<D>) => {
      if (componentShouldUpdateFrom(event)) {
        unstable_batchedUpdates(() => {
          setState({
            ...core,
            ...event.data.newLangState,
          })
        })
      }
    })
    return () => { unwatch() }
  }, [core])
  return state
}

export interface withLangutilOptions {
  displayName?: string
  shouldForwardRef?: boolean
}

export interface WithLangutilProps<D> extends React.ComponentProps<any> {
  langutilState: LangutilReactState<D>
}

export function withLangutil<D, P extends WithLangutilProps<D>>(
  WrappedComponent: React.ComponentType<P>,
  core: LangutilCore<D>,
  options?: withLangutilOptions
) {
  const displayName = options.displayName || getDisplayName(WrappedComponent)
  function WithLangutil(
    props: PropsWithChildren<P>,
    ref: ForwardedRef<React.ComponentType<P>>
  ): JSX.Element {
    const state = useLangutil<D>(core)
    if (props['langutilState']) {
      throw SYNTAX_ERROR_CONFLICTING_LANGSTATE_PROP(displayName)
    }
    return (
      <WrappedComponent
        langutilState={state}
        ref={ref}
        {...props}
      />
    )
  }
  WithLangutil.displayName = displayName
  hoist(WithLangutil, WrappedComponent)
  return forwardRef(WithLangutil)
}
