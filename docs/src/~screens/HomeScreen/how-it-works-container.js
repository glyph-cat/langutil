import React from 'react'
import { localize } from 'langutil'
import CodeSamples from '~code-samples'
import { H1 } from '~components/document'

function HowItWorksStatContainer() {
  return (
    <div className='home-scn-howItWorks-container'>
      <div>
        <H1
          style={{ textAlign: 'center' }}
          children={localize('HERES_HOW_IT_WORKS_NUTSHELL')}
        />
        <CodeSamples.HomeDemo />
      </div>
    </div>
  )
}

export default HowItWorksStatContainer
