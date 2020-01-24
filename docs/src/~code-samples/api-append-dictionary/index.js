import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Def, Func, Key, Line, Str, Var, Com, Mark } from '~components/code-display'

const ApiSetDictionary = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['appendDictionary()'])}>
      <Line>
        <Key>import</Key> {'{'} <Var>appendDictionary</Var> } <Key>from</Key> <Str>'langutil'</Str>
      </Line>
      <Line>
        <Key>import</Key> <Var>localizations</Var> <Key>from</Key> <Str>'./localizations'</Str>
      </Line>
      <Line />
      <Line>
        <Def>function</Def> <Func>MyComponent</Func>() {'{'}
      </Line>
      <Line indent={1}>
        <Func>appendDictionary</Func>(<Var>localizations</Var>, <Str>'home-scn'</Str>)
      </Line>
      <Line indent={1}>
        <Mark><Com>{'/* . . . */'}</Com></Mark>
      </Line>
      <Line>
        }
      </Line>
    </CodeDisplay>
  )
}

export default ApiSetDictionary
