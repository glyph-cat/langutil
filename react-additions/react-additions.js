const { Component, createElement, useEffect, useState } = require('react');
const { localize, isAuto, getCurrentLanguage, _INTERNALS: {
  addListener, removeListener, printWarning
} } = require('langutil');
let localizableDeprecatedShown = false;

const getLangState = () => ({ auto: isAuto(), lang: getCurrentLanguage() });
const HOOK_ERR_MSG = 'React ≥16.8 is required to use hooks.';

function useLang() {
  if (typeof useState !== 'function') {
    throw ReferenceError(HOOK_ERR_MSG);
  }
  const [state, setState] = useState({ langRef: null });
  const { langRef } = state;
  const langRefIsNull = langRef === null;
  useEffect(() => {
    let newLangRef = addListener(() => { setState({ langRef }); });
    setState({ langRef: newLangRef });
    return () => { removeListener(newLangRef); };
  }, [langRefIsNull]);
  return getLangState();
}

function withLang(WrappedComponent) {
  const displayName = getDisplayName(WrappedComponent);
  class WithLang extends Component {
    componentDidMount() { this.langRef = addListener(this.forceUpdate.bind(this)); }
    componentWillUnmount() { removeListener(this.langRef); }
    render() {
      const { langState, ...otherProps } = this.props;
      if (langState) {
        throw SyntaxError(`Duplicate prop found in <${displayName} />: \`langState\` is meant to be a prop passed down from \`withLang()\` but another prop with the same name was passed down from its parent.\n\nSolutions:\n • For class components, rename your prop\n • For functional components, use the \`useLang()\` hook instead and unwrap it from \`withLang()\`.`);
      }
      return createElement(WrappedComponent, {
        langState: langState ? langState : getLangState(),
        ...otherProps
      });
    }
  }
  let hoist;
  try { hoist = require('hoist-non-react-statics'); } catch (e) { }
  if (typeof hoist === 'function') { hoist(WithLang, WrappedComponent); }
  WithLang.displayName = `withLang(${displayName})`;
  return WithLang;
}

function getDisplayName(WrappedComponent) {
  try {
    return WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
  } catch (e) {
    return 'Unknown';
  }
}

function Localizable({
  keyword, children, paramArray = [], casing, transform, renderAs = 'span', allowEmpty, ...otherProps
}) {
  if (!localizableDeprecatedShown) {
    localizableDeprecatedShown = true;
    printWarning('<Localizable /> has been deprecated. Reason: The `renderAs` parameter that allows <Localizable /> to render into anything complicates the code. Solution: Use `localize` as you normally would inside your JSX code. Then export your component with `withLang` so that your components show the correct language when the user language has changed.');
  }

  let child = !children && keyword ? keyword : children;
  if (child && typeof child === 'string') {
    child = localize({ keyword: child, param: paramArray, casing, transform });
  } else if (allowEmpty) {
    child = '';
  } else {
    printWarning('Keyword should not be empty. Set `allowEmpty` to true to suppress this message.');
    child = `_${keyword}_`;
  }

  if (renderAs === 'value') {
    return child;
  } else {
    return createElement(renderAs, otherProps, child);
  }
}

module.exports = { withLang, useLang, Localizable };
