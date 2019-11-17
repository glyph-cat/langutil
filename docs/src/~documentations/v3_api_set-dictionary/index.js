import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '~components/document'
import CodeTitle from '~components/code-title'
import ParamList from '~components/param-list'
import { withProps } from '~modules'

export default withLang(() => {

  const params = {
    dict: {
      type: 'object',
      desc: localize('API_PARAM_DICT'),
    }
  }

  return (
    <>
      <CodeTitle name='setDictionary' params={params} />
      <Body children={localize({
        keyword: 'API_DESC_SET_DICTIONARY',
        transform: withProps({ init: <Code>init()</Code> })
      })} />
      <ParamList data={params} />
    </>
  )

})
