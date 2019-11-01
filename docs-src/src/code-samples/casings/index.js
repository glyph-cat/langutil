import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Com, Var, Def, Str, Func, Type } from '../../components/code-display'

const Casings = () => {
  let name1 = localize('DOC_EXAMPLE_NAME_1')
  return (
    <CodeDisplay>
      <Line>
        <Def>let</Def> <Var>c1</Var> = <Func>localize</Func>(<Str>'HELLO_NAME'</Str>, [<Str>'{name1}'</Str>], <Str>'upperCase'</Str>)
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func> = (<Var>c1</Var>)
        <Com>{` // ${localize('DOC_EXAMPLE_PARAM_ARR_HELLO_NAME_ACTUAL', [name1], 'upperCase')}`}</Com>
      </Line>
      <Line />
      <Line>
        <Com>{`// If there are no parameters to be passed in,`}</Com>
      </Line>
      <Line>
        <Com>{`// you can use an alternative syntax like this:`}</Com>
      </Line>
      <Line>
        <Def>let</Def> <Var>c2</Var> = <Func>localize</Func>({'{ '}<Var>keyword</Var>: <Str>'HELLO_WORLD'</Str>, <Var>casing</Var>: <Str>'titleCase'</Str>{' }'})
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func> = (<Var>c2</Var>)
        <Com>{` // ${localize({ keyword: 'HELLO_WORLD', casing: 'titleCase' })}`}</Com>
      </Line>
    </CodeDisplay>
  )
}

export default Casings
