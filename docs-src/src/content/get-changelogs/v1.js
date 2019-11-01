import React, { createElement, Fragment } from 'react'
import { localize } from 'langutil'
import { Code } from '../../components/document'
import { withProps } from '../../modules'

export default () => ({
  title: 'v1',
  data: [
    {
      title: '1.1.4',
      data: [
        localize('CHANGELOG_MINOR_PERF_FIXES')
      ]
    },
    {
      title: '1.1.3',
      data: [
        localize('CHANGELOG_FIXED_BUG_KEYWORD_REC_AS_INVALID')
      ]
    },
    {
      title: '1.1.2',
      data: [
        localize('CHANGELOG_PERF_OPT_FOR_PROD_MODE')
      ]
    },
    {
      title: '1.1.1',
      data: [
        localize('CHANGELOG_ADD_QUICKFIX_TO_DOC')
      ]
    },
    {
      title: '1.1.0',
      data: [
        localize({
          keyword: 'CHANGELOG_SHOWLOG_WILL_BE_REPLACED_BY',
          transform: withProps({
            showL: <Code>showLogs()</Code>,
            lHide: <Code>logs.hide()</Code>,
            lShow: <Code>logs.show()</Code>
          })
        }),
        localize({
          keyword: 'CHANGELOG_ADDED_84_NEW_LANG',
          transform: withProps({
            langs: createElement(() => {
              const list = ['akan', 'avestan', 'aymara', 'bihari', 'bislama', 'breton', 'burmese', 'bulgarian_old', 'chamorro', 'chechen', 'chuvash', 'cornish', 'cree', 'divehi', 'dzongka', 'ewe', 'faroese', 'fijian', 'fula', 'gaelic_scot', 'gaelic_manx', 'frisian_western', 'greenlandic', 'guarani', 'herero', 'hirimotu', 'ido', 'interlingua', 'interlingue', 'inuktitut', 'inupiak', 'kanuri', 'kashmiri', 'kikuyu', 'kinyarwanda', 'kirundi', 'komi', 'kongo', 'kwanyama', 'limburger', 'lingala', 'lugakatanga', 'luganda', 'manx', 'marshallese', 'moldavian', 'nauru', 'navajo', 'ndonga', 'ndebele_northern', 'norwegian_bokmal', 'norwegian_nynorsk', 'nuosu', 'occitan', 'ojibwe', 'oriya', 'oromo', 'ossetian', 'pali', 'quechua', 'romansh', 'sami', 'sango', 'sanskrit', 'serbian_croatian', 'setswana', 'siswati', 'southern_ndebele', 'swati', 'tagalog', 'tahitian', 'tatar', 'tibetan', 'tigrinya', 'tonga', 'tsonga', 'turkmen', 'twi', 'uyghur', 'venda', 'volapuk', 'wallon', 'wolof', 'zhuang']
              const toRender = list.map((l, i) => {
                return <Fragment key={i}><Code children={`'${l}'`} />{i < list.length - 1 ? ', ' : null}</Fragment>
              })
              return toRender
            })
          })
        })
      ]
    },
    {
      title: '1.0.3',
      data: [
        localize({
          keyword: 'CHANGELOG_FIXED_INCORRECT_ESCAPER_SWAP',
          transform: withProps({
            q: <Code>'%q'</Code>,
            p: <Code>'%p'</Code>,
            p2: <Code>'%%p'</Code>,
          })
        }),
        localize('CHANGELOG_ADAPTED_SYNTAX_FOR_COMMONJS'),
        localize({
          keyword: 'CHANGELOG_ADDED_AUTO_SUGGESTIONS',
          transform: withProps({ init: <Code>init()</Code>, setL: <Code>setLanguage()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_ADDED_CHINESE_CODE',
          transform: withProps({ c: <Code>'chinese'</Code> })
        }),
        localize('CHANGELOG_EXAMPLES_REMOVED_FROM_DOC'),
        localize({
          keyword: 'CHANGELOG_HIDELOGS_WILL_BE_DEPRECATED',
          transform: withProps({ hL: <Code>hideLogs()</Code> })
        })
      ]
    },
    {
      title: '1.0.2',
      data: [
        localize('CHANGELOG_ADD_UPDATE_HISTORY_TO_README'),
        localize('CHANGELOG_LANG_TABLE_MADE_COMPACT'),
      ]
    },
    {
      title: '1.0.1',
      data: [
        localize({
          keyword: 'CHANGELOG_ADDED_HIDELOGS',
          transform: withProps({ hide: <Code>hideLogs()</Code> })
        })
      ]
    },
    {
      title: '1.0.0',
      data: [
        localize('CHANGELOG_CREATION_OF_LANGUTIL'),
      ]
    }
  ]
})
