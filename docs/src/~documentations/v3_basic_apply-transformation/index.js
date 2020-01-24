import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { H1, Body } from '~components/document'
import CodeSamples from '~code-samples'

export default withLang(() => (
  <>
    <H1 id='apply-transformation' children={localize('APPLY_TRANSFORMATION')} />
    <Body children={localize('DOC_BODY_IF_THE_BUILT_IN_CSTYLES_X_ENOUGH')} />
    <CodeSamples.Transformations />
  </>
))