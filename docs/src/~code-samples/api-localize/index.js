import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Com, Def, Func, Line, Rgx, Rgxe, Str, Var } from '~components/code-display'

const ApiSetLanguage = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['localize()'])}>
      <Line>
        <Com>{`// ${localize('NORMAL_SYNTAX')}`}</Com>
      </Line>
      <Line>
        <Func>localize</Func>(<Str>'KEYWORD'</Str>, [<Str>'{localize('SOME_PARAMETER')}'</Str>], <Str>'upperCase'</Str>, (<Var>str</Var>) <Def>=></Def> <Var>str</Var>.<Func>replace</Func>(<Rgx>/<Rgxe>[</Rgxe>aeiou<Rgxe>]</Rgxe>/</Rgx><Def>gi</Def>, <Str>'*'</Str>)
      </Line>
      <Line>
        <Func>localize</Func>(<Str>'KEYWORD'</Str>, {'{ '}<Var>key</Var>: <Str>'{localize('SOME_PARAMETER')}'</Str>{' }'}, <Str>'upperCase'</Str>, (<Var>str</Var>) <Def>=></Def> <Var>str</Var>.<Func>replace</Func>(<Rgx>/<Rgxe>[</Rgxe>aeiou<Rgxe>]</Rgxe>/</Rgx><Def>gi</Def>, <Str>'*'</Str>)
      </Line>
      <Line />
      <Line>
        <Com>{`// ${localize('ALTERNATIVE_SYNTAX')}`}</Com>
      </Line>
      <Line>
        <Func>localize</Func>({'{'}
      </Line>
      <Line indent={1}>
        <Var>keyword</Var>: <Str>'KEYWORD'</Str>
      </Line>
      <Line indent={1}>
        <Var>param</Var>: [<Str>'{localize('SOME_PARAMETER')}'</Str>]
      </Line>
      <Line indent={1}>
        <Com>{`// ${localize('OR', null, 'lowerCase')}`}</Com>
      </Line>
      <Line indent={1}>
        <Var>param</Var>: {'{ '}<Var>key</Var>: <Str>'{localize('SOME_PARAMETER')}'</Str>{' }'}
      </Line>
      <Line indent={1}>
        <Var>casing</Var>: <Str>'upperCase'</Str>
      </Line>
      <Line indent={1}>
        <Var>transform</Var>: (<Var>str</Var>) <Def>=></Def> <Var>str</Var>.<Func>replace</Func>(<Rgx>/<Rgxe>[</Rgxe>aeiou<Rgxe>]</Rgxe>/</Rgx><Def>gi</Def>, <Str>'*'</Str>)
      </Line>
      <Line>
        {'})'}
      </Line>
    </CodeDisplay>
  )
}

export default ApiSetLanguage
