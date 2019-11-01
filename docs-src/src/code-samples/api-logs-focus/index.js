import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Key, Var, Str, Func, Def, Com, Type } from '../../components/code-display'

const ApiLogsFocus = () => (
  <CodeDisplay title={localize('HOW_TO_USE_API', ['logs.focus()'])}>
    <Line>
      <Key>import</Key> {'{ '}<Var>logs</Var>{' }'} <Key>from</Key> <Str>'langutil'</Str>
    </Line>
    <Line />
    <Line>
      <Def>let</Def> <Var>loggedCode</Var> = <Var>logs</Var>.<Func>focus</Func>(() <Def>=></Def> {'{'}
    </Line>
    <Line indent={1}>
      <Com>{`// ${localize('YOUR_CODE_HERE')}`}</Com>
    </Line>
    <Line>
      {'})'}
    </Line>
    <Line />
    <Line>
      <Type>console</Type>.<Func>log</Func>(<Var>loggedCode</Var>)
      <Com>{' // `true` || `false`'}</Com>
    </Line>
  </CodeDisplay>
)

export default ApiLogsFocus
