import React from 'react'
import { localize } from 'langutil'
import DocHeaderRow from '../../components/doc-header-row'

const HeaderRow = (() => {
  return <DocHeaderRow data={[
    localize('PARAMETER'),
    localize('TYPE'),
    localize('DESCRIPTION'),
    // localize('DEFAULT_VALUE')
  ]} />
})

export default HeaderRow
