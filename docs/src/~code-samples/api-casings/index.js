import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Com, Line, Key, Var, Str, Func, Mark } from '~components/code-display'

const ApiCasings = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['CASINGS'])}>
      <Line>
        <Key>import</Key> {'{'} <Var>Casings</Var> } <Key>from</Key> <Str>'langutil'</Str>
      </Line>
      <Line />
      <Line>
        <Var>Casings</Var>.<Mark><Func>x</Func></Mark>(<Str>hello world</Str>)
      </Line>
      <Line>
        <Com>{`// ${localize('WHERE_X_IS_ONE_OF_BELOW_COLON')}`}</Com>
      </Line>
    </CodeDisplay>
  )
}

export default ApiCasings
