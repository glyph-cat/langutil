import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Func, Key, Line, Str, Type, Var, Com } from '~components/code-display'

function ApiGetGuidedLanguage() {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['appendDictionary()'])}>
      <Line>
        <Key>import</Key> {'{'} <Var>getGuidedLanguage</Var>, <Var>AUTO_DETECT</Var> } <Key>from</Key> <Str>'langutil'</Str>
      </Line>
      <Line />
      <Line>
        <Type>console</Type>.<Func>log</Func>(<Func>getGuidedLanguage</Func>(<Var>AUTO_DETECT</Var>))
      </Line>
      <Line>
        <Com>{`// ${localize('DOCX_PRIMARY_LANG')}`}</Com>
      </Line>
    </CodeDisplay>
  )
}

export default ApiGetGuidedLanguage
