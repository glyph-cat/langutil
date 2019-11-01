import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { asProps } from '../../modules'
import { Body, Code } from '../../components/document'
import ParamList from '../../components/param-list'
import ReturnType from '../../components/return-type'
import DeprecationWarning from '../../components/deprecation-warning'
import CodeTitle from '../../components/code-title'
import { VALUES } from '../../constants'

export default withLang(() => {
  const params = {
    keyword: {
      desc: 'A short string representing the localized value.',
      type: 'string',
    },
    localizations: {
      desc: 'The translations.',
      type: 'object'
    }
  }
  return (
    <>
      <CodeTitle name='createKey' params={params} />
      <DeprecationWarning
        // sinceVersion=''
        removeDate={VALUES.v240DeprecatedRemovalDate}
        message={localize({
          keyword: 'DEPRECATED_MSG_CREATE_KEY',
          transform: asProps({
            dev: <Code>dev-additions</Code>,
            convert: <Code>convert()</Code>
          })
        })}
      />
      <Body children={localize('API_DESC_CREATE_KEY')} />
      <ParamList data={params} />
      <ReturnType desc={localize('API_RTYPE_A_KEYWORD_OBJ')} type='object' />
    </>
  )
})
