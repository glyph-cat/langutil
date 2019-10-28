import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import CodeDisplay, { Line, Com, Str, Type } from '../../components/code-display'

const DictionarySecondaryExample = () => (
  <CodeDisplay>
    <Line><Com>{`// ${localize('DOC_EXAMPLE_SECONDARY_LANG')}.js`}</Com></Line>
    <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
    <Line indent={1}>
      <Str>'HELLO_WORLD'</Str>: <Str>'{localize('HELLO_WORLD_SECONDARY')}'</Str>
    </Line>
    <Line>{'}'}</Line>
  </CodeDisplay>
)

export default withLang(DictionarySecondaryExample)
