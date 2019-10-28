import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import CodeDisplay, { Line, Com, Str, Type } from '../../components/code-display'

const ParamObjectDictionary = () => (
  <CodeDisplay title={`localizations/${localize('DOC_EXAMPLE_PRIMARY_LANG')}.js`}>
    <Line>
      <Type>module</Type>.<Type>exports</Type> = {'{'}
    </Line>
    <Line indent={1}>
      <Str>'HELLO_NAME'</Str>: <Str>'{localize('DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME')}'</Str>,
    </Line>
    <Line indent={1}>
      <Str>
        'HELLO_NAME_2'</Str>: <Str>'{localize('DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_2')}'
      </Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default withLang(ParamObjectDictionary)
