import React, { createElement, Fragment } from 'react'
import { localize } from 'langutil'
import { Code } from '~components/document'
import { withProps } from '~modules'

export default () => ({
  title: 'v1',
  data: [
    {
      title: '1.1.4',
      data: [
        localize('CHANGELOG_1_1_4_S01')
      ]
    },
    {
      title: '1.1.3',
      data: [
        localize('CHANGELOG_1_1_3_S01')
      ]
    },
    {
      title: '1.1.2',
      data: [
        localize('CHANGELOG_1_1_2_S01')
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
          keyword: 'CHANGELOG_1_1_0_S01',
          transform: withProps({
            showL: <Code>showLogs()</Code>,
            lHide: <Code>logs.hide()</Code>,
            lShow: <Code>logs.show()</Code>
          })
        }),
        localize({
          keyword: 'CHANGELOG_1_1_0_S02',
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
          keyword: 'CHANGELOG_1_0_3_S01',
          transform: withProps({
            q: <Code>'%q'</Code>,
            p: <Code>'%p'</Code>,
            p2: <Code>'%%p'</Code>,
          })
        }),
        localize('CHANGELOG_1_0_3_S02'),
        localize({
          keyword: 'CHANGELOG_1_0_3_S03',
          transform: withProps({ init: <Code>init()</Code>, setL: <Code>setLanguage()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_1_0_3_S03',
          transform: withProps({ c: <Code>'chinese'</Code> })
        }),
        localize('CHANGELOG_1_0_3_S05'),
        localize({
          keyword: 'CHANGELOG_1_0_3_S06',
          transform: withProps({ hL: <Code>hideLogs()</Code> })
        })
      ]
    },
    {
      title: '1.0.2',
      data: [
        localize('CHANGELOG_1_0_2_S01'),
        localize('CHANGELOG_1_0_2_S02'),
      ]
    },
    {
      title: '1.0.1',
      data: [
        localize({
          keyword: 'CHANGELOG_1_0_1_S01',
          transform: withProps({ hide: <Code>hideLogs()</Code> })
        })
      ]
    },
    {
      title: '1.0.0',
      data: [
        localize('CHANGELOG_1_0_0_S01'),
      ]
    }
  ]
})
