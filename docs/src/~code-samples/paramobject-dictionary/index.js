import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Str, Type, Var } from '~components/code-display'

const ParamObjectDictionary = () => (
  <CodeDisplay title={`localizations/${localize('DOC_EXAMPLE_PRIMARY_LANG')}.js`}>
    <Line>
      <Type>module</Type>.<Type>exports</Type> = {'{'}
    </Line>
    <Line indent={1}>
      <Var>HELLO_NAME</Var>: <Str>'{localize('DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_RAW')}'</Str>,
    </Line>
    <Line indent={1}>
      <Var>HELLO_NAME_2</Var>: <Str>'{localize('DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_2_RAW')}'</Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default ParamObjectDictionary
