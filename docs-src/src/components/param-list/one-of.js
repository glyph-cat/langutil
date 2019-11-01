import React, { Fragment } from 'react'
import { Code } from '../../components/document'
import { localize } from 'langutil'
import { asProps } from '../../modules'

const OneOf = ({ values }) => {
  let toRender = []
  for (let i = 0; i < values.length; i++) {
    toRender.push(<Code key={i} children={`'${values[i]}'`} />)
    if (i < values.length - 1) { toRender.push(<Fragment key={`p${i}`}>, <br /></Fragment>) }
  }
  return localize({
    keyword: 'ONE_OF_PARAMS',
    transform: asProps({ params: toRender })
  })
}

export default OneOf
