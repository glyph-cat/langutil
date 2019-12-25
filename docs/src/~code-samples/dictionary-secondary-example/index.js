import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Str, Type, Var } from '~components/code-display'

const DictionarySecondaryExample = () => (
  <CodeDisplay title={`src/localizations/${localize('DOCX_SECONDARY_LANG')}.js`}>
    <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
    <Line indent={1}>
      <Var>HELLO_WORLD</Var>: <Str>'{localize('DOCX_HELLO_WORLD_SECONDARY_VALUE')}'</Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default DictionarySecondaryExample
