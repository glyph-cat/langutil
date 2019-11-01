import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '../../components/document'
import CodeTitle from '../../components/code-title'
import ReturnType from '../../components/return-type'

export default withLang(() => (
  <>
    <CodeTitle name='getDefinedLanguages' rType='void' />
    <Body children={localize('API_DESC_GET_DEFINED_LANG')} />
    <ReturnType desc={localize('API_RTYPE_ALL_LANG_FOUND_IN_DICT')} type='Array<string>' />
  </>
))
