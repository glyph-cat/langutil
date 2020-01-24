import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code, CodeLink, SectionBreak } from '~components/document'
import CodeSamples from '~code-samples'
import CodeTitle from '~components/code-title'
import ParamList from '~fragments/param-list'
import { withProps } from '~modules'
import { PATHS, DOCPATHS } from '~constants'

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
        transform: withProps({
          auto: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.autoDetect}`}
            children='AUTO_DETECT'
          />
        })
      }),
      optional: true
    },
  }

  return (
    <>

      <CodeTitle name='init' params={params} />

      <Body children={localize({
        keyword: 'API_DESC_INIT',
        transform: withProps({
          setL: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.setLanguage}`}
            children='setLanguage()'
          />,
          setD: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.setDictionary}`}
            children='setDictionary()'
          />,
        })
      })} />
      <ParamList data={params} />

      <CodeSamples.ApiInit />
      <SectionBreak />

      <Body children={localize({
        keyword: 'DOC_BODY_IN_REACT_CALL_INIT_BEFORE_APP',
        transform: withProps({
          app: <Code>App</Code>,
          appjs: <Code>App.js</Code>
        })
      })} />

      <CodeSamples.ApiInitReact />

    </>
  )

})
