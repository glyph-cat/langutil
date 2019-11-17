import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, {
  Com, Def, Func, Line, LineAdd, Key, Str, Type, Var
} from '~components/code-display'

const ApiInit = () => (
  <CodeDisplay title={localize('HOW_TO_USE_API_REACT', ['init()'])}>
    <Line>
      <Key>import</Key> <Var>React</Var> <Key>from</Key> <Str>'React'</Str>
    </Line>
    <LineAdd>
      <Key>import</Key> <Var>langutil</Var>, {'{'} <Var>localize</Var>, <Var>AUTO_DETECT</Var> {'}'} <Key>from</Key> <Str>'langutil'</Str>
    </LineAdd>
    <LineAdd>
      <Key>import</Key> <Var>dictionary</Var> <Key>from</Key> <Str>'./localizations'</Str>
    </LineAdd>
    <LineAdd />
    <LineAdd>
      <Var>langutil</Var>.<Func>init</Func>(<Var>dictionary</Var>, <Str>'{localize('DOC_EXAMPLE_PRIMARY_LANG')}'</Str>, <Var>AUTO_DETECT</Var>)
    </LineAdd>
    <Line />
    <Line>
      <Def>function</Def> <Type>App</Type> () {'{'}
    </Line>
    <Line indent={1}>
      <Com>{'// ...'}</Com>
    </Line>
  </CodeDisplay>
)

export default ApiInit
