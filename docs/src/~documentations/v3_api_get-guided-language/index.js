import React from 'react'
import { localize, appendDictionary } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '~components/document'
import CodeTitle from '~components/code-title'
import ReturnType from '~components/return-type'
import CodeSamples from '~code-samples'
import ParamList from '~fragments/param-list'
import { withProps } from '~modules'
import localizations from './localizations'

export default withLang(() => {
  appendDictionary(localizations, 'api-gglang')
  const params = {
    detector: {
      type: 'Function',
      desc: localize({
        keyword: 'API_PARAM_DETECTOR',
        transform: withProps({ auto: <Code>AUTO_DETECT</Code> })
      }),
    }
  }
  return (
    <>
      <CodeTitle name='getGuidedLanguage' params={params} />
      <Body children={localize('API_DESC_GET_GUIDED_LANGUAGE')} />
      <ParamList data={params} />
      <ReturnType desc={localize('API_RTYPE_STR_REP_OF_LANG')} type='string' />
      <CodeSamples.GetGuidedLanguage />
    </>
  )
})
