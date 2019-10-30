import React from 'react'
import { Code, Table, THead, Th, TBody, Tr, Td } from '../../components/document'
import { localize } from 'langutil'

function ParamList({ data = {} }) {
  let trArray = []
  const dataIndex = Object.keys(data)

  for (let i = 0; i < dataIndex.length; i++) {
    const { type, desc, optional, defaultValue } = data[dataIndex[i]]
    const isOptional = optional === true || typeof defaultValue !== 'undefined'
    trArray.push(
      <Tr key={i}>
        <Td>
          <Code>{dataIndex[i] + (isOptional ? '?' : '')}</Code>
        </Td>
        <Td children={type} />
        <Td children={desc} />
        <Td children={defaultValue} />
      </Tr>
    )
  }

  return (
    <Table>
      <HeaderRow />
      <TBody children={trArray} />
    </Table>
  )
}

const HeaderRow = () => (
  <THead>
    <Tr>
      <Th children={localize('PARAMETER')} />
      <Th children={localize('TYPE')} />
      <Th children={localize('DESCRIPTION')} />
      <Th children={localize('DEFAULT_VALUE')} />
    </Tr>
  </THead>
)

export default ParamList
