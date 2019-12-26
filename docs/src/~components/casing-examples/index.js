import React from 'react'
import { localize } from 'langutil'
import { Code, Table, THead, Th, TBody, Tr, Td } from '~components/document'

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
      <Tr key={i}>
        <Td><Code>'{casings[i]}'</Code></Td>
        <Td>{localize({ keyword: 'CASING_EXAMPLE_SENTENCE', casing: casings[i] })}</Td>
      </Tr>
    )
  }
  return (
    <Table>
      <THead>
        <Tr>
          <Th children={localize('CASING')} />
          <Th children={localize('EXAMPLE_SENTENCE')} />
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td children={localize('ORIGINAL_BRACKET')} />
          <Td children={localize('CASING_EXAMPLE_SENTENCE')} />
        </Tr>
        {toRender}
      </TBody>
    </Table>
  )
}

export default CasingExamples
