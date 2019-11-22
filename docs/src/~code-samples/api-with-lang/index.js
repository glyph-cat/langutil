import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Com, Def, Func, Key, Line, Mark, Var } from '~components/code-display'

const ApiWithLang = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['withLang()'])}>
      <Line>
        <Def>function</Def> <Func>MyComponent</Func>({'{'}
      </Line>
      <Line indent={1}>
        <Var>myProp1</Var>, <Var>myProp2</Var>,
      </Line>
      <Line indent={1}>
        <Var>langState</Var>: {'{ '}<Var>auto</Var>, <Var>lang</Var>{' }'}
      </Line>
      <Line>
        })
      </Line>
      <Line indent={1}>
        <Com><Mark>{'/* ... */'}</Mark></Com>
      </Line>
      <Line>
        {'}'}
      </Line>
      <Line />
      <Line>
        <Key>export default</Key> <Func>withLang</Func>(<Var>MyComponent</Var>)
      </Line>
    </CodeDisplay>
  )
}

export default ApiWithLang
