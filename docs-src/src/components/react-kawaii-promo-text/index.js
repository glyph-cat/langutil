import React from 'react'
import { localize } from 'langutil'
import { Body } from '../../components/document'
import { asProps } from '../../modules'
import { STRINGS } from '../../constants'
import './index.css'

function ReactKawaiiPromoText() {
  return (
    <Body
      className='react-kawaii-promo-text'
      children={localize({
        keyword: 'REACT_KAWAII_PROMO_TEXT',
        transform: asProps({
          link: (
            <a
              href={STRINGS.reactKawaiiHomePage}
              target='_blank' rel='noopener noreferrer'
              children='React Kawaii'
            />
          )
        })
      })}
    />
  )
}

export default ReactKawaiiPromoText
