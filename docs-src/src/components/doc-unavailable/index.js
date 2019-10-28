import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { H1 } from '../../components/document'
import './index.css'

function DocUnavailable() {
  return (
    <div className='doc-unavailable-container'>
      <div className='doc-unavailable-subcontainer'>
        <H1 children={localize('DOC_UNAVAILABLE')} />
        <img className='doc-unavailable-img' src={''} alt={localize('DOC_UNAVAILABLE')} />
      </div>
    </div>
  )
}

export default withLang(DocUnavailable)
