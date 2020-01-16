import React from 'react'
import { localize } from 'langutil'
import { Code } from '~components/document'
import { EXT_LINKS } from '~constants'
import { withProps } from '~modules'

export default () => ({
  title: 'v2',
  data: [
    {
      title: '2.4.0',
      data: [
        localize({
          keyword: 'CHANGELOG_2_4_0_S01',
          transform: withProps({
            locz: <Code>{'<Localizable />'}</Code>,
            setL: <Code>setLanguage()</Code>,
          })
        }),
        localize({
          keyword: 'CHANGELOG_2_4_0_S02',
          transform: withProps({
            aEty: <Code>allowEmpty</Code>
          })
        }),
        localize('CHANGELOG_2_4_0_S03'),
      ]
    },
    {
      title: '2.3.3',
      data: [
        localize('CHANGELOG_2_3_3_S01')
      ]
    },
    {
      title: '2.3.2',
      data: [
        localize('CHANGELOG_2_3_2_S01'),
        localize({
          keyword: 'CHANGELOG_2_3_2_S02',
          transform: withProps({ r: <Code>renderAs</Code> })
        }),
      ]
    },
    {
      title: '2.3.1',
      data: [
        localize('CHANGELOG_2_3_1_S01')
      ]
    },
    {
      title: '2.3.0',
      data: [
        localize('CHANGELOG_2_3_0_S01'),
        localize({
          keyword: 'CHANGELOG_2_3_0_S02',
          transform: withProps({ na: <Code>'langutil/native-additions'</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_2_3_0_S03',
          transform: withProps({
            repo: <a href={EXT_LINKS.dictionaryTemplateLink} children='repo' target='_blank' rel='noopener noreferrer' />
          })
        }),
        localize({
          keyword: 'CHANGELOG_2_3_0_S04',
          transform: withProps({ locz: <Code>{'<Localizable />'}</Code> })
        })
      ]
    },
    {
      title: '2.2.4',
      data: [
        localize('CHANGELOG_2_2_4_S01'),
        localize({
          keyword: 'CHANGELOG_2_2_4_S02',
          transform: withProps({ rn: <Code>'react-native'</Code> })
        })
      ]
    },
    {
      title: '2.2.3',
      data: [
        localize('CHANGELOG_2_2_3_S01')
      ]
    },
    {
      title: '2.2.2',
      data: [
        localize('CHANGELOG_2_2_2_S01')
      ]
    },
    {
      title: '2.2.1',
      data: [
        localize('CHANGELOG_2_2_1_S01')
      ]
    },
    {
      title: '2.2.0',
      data: [
        localize('CHANGELOG_2_2_0_S01'),
        localize('CHANGELOG_2_2_0_S02'),
        localize({
          keyword: 'CHANGELOG_2_2_0_S03',
          transform: withProps({ f: <Code>logs.focus()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_2_2_0_S04',
          transform: withProps({ a: <Code>isAuto()</Code> })
        }),
      ]
    },
    {
      title: '2.1.3',
      data: [
        localize({
          keyword: 'CHANGELOG_2_1_3_S01',
          transform: withProps({
            cg: <Code>casing</Code>,
            tr: <Code>transform</Code>,
            lw: <Code>localizeWith()</Code>
          })
        }),
        localize('CHANGELOG_2_1_3_S02'),
        localize('CHANGELOG_2_1_3_S03'),
        localize('CHANGELOG_2_1_3_S04'),
      ]
    },
    {
      title: '2.1.2',
      data: [
        localize('CHANGELOG_2_1_2_S01')
      ]
    },
    {
      title: '2.1.1',
      data: [
        localize('CHANGELOG_ADD_QUICKFIX_TO_DOC'),
        localize({
          keyword: 'CHANGELOG_2_1_1_S02',
          transform: withProps({
            sc: <Code>'sentenceCase'</Code>,
            cg: <Code>casing</Code>,
            lw: <Code>localizeWith()</Code>
          })
        })
      ]
    },
    {
      title: '2.1.0',
      data: [
        localize({
          keyword: 'CHANGELOG_2_1_0_S01',
          transform: withProps({ lw: <Code>localizeWith()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_2_1_0_S02',
          transform: withProps({ gdl: <Code>getDefinedLanguages()</Code> })
        }),
        localize('CHANGELOG_2_1_0_S03'),
        localize('CHANGELOG_2_1_0_S04'),
      ]
    },
    {
      title: '2.0.0',
      data: [
        localize('CHANGELOG_2_0_0_S01'),
        localize({
          keyword: 'CHANGELOG_2_0_0_S02',
          transform: withProps({ ck: <Code>createKey()</Code> })
        }),
        localize('CHANGELOG_2_0_0_S03'),
        localize('CHANGELOG_2_0_0_S04'),
      ]
    }
  ]
})
