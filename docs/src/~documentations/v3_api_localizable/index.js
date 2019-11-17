import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { withProps } from '~modules'
import CodeTitle from '~components/code-title'
import { Body, Code } from '~components/document'
import ParamList from '~components/param-list'
import ReturnType from '~components/return-type'
import DeprecationWarning from '~components/deprecation-warning'
import { VALUES, STRINGS } from '~constants'

export default withLang(() => {

  const params = {

    // dict: {
    //   type: 'object',
    //   desc: localize('API_PARAM_DICT'),
    // },

    keyword: {
      type: 'string',
      desc: localize('API_PARAM_KEYWORD_LOCZ'),
    },
    paramArray: {
      type: 'Array',
      desc: localize('API_PARAM_PARAMARRAY_LOCZ'),
      optional: true,
    },
    casing: {
      oneOf: ['lowerCase', 'localeLowerCase', 'localeUpperCase', 'sentenceCase', 'titleCase', 'upperCase'],
      desc: localize('API_PARAM_CASING'),
      optional: true,
    },
    transform: {
      type: 'Function',
      desc: localize('API_PARAM_TRANSFORM'),
      optional: true,
    },
    renderAs: {
      type: 'any',
      desc: localize({
        keyword: 'API_PARAM_RENDER_AS_LOCZ',
        transform: withProps({
          span: <Code>{'<span />'}</Code>,
          renderAsVal: <Code>renderAs='value'</Code>
        })
      }),
      optional: true,
    },
    allowEmpty: {
      type: 'boolean',
      desc: localize('API_PARAM_ALLOW_EMPTY'),
      optional: true
    }
  }

  return (
    <>
      <CodeTitle name='Localizable' rType='any' isNotFunction />
      <DeprecationWarning
        // sinceVersion=''
        removeDate={VALUES.v240DeprecatedRemovalDate}
        message={localize({
          keyword: 'DEPRECATED_MSG_LOCALIZABLE',
          transform: withProps({
            renderAs: <Code>renderAs</Code>,
            locz: <Code>{'<Localizable />'}</Code>,
            loc: <Code>localize()</Code>,
            withL: <Code>withLang()</Code>
          })
        })}
      />
      <Body children={localize('API_DESC_LOCALIZABLE')} />
      <ParamList data={params} />
      <ReturnType desc={STRINGS.notAvailableDash} type='React.ReactElement' />
    </>
  )

})
