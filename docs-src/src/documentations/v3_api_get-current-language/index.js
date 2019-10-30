import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '../../components/document'
import CodeTitle from '../../components/code-title'

export default withLang(() => (
  <>
    <CodeTitle name='getCurrentLanguage' rType='void' />
    <Body children={localize('API_DESC_GET_CURRENT_LANG')} />
  </>
))