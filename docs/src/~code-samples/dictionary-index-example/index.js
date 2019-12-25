import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Func, Line, Str, Type, Var } from '~components/code-display'

const DictionaryIndexExample = () => {
  const primaryLang = localize('DOCX_PRIMARY_LANG')
  const secondaryLang = localize('DOCX_SECONDARY_LANG')
  return (
    <CodeDisplay title='src/localizations/index.js'>
      <Line><Type>module</Type>.<Type>exports</Type> = {'{'}</Line>
      <Line indent={1}>
        <SafeKey text={primaryLang} />: <Func>require</Func>(<Str>'./{primaryLang}'</Str>),
      </Line>
      <Line indent={1}>
        <SafeKey text={secondaryLang} />: <Func>require</Func>(<Str>'./{secondaryLang}'</Str>)
      </Line>
      <Line>{'}'}</Line>
    </CodeDisplay>
  )
}

export default DictionaryIndexExample

function SafeKey({ text }) {
  if (text.match('-')) {
    return <Str>'{text}'</Str>
  } else {
    return <Var>{text}</Var>
  }
}
