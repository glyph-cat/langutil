import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '../../components/document'
import ReturnType from '../../components/return-type'
import DeprecationWarning from '../../components/deprecation-warning'
import CodeTitle from '../../components/code-title'
import { asProps } from '../../modules'
import { VALUES } from '../../constants'

export default withLang(() => (
  <>
    <CodeTitle name='getLanguage' rType='void' />
    <DeprecationWarning
      // sinceVersion=''
      removeDate={VALUES.v240DeprecatedRemovalDate}
      message={localize({
        keyword: 'DEPRECATED_MSG_GET_LANGUAGE',
        transform: asProps({ getCL: <Code>getCurrentLanguage()</Code> })
      })}
    />
    <Body children={localize('API_DESC_GET_LANG')} />
    <ReturnType desc={localize('API_RTYPE_STR_REP_OF_LANG')} type='string' />
  </>
))
