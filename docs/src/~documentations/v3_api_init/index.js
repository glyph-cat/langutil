import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code, SectionBreak } from '~components/document'
import CodeSamples from '~code-samples'
import CodeTitle from '~components/code-title'
import ParamList from '~components/param-list'
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
      <ParamList data={params} />

      <CodeSamples.ApiInit />
      <SectionBreak />

      <Body children={localize({
        keyword: 'DOC_BODY_IN_REACT_CALL_INIT_BEFORE_APP',
        transform: withProps({
          init: <Code>langutil.init()</Code>,
          app: <Code>App</Code>,
          appjs: <Code>App.js</Code>
        })
      })} />

      <CodeSamples.ApiInitReact />

    </>
  )

})
