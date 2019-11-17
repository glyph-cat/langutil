import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '~components/document'
import CodeTitle from '~components/code-title'
import ReturnType from '~components/return-type'

export default withLang(() => (
  <>
    <CodeTitle name='getCurrentLanguage' />
    <Body children={localize('API_DESC_GET_CURRENT_LANG')} />
    <ReturnType desc={localize('API_RTYPE_STR_REP_OF_LANG')} type='string' />
  </>
))