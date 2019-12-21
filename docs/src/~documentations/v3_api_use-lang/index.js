import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'

import CodeTitle from '~components/code-title'
import { Body, Code } from '~components/document'
import DocInfoBox from '~components/doc-infobox'
import ParamList from '~components/param-list'
import CodeSamples from '~code-samples'
import { getLangStateInfo } from '~documentations/v3_api_with-lang'
import { withProps } from '~modules'

export default withLang(() => {

  const rData = getLangStateInfo()
  return (
    <>
      <CodeTitle name='useLang' />

      <DocInfoBox message={localize({
        keyword: 'THIS_ITEM_IS_AVAILABLE_UNDER_PATH',
        transform: withProps({
          path: <Code>'langutil/react-additions'</Code>
        })
      })} />

      <Body children={localize('API_DESC_USE_LANG')} />
      <ParamList data={rData} />
      <CodeSamples.ApiUseLang />
    </>
  )

})
