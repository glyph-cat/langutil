import React from 'react'
import hoist from 'hoist-non-react-statics'
import { getDisplayName } from '~modules'
import MediaQuery from '~components/media-query'

function withMediaQuery(queries = {}, WrappedComponent) {

  const displayName = getDisplayName(WrappedComponent);

  class WithMediaQuery extends React.Component {

    constructor(props) {
      super(props)
      this.queryValues = {}
    }

    MediaQueryArray = () => {
      let queryArray = []
      const qIndex = Object.keys(queries)
      for (let i = 0; i < qIndex.length; i++) {
        queryArray.push(
          <MediaQuery
            key={i}
            query={queries[qIndex[i]]}
            onChange={(value) => { this.queryValues[qIndex[i]] = value }}
          />
        )
      }
      return queryArray
    }

    render() {
      const { mediaQuery, ...otherProps } = this.props;
      if (mediaQuery) {
        throw SyntaxError(`Duplicate prop found in <${displayName} />: \`mediaQuery\` is meant to be a prop passed down from \`withMediaQuery()\` but another prop with the same name was passed down from its parent.`);
      } else {
        return (
          <>
            <this.MediaQueryArray />
            <WrappedComponent
              mediaQuery={this.queryValues}
              {...otherProps}
            />
          </>
        )
      }
    }

  }

  hoist(WithMediaQuery, WrappedComponent)
  WithMediaQuery.displayName = `withMediaQuery(${displayName})`
  return WithMediaQuery

}

export default withMediaQuery
