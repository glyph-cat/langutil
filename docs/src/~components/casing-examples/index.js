import React from 'react'
import { Casings, localize } from 'langutil'
import { Code, Table, THead, Th, TBody, Tr, Td } from '~components/document'
import { CASING_PRESETS } from '~documentations/v3_api_casings'

function CasingExamples() {
  const sample = 'hello world'
  let toRender = []
  for (let i = 0; i < CASING_PRESETS.length; i++) {
    toRender.push(
      <Tr key={i}>
        <Td><Code>'{CASING_PRESETS[i]}'</Code></Td>
        <Td>{Casings[CASING_PRESETS[i]](sample)}</Td>
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
          <Td children={sample} />
        </Tr>
        {toRender}
      </TBody>
    </Table>
  )
}

export default CasingExamples
