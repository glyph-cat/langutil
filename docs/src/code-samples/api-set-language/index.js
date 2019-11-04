import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Func, Line, Str, Def, Var, Ang } from '../../components/code-display'

const ApiSetLanguage = () => {
  return (
    <CodeDisplay title={localize('HOW_TO_USE_API', ['setLanguage()'])}>
      <Line>
        <Ang>{'<'}</Ang><Def>select</Def><Ang>{'>'}</Ang>
      </Line>
      <Line indent={1}>
        <Ang>{'<'}</Ang>
        <Def>option</Def> <Var>onClick</Var>={'{() '}<Def>=></Def>{' { '}
        <Func>setLanguage</Func>
        (<Str>'{localize('DOC_EXAMPLE_PRIMARY_LANG')}'</Str>)
        {' }}'}<Ang>{'>'}</Ang>
      </Line>
      <Line indent={2}>{localize('DOC_EXAMPLE_PRIMARY_LANG_NAME')}</Line>
      <Line indent={1}>
        <Ang>{'</'}</Ang><Def>option</Def><Ang>{'>'}</Ang>
      </Line>
      <Line indent={1}>
        <Ang>{'<'}</Ang>
        <Def>option</Def> <Var>onClick</Var>={'{() '}<Def>=></Def>{' { '}
        <Func>setLanguage</Func>
        (<Str>'{localize('DOC_EXAMPLE_SECONDARY_LANG')}'</Str>)
        {' }}'}<Ang>{'>'}</Ang>
      </Line>
      <Line indent={2}>{localize('DOC_EXAMPLE_SECONDARY_LANG_NAME')}</Line>
      <Line indent={1}>
        <Ang>{'</'}</Ang><Def>option</Def><Ang>{'>'}</Ang>
      </Line>
      <Line>
        <Ang>{'</'}</Ang><Def>select</Def><Ang>{'>'}</Ang>
      </Line>
    </CodeDisplay>
  )
}

export default ApiSetLanguage


/*

<select>
    <option onClick={() => { setLanguage('en')} }>
        English
    </option>
    <option onClick={() => { setLanguage('zh')} }>
        Chinese
    </option>
</select>

*/