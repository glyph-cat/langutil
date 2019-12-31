import React from 'react'
import { localize } from 'langutil'
import OneOf from '~components/one-of'
import { Code } from '~components/document'
import useTheme from '~hooks/useTheme'
import './index.css'

function ParamStack({ data = {}, overrideVarName = localize('PARAMETERS') }) {
  let stackArray = []
  const dataIndex = Object.keys(data)
  const classNameSharedPadding = 'param-stack-shared-padding'
  const { palette: { misc } } = useTheme()

  for (let i = 0; i < dataIndex.length; i++) {
    const { type, oneOf, desc, optional, defaultValue } = data[dataIndex[i]]
    const isOptional = optional === true || typeof defaultValue !== 'undefined'
    stackArray.push(
      <div
        key={i}
        className={['param-stack-item-container', classNameSharedPadding].join(' ')}
        style={{
          backgroundColor: i % 2 === 0 ? `${misc.appFg}11` : '',
          paddingTop: '0.5em',
          paddingBottom: '0.5em',
        }}
      >
        <div className='param-stack-item-nametype-container'>
          <div
            className='param-stack-item-name'
            children={<Code children={dataIndex[i] + (isOptional ? '?' : '')} />}
          />
          <div className='param-stack-item-type'>
            {oneOf ?
              <OneOf values={oneOf} />
              :
              `(${Array.isArray(type) ? type.join(', ') : type})`
            }
          </div>
        </div>
        <div
          className=''
          children={desc}
        />
      </div>
    )
  }

  return (
    <div
      className='param-stack-container'
      style={{
        backgroundColor: misc.appBg,
        border: `solid 1px ${misc.appFg}22`,
        boxShadow: `0 3px 5px 0 ${misc.shadowColor}88`,
      }}
    >
      <div
        className={['param-stack-title', classNameSharedPadding].join(' ')}
        children={overrideVarName}
      />
      {stackArray}
    </div>
  )
}

export default ParamStack
