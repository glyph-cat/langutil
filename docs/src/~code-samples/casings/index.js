import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line, Com, Var, Def, Str, Func, Type } from '~components/code-display'

const Casings = () => {
  let name1 = localize('DOCX_NAME_1_FOR_CASING')
  return (
    <CodeDisplay title={localize('APPLYING_CASINGS_TO_YOUR_LOC_STR')}>
      <Line>
        <Com>
          {`// HELLO_NAME: '${localize('DOCX_HELLO_NAME_FOR_CASING_RAW')}',`}
        </Com>
      </Line>
      <Line>
        <Com>
          {`// HELLO_WORLD: '${localize('DOCX_HELLO_WORLD_FOR_CASING_VALUE')}'`}
        </Com>
      </Line>
      <Line />
      <Line>
        <Def>let</Def> <Var>c1</Var> = <Func>localize</Func>(<Str>'HELLO_NAME'</Str>, [<Str>'{name1}'</Str>], <Str>'upperCase'</Str>)
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func> = (<Var>c1</Var>)
        <Com>{` // ${localize('DOCX_HELLO_NAME_FOR_CASING_VALUE', [name1], 'upperCase')}`}</Com>
      </Line>
      <Line />
      <Line>
        <Com>{'// ' + localize('DOC_BODY_CASING_IF_NO_PARAM_LINE_1')}</Com>
      </Line>
      <Line>
        <Com>{'// ' + localize('DOC_BODY_CASING_IF_NO_PARAM_LINE_2')}</Com>
      </Line>
      <Line>
        <Def>let</Def> <Var>c2</Var> = <Func>localize</Func>({'{ '}<Var>keyword</Var>: <Str>'HELLO_WORLD'</Str>, <Var>casing</Var>: <Str>'titleCase'</Str>{' }'})
      </Line>
      <Line>
        <Type>console</Type>.<Func>log</Func> = (<Var>c2</Var>)
        <Com>{` // ${localize({ keyword: 'DOCX_HELLO_WORLD_FOR_CASING_VALUE', casing: 'titleCase' })}`}</Com>
      </Line>
    </CodeDisplay>
  )
}

export default Casings
