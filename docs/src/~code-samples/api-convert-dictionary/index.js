import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Def, Func, Key, Line, Str, Var } from '~components/code-display'

function ApiConvertDictionary() {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['appendDictionary()'])}>
      <Line>
        <Key>import</Key> {'{'} <Var>convertDictionary</Var> } <Key>from</Key> <Str>'langutil/dev-additions'</Str>
      </Line>
      <Line>
        <Key>import</Key> <Var>localizations</Var> <Key>from</Key> <Str>'./localizations'</Str>
      </Line>
      <Line />
      <Line>
        <Def>const</Def> <Var>newDictionary</Var> = <Func>convertDictionary</Func>(<Var>localizations</Var>)
      </Line>
    </CodeDisplay>
  )
}

export default ApiConvertDictionary
