import React from 'react'
import { localize } from 'langutil'
import { Code } from '~components/document'
import { withProps } from '~modules'

export default () => ({
  title: 'v3',
  data: [
    {
      title: '3.1.3',
      data: [
        localize('CHANGELOG_3_1_3_S01')
      ]
    },
    {
      title: '3.1.2',
      data: [
        localize('CHANGELOG_3_1_2_S01'),
      ]
    },
    {
      title: '3.1.1',
      data: [
        localize({
          keyword: 'CHANGELOG_3_1_1_S01',
          transform: withProps({ m: <Code>langmap</Code> })
        }),
        localize('CHANGELOG_3_1_1_STR_2')
      ]
    },
    {
      title: '3.1.0',
      data: [
        localize('CHANGELOG_3_1_0_S01'),
        localize({
          keyword: 'CHANGELOG_3_1_0_S02',
          transform: withProps({ wl: <Code>withLang()</Code>, ls: <Code>langState</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_3_1_0_S03',
          transform: withProps({ ul: <Code>useLang()</Code>, ls: <Code>langState</Code> })
        }),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
    {
      title: '3.0.2',
      data: [
        localize('CHANGELOG_3_0_2_S01'),
        localize('CHANGELOG_3_0_2_S02'),
        localize({
          keyword: 'CHANGELOG_3_0_2_S03',
          transform: withProps({ add: <Code>react-additions</Code> })
        }),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
    {
      title: '3.0.1',
      data: [
        localize({
          keyword: 'CHANGELOG_3_0_1_S01',
          transform: withProps({ ad: <Code>AUTO_DETECT</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_3_0_1_S02',
          transform: withProps({
            p: <Code>'%p'</Code>, pp: <Code>'%%p'</Code>,
            k: <Code>'{'{:key}'}'</Code>, kk: <Code>'{'{::key}'}'</Code>
          })
        }),
        localize('CHANGELOG_3_0_1_S03'),
        localize('CHANGELOG_3_0_1_S04'),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
    {
      title: '3.0.0',
      data: [
        localize({
          keyword: 'CHANGELOG_3_0_0_S01',
          transform: withProps({ loc: <Code>localize()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_3_0_0_S02',
          transform: withProps({
            wl: <Code>withLang()</Code>,
            locz: <Code>{'<Localizable />'}</Code>
          })
        }),
        localize({
          keyword: 'CHANGELOG_3_0_0_S03',
          transform: withProps({ ad: <Code>AUTO_DETECT</Code> })
        }),
        localize('CHANGELOG_3_0_0_S04'),
        localize('CHANGELOG_3_0_0_S05'),
        localize({
          keyword: 'CHANGELOG_3_0_0_S06',
          transform: withProps({ sd: <Code>setDictionary()</Code> })
        }),
      ]
    }
  ]
})
