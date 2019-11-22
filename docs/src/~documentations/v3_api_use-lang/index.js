import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'

import { Body } from '~components/document'
import CodeTitle from '~components/code-title'
import ParamList from '~components/param-list'
import CodeSamples from '~code-samples'
import { getLangStateInfo } from '~documentations/v3_api_with-lang'

export default withLang(() => {

  const rData = getLangStateInfo()
  return (
    <>
      <CodeTitle name='useLang' rType='any' />
      <Body children={localize('API_DESC_USE_LANG')} />
      <ParamList data={rData} />
      <CodeSamples.ApiUseLang />
    </>
  )

})
