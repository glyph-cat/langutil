import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import CodeDisplay, { Line, Com } from '../../components/code-display'

const FolderStructure = () => (
  <CodeDisplay mode='none'>
    <Line>└─┬ src</Line>
    <Line>  └─┬ localizations</Line>
    <Line indent={1}>├── index.js</Line>
    <Line indent={1}>├── {localize('DOC_EXAMPLE_PRIMARY_LANG')}.js</Line>
    <Line indent={1}>├── {localize('DOC_EXAMPLE_SECONDARY_LANG')}.js</Line>
    <Line indent={1}>└── ... <Com># {localize('DOC_BODY_YOU_MAY_ADD_MORE_FILES')}</Com></Line>
  </CodeDisplay>
)

export default withLang(FolderStructure)
