import React from 'react'
import { localize } from 'langutil'
import './index.css'

function DeprecatedLabel() {
  return (
    <div className='deprecated-label-container'>
      <span
        className='deprecated-label-span'
        children={localize('DEPRECATED', null, 'upperCase')}
      />
    </div>
  )
}

export default DeprecatedLabel
