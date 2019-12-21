import React from 'react'
import { localize } from 'langutil'
import { H1, Body } from '~components/document'

export default () => (
  <>
    <H1 id='001' children={localize('FAQ_TITLE_001')} />
    <Body children={localize('FAQ_CONTENT_001')} />
  </>
)
