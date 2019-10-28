import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Code } from '../../components/document'

function CasingExamples() {
  const casings = [
    'localeLowerCase',
    'lowerCase',
    'localeUpperCase',
    'upperCase',
    'sentenceCase',
    'titleCase',
  ]
  let toRender = []
  for (let i = 0; i < casings.length; i++) {
    toRender.push(
      <tr key={i}>
        <td><Code>'{casings[i]}'</Code></td>
        <td>{localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: casings[i] })}</td>
      </tr>
    )
  }
  return (
    <table
      border="1"
      cellPadding={10} cellSpacing={0}
      className='document-body'
      style={{
        border: 'solid 1px #777777',
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#DDDDDD' }}>
          <th>{localize('CASING')}</th>
          <th>{localize('OUTPUT')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{localize('ORIGINAL_BRACKET')}</td>
          <td>{localize('THE_QUICK_BROWN_FOX')}</td>
        </tr>
        {toRender}
      </tbody>
    </table>
  )
}

export default withLang(CasingExamples)
