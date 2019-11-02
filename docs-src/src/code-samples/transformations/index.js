import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Key, Com, Var, Str, Func, Type, Def, Rgx, Rgxe } from '../../components/code-display'

const Transformations = () => {
  return (
    <CodeDisplay title={localize('APPLYING_TRANSFORMATION_TO_YOUR_LOC_STR')}>
      <Line>
        <Def>let</Def> <Var>transformed</Var> = <Func>localize</Func>({'{'}
      </Line>
      <Line indent={1}>
        <Var>keyword</Var>: <Str>'HELLO_WORLD'</Str>,
      </Line>
      <Line indent={1}>
        <Var>transform</Var>: (<Var>value</Var>) <Def>=></Def> {'{'}
      </Line>
      <Line indent={2}>
        <Key>return</Key> <Var>value</Var>.<Func>replace</Func>(<Rgx>/<Rgxe>[</Rgxe>aeiou<Rgxe>]</Rgxe>/</Rgx><Def>gi</Def>, <Str>'*'</Str>)
      </Line>
      <Line indent={1}>
        {'}'}
      </Line>
      <Line>
        {'}'})
      </Line>
      <Line />
      <Line>
        <Type>console</Type>.<Func>log</Func>(<Var>transformed</Var>)
        <Com>{` // ${localize({ keyword: 'HELLO_WORLD', transform: val => val.replace(/[aeiou]/gi, '*') })}`}</Com>
      </Line>
    </CodeDisplay>
  )
}

export default Transformations
