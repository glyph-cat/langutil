import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import useTheme from '~hooks/useTheme'
import './index.css'

function MiniTabber({ data = [], value: currentValue, onChange }) {
  const isCompactWidth = useMediaQuery('(max-width: 800px)')
  const { palette: { misc } } = useTheme()
  let toRender = []
  for (let i = 0; i < data.length; i++) {
    const { text, value } = data[i]
    const selected = value === currentValue
    toRender.push(
      <div
        key={i}
        className='mini-tabber-item'
        children={text}
        onClick={() => { onChange(value) }}
        style={{
          backgroundColor: selected ? misc.appFg : '',
          color: selected ? misc.appBg : '',
          padding: isCompactWidth ? '0.75em 2.5em 0.75em 2.5em' : '0.5em 2em 0.5em 2em',
          fontSize: isCompactWidth ? '1.25em' : '1em',
        }}
      />
    )
    if (i < data.length - 1) {
      toRender.push(
        <div
          key={`b${i}`}
          style={{
            backgroundColor: misc.appFg,
            width: 1,
          }}
        />
      )
    }
  }
  return (
    <div
      className='mini-tabber-container'
      children={toRender}
      style={{
        border: `solid 1px ${misc.appFg}`,
      }}
    />
  )
}

export default MiniTabber
