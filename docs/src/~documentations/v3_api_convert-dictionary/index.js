import React from 'react'
import { localize, appendDictionary } from 'langutil'
import { useLang } from 'langutil/react-additions'
import { Body, Code, CodeLink } from '~components/document'
import CodeTitle from '~components/code-title'
import CodeSamples from '~code-samples'
import { withProps } from '~modules'
import DocInfoBox from '~components/doc-infobox'
import ReturnType from '~components/return-type'
import localizations from './localizations'
import ParamList from '~fragments/param-list'

export default function () {
  useLang()
  appendDictionary(localizations, 'api-convert-dict')
  const params = {
    dictionary: {
      desc: localize('API_PARAM_DICT'),
      type: 'Array<object>'
    }
  }
  return (
    <>
      <CodeTitle name='convertDictionary' params={params} />

      <DocInfoBox message={localize({
        keyword: 'THIS_ITEM_IS_AVAILABLE_UNDER_PATH',
        transform: withProps({
          path: <Code>'langutil/dev-additions'</Code>
        })
      })} />

      <Body children={localize({
        keyword: 'API_DESC_CONVERT_DICTIONARY',
        transform: withProps({
          jsy: <CodeLink
            href='https://www.w3schools.com/js/js_json_stringify.asp'
            children='JSON.stringify()'
          />
        })
      })} />

      <ParamList data={params} />
      <ReturnType desc={localize('API_RTYPE_CONVERTED_DICT')} type='object' />
      <CodeSamples.ApiConvertDictionary />
    </>
  )
}
