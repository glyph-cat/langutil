import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Str, Type } from '../../components/code-display'

const DictionarySecondaryExample = () => (
  <CodeDisplay title={`src/localizations/${localize('DOC_EXAMPLE_SECONDARY_LANG')}.js`}>
    <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
    <Line indent={1}>
      <Str>'HELLO_WORLD'</Str>: <Str>'{localize('HELLO_WORLD_SECONDARY')}'</Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default DictionarySecondaryExample
