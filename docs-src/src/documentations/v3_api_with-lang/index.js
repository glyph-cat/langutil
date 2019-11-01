import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '../../components/document'
import CodeTitle from '../../components/code-title'
import ParamList from '../../components/param-list'
import CodeSamples from '../../code-samples'

export default withLang(() => {

  const params = {
    WrappedComponent: {
      type: 'React.Component',
      desc: localize('API_PARAM_WRAPPED_COMPONENT'),
    },
  }

  return (
    <>
      <CodeTitle name='withLang' params={params} rType='any' />
      <Body children={localize('API_DESC_WITH_LANG')} />
      <ParamList data={params} />
      <CodeSamples.ApiWithLang />
    </>
  )

})
