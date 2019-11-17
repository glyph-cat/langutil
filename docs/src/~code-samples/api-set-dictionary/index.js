import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Func, Key, Line, Str, Var } from '~components/code-display'

const ApiSetLanguage = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['setDictionary()'])}>
      <Line>
        <Key>import</Key> <Var>dictionary</Var> <Key>from</Key> <Str>'./localizations'</Str>
      </Line>
      <Line>
        <Var>langutil</Var>.<Func>setDictionary</Func>(<Var>dictionary</Var>)
      </Line>
    </CodeDisplay>
  )
}

export default ApiSetLanguage
