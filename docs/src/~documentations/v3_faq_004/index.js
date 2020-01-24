import React from 'react'
import { appendDictionary, localize } from 'langutil'
import { H1, Body, CodeLink } from '~components/document'
import { DOCPATHS, PATHS } from '~constants'
import { withProps } from '~modules'
import localizations from './localizations'

export default () => {
  appendDictionary(localizations, 'faq-004')
  return (
    <>
      <H1 id='002' children={localize('FAQ_TITLE_004')} />
      <Body children={localize({
        keyword: 'FAQ_CONTENT_004',
        transform: withProps({
          wl: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.withLang}`}
            children='withLang()'
          />,
          ul: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.useLang}`}
            children='useLang()'
          />,
        })
      })} />
    </>
  )
}
