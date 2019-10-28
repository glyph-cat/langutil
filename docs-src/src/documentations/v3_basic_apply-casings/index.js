import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { H1, Body } from '../../components/document'
import CodeSamples from '../../code-samples'
import CasingExamples from '../../components/casing-examples'

export default withLang(() => (
  <>
    <H1 children={localize('APPLY_CASINGS')} />
    <Body children={localize('DOC_BODY_LANGUTIL_ALSO_ALLOW_STYLE_LOC')} />
    <CodeSamples.Casings />
    <br />
    <Body children={localize('DOC_BODY_BELOW_IS_COMPLETE_LIST_OF_CASINGS')} />
    <CasingExamples />
  </>
))
