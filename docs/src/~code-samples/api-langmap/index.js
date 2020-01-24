import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Com, Func, Line, Str, Var } from '~components/code-display'

const ApiLangmap = () => {
  const lang2 = localize('DOCX_SECONDARY_LANG')
  const keyword = 'HELLO'
  const value2 = localize('DOCX_HELLO_VALUE_SECONDARY')
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['langmap()'])}>
      <Line>
        <Func>setLanguage</Func>(<Str>'{localize('DOCX_PRIMARY_LANG')}'</Str>)
      </Line>
      <Line>
        <Func>localize</Func>(<Str>'{keyword}'</Str>)
        <Com>{' // '}{localize('DOCX_HELLO_VALUE_PRIMARY')}</Com>
      </Line>
      <Line>
        <Func>langmap</Func>(<Str>'{lang2}'</Str>, <Str>'{keyword}'</Str>)
        <Com>{` // ${value2}`}</Com>
      </Line>
      <Line>
        <Func>langmap</Func>({'{'}
      </Line>
      <Line indent={1}>
        <Var>lang</Var>: <Str>'{lang2}'</Str>,
      </Line>
      <Line indent={1}>
        <Var>keyword</Var>: <Str>'{keyword}'</Str>
      </Line>
      <Line>
        }) <Com>{`// ${value2}`}</Com>
      </Line>
    </CodeDisplay>
  )
}

export default ApiLangmap
