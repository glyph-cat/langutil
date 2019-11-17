import React from 'react'
import { File } from 'react-kawaii'
import { localize } from 'langutil'
import { VALUES } from '~constants'
import { H1 } from '~components/document'
import ReactKawaiiPromoText from '~components/react-kawaii-promo-text'
import './index.css'

function DocUnavailable() {
  return (
    <div className='doc-unavailable-container'>
      <div className='doc-unavailable-subcontainer'>
        <File size={VALUES.DERIVED.reactKawaiiLarge()} mood='sad' color='#ffb2d1' />
        <H1
          className='doc-unavailable-text'
          children={localize('THIS_DOC_IS_UNAVAILABLE')}
        />
        <ReactKawaiiPromoText />
      </div>
    </div>
  )
}

export default DocUnavailable
