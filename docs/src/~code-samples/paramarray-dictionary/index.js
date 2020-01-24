import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Str, Type, Var } from '~components/code-display'

const ParamArrayDictionary = () => (
  <CodeDisplay title={`localizations/${localize('DOCX_PRIMARY_LANG')}.js`}>
    <Line>
      <Type>module</Type>.<Type>exports</Type> = {'{'}
    </Line>
    <Line indent={1}>
      <Var>HELLO_NAME</Var>: <Str>'{localize('DOCX_PARAM_ARR_HELLO_NAME_RAW')}'</Str>,
    </Line>
    <Line indent={1}>
      <Var>HELLO_NAME_2</Var>: <Str>'{localize('DOCX_PARAM_ARR_HELLO_NAME_2_RAW')}'</Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default ParamArrayDictionary
