import React from 'react'
import { Code, Table, TBody, Tr, Td } from '~components/document'
import HeaderRow from './header-row'

function ReturnType({ desc, type }) {
  return (
    <Table>
      <HeaderRow />
      <TBody>
        <Tr>
          <Td>{desc}</Td>
          <Td><Code>{type}</Code></Td>
        </Tr>
      </TBody>
    </Table>
  )
}

export default ReturnType
