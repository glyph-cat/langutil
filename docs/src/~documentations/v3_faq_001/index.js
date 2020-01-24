import React from 'react'
import { appendDictionary, localize } from 'langutil'
import { H1, Body } from '~components/document'
import localizations from './localizations'

export default () => {
  appendDictionary(localizations, 'faq-001')
  return (
    <>
      <H1 id='001' children={localize('FAQ_TITLE_001')} />
      <Body children={localize('FAQ_CONTENT_001')} />
    </>
  )
}
