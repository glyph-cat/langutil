import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '../../components/document'
import CodeTitle from '../../components/code-title'
import ReturnType from '../../components/return-type'
import { STRINGS } from '../../constants'

export default withLang(() => (
  <>
    <CodeTitle name='isAuto' rType='void' />
    <Body children={localize('API_DESC_IS_AUTO')} />
    <ReturnType desc={STRINGS.notAvailableDash} type='boolean' />
  </>
))
