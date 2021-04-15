import hoist from 'hoist-non-react-statics'
import {
  Component,
  createElement,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { ERROR_CLASHING_LANGSTATE_PROP } from '../src/errors'

export function extractCoreMethodsForHook(core) {
  const properties = [
    'localize',
    'localizeExplicitly',
    'localizeFromScratch',
    'setLanguage',
    'setDictionary',
    'appendDictionary',
    'resolveLanguage',
    'getAllLanguages',
  ]
  const methods = {}
  for (const property of properties) {
    methods[property] = core[property]
  }
  return methods
}

export function useLang(core) {
  const [langState, setLangState] = useState(() => core.getLangState())
  useLayoutEffect(() => {
    const listenerId = core.addListener((event) => {
      setLangState(event.data.newLangState)
    })
    return () => {
      core.removeListener(listenerId)
    }
  }, [core])
  const hookData = useMemo(
    () => ({
      ...langState,
      ...extractCoreMethodsForHook(core),
    }),
    [langState, core]
  )
  return hookData
}

export function withLang(WrappedComponent, core, options = {}) {
  const displayName = options.displayName || getDisplayName(WrappedComponent)

  class WithLang extends Component {
    static displayName = displayName
    state = { s: core.getLangState() }

    render() {
      const { langState, r, ...otherProps } = this.props
      if (langState) {
        throw new Error(ERROR_CLASHING_LANGSTATE_PROP(displayName))
      }
      return createElement(WrappedComponent, {
        langState: { ...this.state.s, ...extractCoreMethodsForHook(core) },
        ref: r,
        ...otherProps,
      })
    }

    componentDidMount() {
      this.listenerId = core.addListener((event) => {
        this.setState({ s: event.data.newLangState })
      })
    }

    componentWillUnmount() {
      core.removeListener(this.listenerId)
    }
  }

  hoist(WithLang, WrappedComponent)
  if (options.shouldForwardRef) {
    const WithLangWithRef = (props, ref) => <WithLang {...props} r={ref} />
    return forwardRef(WithLangWithRef)
  } else {
    return WithLang
  }
}

function getDisplayName(WrappedComponent) {
  try {
    return WrappedComponent.displayName || WrappedComponent.name || 'Unknown'
  } catch (e) {
    return 'Unknown'
  }
}
