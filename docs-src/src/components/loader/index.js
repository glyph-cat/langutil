import React from 'react'
import { withLang } from 'langutil/react-additions'
import { localize } from 'langutil'
import './index.css'

function Loader() {
  return (
    <div className='loader-container'>
      <p children={localize('LOADING_ELLIPSIS')} />
    </div>
  )
}

export default withLang(Loader)
