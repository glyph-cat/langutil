import React from 'react'
import { appendDictionary, localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '~components/document'
import CodeTitle from '~components/code-title'
import ParamList from '~fragments/param-list'
// import CodeSamples from '~code-samples'
// import { withProps } from '~modules'
// import { PATHS, DOCPATHS } from '~constants'
import localizations from './localizations'

export default withLang(() => {

  appendDictionary(localizations, 'api-append-dict')

  const params = {
    dict: {
      type: 'object',
      desc: localize('API_PARAM_DICT_MERGE'),
    },
    identifier: {
      type: 'string',
      desc: localize('API_PARAM_IDENTIFIER'),
    },
  }

  return (
    <>
      <CodeTitle name='appendDictionary' />
      <Body children={localize('API_DESC_APPEND_DICTIONARY')} />
      <ParamList data={params} />
      {/* <CodeSamples.ApiAppendDictionary /> */}
    </>
  )
})
