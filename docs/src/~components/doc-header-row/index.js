import React from 'react'
import { THead, Th, Tr } from '~components/document'

const DocHeaderRow = ({ data }) => {
  let toRender = []
  for (let i = 0; i < data.length; i++) {
    toRender.push(<Th key={i} children={data[i]} />)
  }
  return (
    <THead>
      <Tr children={toRender} />
    </THead>
  )
}

export default DocHeaderRow
