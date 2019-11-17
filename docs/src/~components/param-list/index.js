import React from 'react'
import PropTypes from 'prop-types'
import { Code, Table, TBody, Tr, Td } from '~components/document'
import HeaderRow from './header-row'
import OneOf from './one-of'

function ParamList({ data = {}, overrideVarName }) {
  let trArray = []
  const dataIndex = Object.keys(data)

  for (let i = 0; i < dataIndex.length; i++) {
    const { type, oneOf, desc, optional, defaultValue } = data[dataIndex[i]]
    const isOptional = optional === true || typeof defaultValue !== 'undefined'
    trArray.push(
      <Tr key={i}>
        <Td>
          <Code>{dataIndex[i] + (isOptional ? '?' : '')}</Code>
        </Td>
        {oneOf ?
          <Td>
            <OneOf values={oneOf} />
          </Td>
          :
          (Array.isArray(type) ?
            <Td children={type.join(', ')} />
            :
            <Td children={type} />
          )
        }
        <Td children={desc} />
        {/* <Td children={defaultValue} /> */}
      </Tr>
    )
  }

  return (
    <Table>
      <HeaderRow overrideVarName={overrideVarName} />
      <TBody children={trArray} />
    </Table>
  )
}

ParamList.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    oneOf: PropTypes.arrayOf(PropTypes.string.isRequired),
    optional: PropTypes.bool,
    defaultValue: PropTypes.any,
  }).isRequired,
  overrideVarName: PropTypes.string,
}

export default ParamList
