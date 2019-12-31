import React from 'react'
import { localize } from 'langutil'
import DocHeaderRow from '~components/doc-header-row'

const HeaderRow = ({ overrideVarName = localize('PARAMETERS') }) => {
  return <DocHeaderRow data={[
    overrideVarName,
    localize('TYPE'),
    localize('DESCRIPTION'),
    // localize('DEFAULT_VALUE')
  ]} />
}

export default HeaderRow
