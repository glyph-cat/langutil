import React from 'react'
import { localize} from 'langutil'
import CodeDisplay, { Com, Def, Func, Key, Line, Mark, Var } from '~components/code-display'

const ApiUseLang = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['useLang()'])}>
      <Line>
        <Def>function</Def> <Func>MyComponent</Func> () {'{'}
      </Line>
      <Line indent={1}>
        <Def>const</Def> {'{ '}<Var>auto</Var>, <Var>lang</Var>{' }'} = <Func>useLang</Func>()
      </Line>
      <Line indent={1}>
        <Com><Mark>/* ... */</Mark></Com>
      </Line>
      <Line>
        {'}'}
      </Line>
    </CodeDisplay>
  )
}

export default ApiUseLang
