import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, CodeLink } from '~components/document'
import CodeTitle from '~components/code-title'
import CodeSamples from '~code-samples'
import ParamList from '~components/param-list'
import { withProps } from '~modules'
import { PATHS, DOCPATHS } from '~constants'

export default withLang(() => {

  const params = {
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
      <CodeTitle name='setLanguage' params={params} />
      <Body children={localize('API_DESC_SET_LANGUAGE')} />
      <ParamList data={params} />
      <CodeSamples.ApiSetLanguage />
    </>
  )

})
