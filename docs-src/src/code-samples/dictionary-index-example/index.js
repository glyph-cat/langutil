import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import CodeDisplay, { Line, Com, Str, Type, Func } from '../../components/code-display'

const DictionaryIndexExample = () => {
  const primaryLang = localize('DOC_EXAMPLE_PRIMARY_LANG')
  const secondaryLang = localize('DOC_EXAMPLE_SECONDARY_LANG')
  return (
    <CodeDisplay>
      <Line><Com>{'// index.js'}</Com></Line>
      <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
      <Line indent={1}>
        <Str>'{primaryLang}'</Str>: <Func>require</Func>(<Str>'./{primaryLang}'</Str>),
      </Line>
      <Line indent={1}>
        <Str>'{secondaryLang}'</Str>: <Func>require</Func>(<Str>'./{secondaryLang}'</Str>)
      </Line>
      <Line>{'}'}</Line>
    </CodeDisplay>
  )
}

export default withLang(DictionaryIndexExample)
