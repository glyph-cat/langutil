import React from 'react'
import { localize } from 'langutil'
import CodeDisplay, { Line } from '~components/code-display'

const InstallUsingNpm = () => (
  <CodeDisplay title={localize('USING_NPM')} mode='none'>
    <Line>npm install langutil</Line>
  </CodeDisplay>
)

export default InstallUsingNpm