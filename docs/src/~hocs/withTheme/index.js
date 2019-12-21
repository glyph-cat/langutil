import React from 'react'
import ThemeContext from '~contexts/ThemeContext'
import hoist from 'hoist-non-react-statics'

function withTheme(WrappedComponent) {

  const displayName = getDisplayName(WrappedComponent);

  class WithTheme extends React.Component {
    static contextType = ThemeContext
    render() {
      const { theme, ...otherProps } = this.props;
      if (theme) {
        throw SyntaxError(`Duplicate prop found in <${displayName} />: \`theme\` is meant to be a prop passed down from \`withTheme()\` but another prop with the same name was passed down from its parent.`);
      } else {
        return createElement(WrappedComponent, {
          theme: this.context,
          ...otherProps
        })
      }
    }
  }

  hoist(WithTheme, WrappedComponent)
  withTheme.displayName = `withTheme(${displayName})`
  return withTheme

}

export default withTheme

function getDisplayName(WrappedComponent) {
  try {
    return WrappedComponent.displayName || WrappedComponent.name || 'Unknown'
  } catch (e) {
    return 'Unknown'
  }
}
