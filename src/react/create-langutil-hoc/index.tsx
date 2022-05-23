import hoistNonReactStatics from 'hoist-non-react-statics'
import {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react'
import { SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP } from '../../errors'
import { LangutilCore } from '../../main-bundle'
import { getDisplayName } from '../get-display-name'
import { LangutilReactState } from '../schema'
import { useLangutil } from '../use-langutil'

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
      return (
        <WrappedComponent
          langutilState={state}
          ref={ref}
          {...props}
        />
      )
      // return createElement(WrappedComponent, {
      //   langutilState: state,
      //   ref,
      //   ...props,
      // })
    }
    WithLangutil.displayName = displayName
    hoistNonReactStatics(WithLangutil, WrappedComponent)
    return forwardRef(WithLangutil)
  }
}