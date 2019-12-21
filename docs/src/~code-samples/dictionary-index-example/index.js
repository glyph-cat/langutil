import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Func, Line, Str, Type, Var } from '~components/code-display'

const DictionaryIndexExample = () => {
  const primaryLang = localize('DOC_EXAMPLE_PRIMARY_LANG')
  const secondaryLang = localize('DOC_EXAMPLE_SECONDARY_LANG')
  return (
    <CodeDisplay title='src/localizations/index.js'>
      <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
      <Line indent={1}>
        <Var>{primaryLang}</Var>: <Func>require</Func>(<Str>'./{primaryLang}'</Str>),
      </Line>
      <Line indent={1}>
        <Var>{secondaryLang}</Var>: <Func>require</Func>(<Str>'./{secondaryLang}'</Str>)
      </Line>
      <Line>{'}'}</Line>
    </CodeDisplay>
  )
}

export default DictionaryIndexExample
