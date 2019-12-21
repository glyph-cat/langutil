import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code, CodeLink } from '~components/document'
import CodeTitle from '~components/code-title'
import CodeSamples from '~code-samples'
import { withProps } from '~modules'
import { PATHS, DOCPATHS } from '~constants'

export default withLang(() => {
  return (
    <>

      <CodeTitle name='AUTO_DETECT' isNotFunction />

      <Body children={localize({
        keyword: 'API_DESC_AUTO_DETECT',
        transform: withProps({
          init: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.init}`}
            children='init()'
          />,
          setL: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.setLanguage}`}
            children='setLanguage()'
          />,
        })
      })} />

      <CodeSamples.ApiAutoDetect />

    </>
  )
})
