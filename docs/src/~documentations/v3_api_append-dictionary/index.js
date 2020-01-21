import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, CodeLink } from '~components/document'
import CodeTitle from '~components/code-title'
import CodeSamples from '~code-samples'
import { withProps } from '~modules'
import { PATHS, DOCPATHS } from '~constants'

export default withLang(() => {
  return (
    <>

      <CodeTitle name='appendDictionary' />

      {/* <Body children={localize('')} /> */}

      {/* <CodeSamples.ApiAutoDetect /> */}

    </>
  )
})
