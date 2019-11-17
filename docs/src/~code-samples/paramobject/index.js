import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Com, Var, Str, Func, Type, Def } from '~components/code-display'

const ParamObject = () => {
  const name1 = localize('DOC_EXAMPLE_NAME_1')
  const name2 = localize('DOC_EXAMPLE_NAME_2')
  return (
    <CodeDisplay title={`${localize('IN_YOUR_OWN_FILE_COLON')}`}>
      <Line>
        <Def>let</Def> <Var>a</Var> = <Func>localize</Func>(<Str>'HELLO_NAME'</Str>, {'{ '}<Var>name1</Var>: <Str>'{name1}'</Str>{' }'})
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func>(<Var>a</Var>)
        <Com>
          {` // ${localize('DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_ACTUAL', { name1 })}`}
        </Com>
      </Line>
      <Line>
        <Def>let</Def> <Var>b</Var> = <Func>localize</Func>(<Str>'HELLO_NAME_2'</Str>, {'{ '}<Var>name1</Var>: <Str>'{name1}'</Str>, <Var>name2</Var>: <Str>'{name2}'</Str>{' }'})
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func>(<Var>b</Var>)
        <Com>
          {` // ${localize('DOC_EXAMPLE_PARAM_OBJ_HELLO_NAME_2_ACTUAL', { name1, name2 })}`}
        </Com>
      </Line>
    </CodeDisplay>
  )
}

export default ParamObject
