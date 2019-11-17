import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Com, Def, Func, Line, Key, Str, Var } from '~components/code-display'

const ApiLogsFocus = () => (
  <CodeDisplay title={localize('HOW_TO_USE_API', ['logs.focus()'])}>
    <Line>
      <Key>import</Key> {'{ '}<Var>logs</Var>{' }'} <Key>from</Key> <Str>'langutil'</Str>
    </Line>
    <Line />
    <Line>
      <Def>let</Def> <Var>loggedCodeIsSuccessful</Var> = <Var>logs</Var>.<Func>focus</Func>(() <Def>=></Def> {'{'}
    </Line>
    <Line indent={1}>
      <Com>{`// ${localize('YOUR_CODE_HERE')}`}</Com>
    </Line>
    <Line>
      {'})'}
    </Line>
    <Line />
    <Line>
      <Key>if</Key> (!<Var>loggedCodeIsSuccessful</Var>) {'{'}
    </Line>
    <Line indent={1}>
      <Func>doFallbackAction</Func>()
    </Line>
    <Line>
      {'}'}
    </Line>
  </CodeDisplay>
)

export default ApiLogsFocus
