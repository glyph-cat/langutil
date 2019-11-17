import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, SectionBreak } from '~components/document'
import CodeSamples from '~code-samples'
import CodeTitle from '~components/code-title'
import ParamList from '~components/param-list'
import ReturnType from '~components/return-type'

export default withLang(() => {

  const focusParams = {
    fn: {
      type: 'Function',
      desc: localize('API_PARAM_FN')
    },
  }

  return (
    <>

      <Body children={localize('DOC_BODY_LOGS_NOT_SHOWN_IN_PROD')} style={{ fontStyle: 'italic' }} />
      <SectionBreak />

      <CodeTitle name='logs.show' />
      <Body children={localize('API_DESC_LOGS_SHOW')} />

      <SectionBreak />
      <CodeTitle name='logs.hide' />
      <Body children={localize('API_DESC_LOGS_HIDE')} />

      <SectionBreak />
      <CodeTitle name='logs.showVerbose' />
      <Body children={localize('API_DESC_LOGS_SHOW_VERBOSE')} />

      <SectionBreak />
      <CodeTitle name='logs.hideVerbose' />
      <Body children={localize('API_DESC_LOGS_HIDE_VERBOSE')} />

      <SectionBreak />
      <CodeTitle name='logs.focus' />
      <Body children={localize('API_DESC_LOGS_FOCUS')} />
      <ParamList data={focusParams} />
      <ReturnType desc={localize('API_RTYPE_LOGS_FOCUS')} type='boolean' />
      <CodeSamples.ApiLogsFocus />

    </>
  )

})
