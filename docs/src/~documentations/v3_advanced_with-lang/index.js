import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '~components/document'
import CodeTitle from '~components/code-title'
import ParamList from '~fragments/param-list'
import { withProps } from '~modules'

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
        transform: withProps({ auto: <Code>AUTO_DETECT</Code> })
      }),
      optional: true
    },
  }

  return (
    <>

      <CodeTitle name='init' params={params} />

      <Body children={localize({
        keyword: 'API_DESC_INIT',
        transform: withProps({ setL: <Code>setLanguage</Code>, setD: <Code>setDictionary</Code> })
      })} />

      <br />

      <ParamList data={params} />

    </>
  )

})
