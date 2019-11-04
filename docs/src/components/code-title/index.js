import React from 'react'
import { H1 } from '../../components/document'
import { formatDomId } from '../../modules'
import './index.css'

function CodeTitle({ name, params = {}, isNotFunction, ...otherProps }) {
  let paramList = []
  const pIndex = Object.keys(params)
  for (let i = 0; i < pIndex.length; i++) {
    const { optional, defaultValue } = params[pIndex[i]]
    const isOptional = optional === true || typeof defaultValue !== 'undefined'
    paramList.push(`${pIndex[i]}${isOptional ? '?' : ''}`)
  }
  const text = isNotFunction ? name : `${name}(${paramList.join(', ')})`
  return (
    <H1 id={formatDomIdFromName(name)}
      className='code-title-h1 code'
      children={text}
      {...otherProps}
    />
  )
}

export default CodeTitle


function formatDomIdFromName(name) {
  name = splitNameFromCamelCase(name)
  name = name.toLowerCase().replace(/[^a-z]/gi, '-')
  return formatDomId(name)
}

function splitNameFromCamelCase(name) {
  name = name.split('')
  let reachedEnd = false, pointIndex = 0
  while (!reachedEnd) {
    try {
      if (name[pointIndex].match(/[A-Z]/)) {
        name.splice(pointIndex, 0, ' ')
        pointIndex++
      }
      pointIndex++
    } catch (e) {
      if (e instanceof TypeError) {
        reachedEnd = true
      } else {
        // console.log({ e })
      }
    }
  }
  return name.join('')
}
