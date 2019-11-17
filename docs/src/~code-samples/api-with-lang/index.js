import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Com, Def, Func, Key, Line, Mark, Var } from '~components/code-display'

const ApiWithLang = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['withLang()'])}>
      <Line>
        <Def>const</Def> <Func>MyComponent</Func> = () <Def>=></Def> {'{ '}<Com><Mark>{'/* ... */'}</Mark></Com>{' }'}
      </Line>
      <Line>
        <Key>export default</Key> <Func>withLang</Func>(<Var>MyComponent</Var>)
      </Line>
    </CodeDisplay>
  )
}

export default ApiWithLang
