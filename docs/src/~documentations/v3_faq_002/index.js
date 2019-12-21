import React from 'react'
import { localize } from 'langutil'
import { H1, Body, Code } from '~components/document'
import { withProps } from '~modules'

export default () => (
  <>
    <H1 id='002' children={localize('FAQ_TITLE_002')} />
    <Body>

      {localize({
        keyword: 'FAQ_CONTENT_002',
        transform: withProps({
          ad: <Code>AUTO_DETECT</Code>,
          lu: <Code>'langutil'</Code>,
          luna: <Code>'langutil/native-additions'</Code>,
        })
      })}

      <br /><br />

      {localize('FAQ_CONTENT_002_B')}

      <br /><br />

      {localize('FAQ_CONTENT_002_C')}

    </Body>

  </>
)
