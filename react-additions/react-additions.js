const React = require('react');
const langutil = require('langutil');
let localizableDeprecatedShown = false;

function withLang(WrappedComponent) {
  class WithLang extends React.Component {

    constructor() {
      super();
      langutil.addEventListener((id, hook) => {
        this.langutilId = id;
        hook(this.forceUpdate.bind(this));
      });
    }

    componentWillUnmount() {
      langutil.removeEventListener(this.langutilId);
    }

    render() {
      return React.createElement(WrappedComponent, this.props);
    }

  }

  let hoist;
  try { hoist = require('hoist-non-react-statics'); } catch (e) { }
  if (typeof hoist === 'function') { hoist(WithLang, WrappedComponent); }
  WithLang.displayName = `withLang(${getDisplayName(WrappedComponent)})`;
  return WithLang;
};

function getDisplayName(WrappedComponent) {
  try {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  } catch (e) {
    return 'Component';
  }
}

function Localizable({
  keyword, children, paramArray = [], casing, transform, renderAs = "span", allowEmpty, ...otherProps
}) {
  if (!localizableDeprecatedShown) {
    localizableDeprecatedShown = true;
    langutil.printWarning('<Localizable /> has been deprecated. Reason: The `renderAs` parameter that allows <Localizable /> to render into anything complicates the code. Solution: Use `localize` as you normally would inside your JSX code. Then export your component with `withLang` so that your components show the correct language when the user language has changed.');
  }

  let child = !children && keyword ? keyword : children;
  if (child && typeof child === 'string') {
    child = langutil.localize({ keyword: child, param: paramArray, casing, transform });
  } else if (allowEmpty) {
    child = '';
  } else {
    langutil.printWarning('Keyword should not be empty. Set `allowEmpty` to true to suppress this message.');
    child = `_${keyword}_`;
  }

  if (renderAs === 'value') {
    return child;
  } else {
    return React.createElement(renderAs, otherProps, child);
  }
}

module.exports = { withLang, Localizable };
