import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '../../components/document'
import CodeTitle from '../../components/code-title'
import CodeSamples from '../../code-samples'
import { withProps } from '../../modules'

export default withLang(() => {
  return (
    <>

      <CodeTitle name='AUTO_DETECT' rType='void' isNotFunction />

      <Body children={localize({
        keyword: 'API_DESC_AUTO_DETECT',
        transform: withProps({ init: <Code>init()</Code>, setL: <Code>setLanguage()</Code> })
      })} />

      <CodeSamples.ApiAutoDetect />

    </>
  )
})
