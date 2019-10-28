import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import CodeDisplay, { Line, Com, Var, Str, Func, Type, Def } from '../../components/code-display'

const Usage = () => (
  <CodeDisplay>
    <Line>
      <Def>let</Def> <Var>greet</Var> = <Func>localize</Func>(<Str>'HELLO_WORLD'</Str>)
    </Line>
    <Line>
      <Type>console</Type>.<Func>log</Func>(<Var>greet</Var>)
      <Com>{` // ${localize('OUTPUT_HELLO_WORLD')}`}</Com>
    </Line>
  </CodeDisplay>
)

export default withLang(Usage)
