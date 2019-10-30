import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Com, Var, Def, Str, Func, Type } from '../../components/code-display'

const ApiSetLanguage = () => {
  // let name1 = localize('DOC_EXAMPLE_NAME_1')
  return (
    <CodeDisplay>
      <Line>
        <Var>langutil</Var>.<Func>setLanguage</Func>(<Str>'{localize('DOC_EXAMPLE_PRIMARY_LANG')}'</Str>)
        {/* <Def>let</Def> <Var>c1</Var> = <Func>localize</Func>(<Str>'HELLO_NAME'</Str>, [<Str>'{name1}'</Str>], <Str>'upperCase'</Str>) */}
      </Line>
    </CodeDisplay>
  )
}

export default ApiSetLanguage
