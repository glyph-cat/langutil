import React from 'react'
import { H1 } from '../../components/document'
import './index.css'

function CodeTitle({ name, params }) {
  let paramList = []
  const pIndex = Object.keys(params)
  for (let i = 0; i < pIndex.length; i++) {
    const { optional, defaultValue } = params[pIndex[i]]
    const isOptional = optional === true || typeof defaultValue !== 'undefined'
    paramList.push(`${pIndex[i]}${isOptional ? '?' : ''}`)
  }
  const text = `${name}(${paramList.join(', ')})`
  return <H1 className='code-title' children={text} />
}

export default CodeTitle
