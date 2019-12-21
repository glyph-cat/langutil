import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Key, Com, Var, Def, Str, Func, Type } from '~components/code-display'

const HomeDemo = () => (
  <CodeDisplay>
    <Line>
      <Key>import</Key> {'{'} <Var>localize</Var> {'}'} <Key>from</Key> <Str>'langutil'</Str>
    </Line>
    <Line>
      <Def>let</Def> <Var>greet</Var> = <Func>localize</Func>(<Str>'HELLO_WORLD'</Str>)
    </Line>
    <Line>
      <Type>console</Type>.<Func>log</Func>(<Var>greet</Var>)
      <Com>{` // ${localize('DOC_EXAMPLE_HELLO_WORLD_PRIMARY_VALUE')}`}</Com>
    </Line>
    <Line>
      <Com>{`// ${localize('ITS_THAT_SIMPLE')}`}</Com>
    </Line>
  </CodeDisplay>
)

export default HomeDemo
