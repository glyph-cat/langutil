import React from 'react'
import { localize } from 'langutil'
import DocHeaderRow from '../../components/doc-header-row'

const HeaderRow = (() => {
  return <DocHeaderRow data={[
    localize('RETURNS'),
    localize('TYPE'),
  ]} />
})

export default HeaderRow
