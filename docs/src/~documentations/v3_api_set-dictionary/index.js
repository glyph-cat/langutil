import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, CodeLink } from '~components/document'
import CodeTitle from '~components/code-title'
import ParamList from '~components/param-list'
import { PATHS, DOCPATHS } from '~constants'
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
        transform: withProps({
          init: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.init}`}
            children='init()'
          />
        })
      })} />
      <ParamList data={params} />
    </>
  )

})
