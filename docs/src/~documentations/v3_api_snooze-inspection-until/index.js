import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code } from '~components/document'
import CodeTitle from '~components/code-title'
import DeprecationWarning from '~components/deprecation-warning'
import ParamList from '~components/param-list'
import { withProps } from '~modules'
import { VALUES } from '~constants'

export default withLang(() => {

  const params = {
    due: {
      type: 'Date',
      desc: localize('API_PARAM_DUE'),
    },
  }

  return (
    <>

      <CodeTitle name='snoozeInspectionUntil' />
      <DeprecationWarning
        // sinceVersion=''
        removeDate={VALUES.v240DeprecatedRemovalDate}
        message={localize({
          keyword: 'DEPRECATED_MSG_SNOOZE_INSPECTION_UNTIL',
          transform: withProps({ dev: <Code>'dev-additions'</Code> })
        })}
      />
      <Body children={localize('API_DESC_SNOOZE_INSPECTION_UNTIL')} />
      <ParamList data={params}/>
    </>
  )

})
