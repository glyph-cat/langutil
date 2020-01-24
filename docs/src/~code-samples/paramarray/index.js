import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Com, Var, Str, Func, Type, Def } from '~components/code-display'

const ParamArray = () => {
  const name1 = localize('DOCX_NAME_1')
  const name2 = localize('DOCX_NAME_2')
  return (
    <CodeDisplay title={`${localize('IN_YOUR_OWN_FILE_COLON')}`}>
      <Line>
        <Def>let</Def> <Var>a</Var> = <Func>localize</Func>(<Str>'HELLO_NAME'</Str>, [<Str>'{name1}'</Str>])
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func>(<Var>a</Var>)
        <Com>
          {` // ${localize('DOCX_PARAM_ARR_HELLO_NAME_VALUE', [name1])}`}
        </Com>
      </Line>
      <Line>
        <Def>let</Def> <Var>b</Var> = <Func>localize</Func>(<Str>'HELLO_NAME_2'</Str>, [<Str>'{name1}'</Str>, <Str>'{name2}'</Str>])
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func>(<Var>b</Var>)
        <Com>
          {` // ${localize('DOCX_PARAM_ARR_HELLO_NAME_2_VALUE', [name1, name2])}`}
        </Com>
      </Line>
    </CodeDisplay>
  )
}

export default ParamArray
