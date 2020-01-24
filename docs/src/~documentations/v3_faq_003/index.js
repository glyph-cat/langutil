import React from 'react'
import { appendDictionary, localize } from 'langutil'
import { H1, Body, CodeLink } from '~components/document'
import { PATHS, DOCPATHS } from '~constants'
import { withProps } from '~modules'
import localizations from './localizations'

export default () => {
  appendDictionary(localizations, 'faq-003')
  return (
    <>
      <H1 id='003' children={localize('FAQ_TITLE_003')} />
      <Body children={localize({
        keyword: 'FAQ_CONTENT_003',
        transform: withProps({
          lm: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.langmap}`}
            children='langmap()'
          />
        })
      })} />
    </>
  )
}
