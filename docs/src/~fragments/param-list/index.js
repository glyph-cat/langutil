import React, { createElement as e, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@material-ui/core'
const ParamStack = lazy(() => import('~components/param-stack'))
const ParamTable = lazy(() => import('~components/param-table'))

function ParamList(props) {
  const isCompactWidth = useMediaQuery('(max-width: 800px)')
  return (
    // TODO: Put a prettier fallback
    <Suspense fallback={<div>Please wait...</div>}>
      {e(isCompactWidth ? ParamStack : ParamTable, props)}
    </Suspense>
  )
}

ParamList.propTypes = {
  data: PropTypes.shape({
    any: PropTypes.shape({
      type: PropTypes.string,
      desc: PropTypes.string.isRequired,
      oneOf: PropTypes.arrayOf(PropTypes.string.isRequired),
      optional: PropTypes.bool,
      defaultValue: PropTypes.any,
    })
  }).isRequired,
  overrideVarName: PropTypes.string,
}

export default ParamList
