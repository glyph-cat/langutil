import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Str, Type } from '../../components/code-display'

const DictionaryPrimaryExample = () => (
  <CodeDisplay title={`src/localizations/${localize('DOC_EXAMPLE_PRIMARY_LANG')}.js`}>
    <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
    <Line indent={1}>
      <Str>'HELLO_WORLD'</Str>: <Str>'{localize('HELLO_WORLD')}'</Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default DictionaryPrimaryExample
