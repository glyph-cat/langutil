import React from 'react'
import { withLang } from 'langutil/react-additions'
import { localize } from 'langutil'
import CodeDisplay, { Line, Com } from '../../components/code-display'

const Install = () => (
  <CodeDisplay mode='none'>
    <Com># {localize('USING_NPM')}</Com>
    <Line>npm install langutil</Line>
    <Line />
    <Com># {localize('USING_YARN')}</Com>
    <Line>yarn add langutil</Line>
  </CodeDisplay>
)

export default withLang(Install)