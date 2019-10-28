import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '../../components/document'
import CodeTitle from '../../components/code-title'
import ParamList from '../../components/param-list'
import { asProps } from '../../modules'

export default withLang(() => {

  const params = {
    dict: {
      type: 'object',
      desc: localize('API_PARAM_DICT'),
    },
    lang: {
      type: 'string',
      desc: localize('API_PARAM_LANG'),
    },
    detector: {
      type: 'Function',
      desc: localize({
        keyword: 'API_PARAM_DETECTOR',
        transform: asProps({ auto: <Code>AUTO_DETECT</Code> })
      }),
      optional: true
    },
  }

  return (
    <>

      <CodeTitle name='init' params={params} rType='void' />

      <Body children={localize({
        keyword: 'API_DESC_INIT',
        transform: asProps({ setL: <Code>setLanguage</Code>, setD: <Code>setDictionary</Code> })
      })} />

      <br />

      <ParamList data={params} />

    </>
  )

})
