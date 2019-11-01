import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, CodeLink } from '../../components/document'
import CodeTitle from '../../components/code-title'
import { asProps } from '../../modules'
import { DOCPATHS, PATHS, VALUES } from '../../constants'
import DeprecationWarning from '../../components/deprecation-warning'
// import ParamList from '../../components/param-list'
// import { asProps } from '../../modules'

export default withLang(() => {
  let redirectComponent = <CodeLink
    to={`${PATHS.docs}/${DOCPATHS.v3.localize}`}
    children='localize()'
  />
  return (
    <>
      <CodeTitle name='localizeWith' rType='any' />
      <DeprecationWarning
        // sinceVersion=''
        removeDate={VALUES.v240DeprecatedRemovalDate}
        message={localize({
          keyword: 'DEPRECATED_MSG_LOCALIZE_WITH',
          transform: asProps({ loc: redirectComponent })
        })}
      />
      <Body children={localize({
        keyword: 'DOC_BODY_EQUIVALENT_OF_LOCALIZE',
        transform: asProps({ loc: redirectComponent })
      })} />
    </>
  )

})
