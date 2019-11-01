import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line } from '../../components/code-display'

const InstallUsingYarn = () => (
  <CodeDisplay title={localize('USING_YARN')} mode='none'>
    <Line>yarn add langutil</Line>
  </CodeDisplay>
)

export default InstallUsingYarn