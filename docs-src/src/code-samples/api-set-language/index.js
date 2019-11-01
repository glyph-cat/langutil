import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Func, Line, Str, Var } from '../../components/code-display'

const ApiSetLanguage = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['setLanguage()'])}>
      <Line>
        <Var>langutil</Var>.<Func>setLanguage</Func>(<Str>'{localize('DOC_EXAMPLE_PRIMARY_LANG')}'</Str>)
        {/* <Def>let</Def> <Var>c1</Var> = <Func>localize</Func>(<Str>'HELLO_NAME'</Str>, [<Str>'{name1}'</Str>], <Str>'upperCase'</Str>) */}
      </Line>
    </CodeDisplay>
  )
}

export default ApiSetLanguage
