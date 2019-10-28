import React from 'react'
import { File } from 'react-kawaii'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { STRINGS } from '../../constants'
import { H1, Body } from '../../components/document'
import { asProps } from '../../modules'
import './index.css'

function DocUnavailable() {
  return (
    <div className='doc-unavailable-container'>
      <div className='doc-unavailable-subcontainer'>
        <File size={window.innerHeight / 3} mood='sad' color='#ffb2d1' />
        <H1 className='doc-unavailable-text' children={localize('DOC_UNAVAILABLE')} />
        <Body
          className='doc-unavailable-react-kawaii'
          children={localize({
            keyword: 'LIKE_THIS_KAWAII_IMG',
            transform: asProps({ link: <a href={STRINGS.reactKawaiiHomePage} target='_blank' rel='noopener noreferrer' children='React Kawaii' /> })
          })}
        />
      </div>
    </div>
  )
}

export default withLang(DocUnavailable)
