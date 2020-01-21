import React from 'react'
import { localize } from 'langutil'
import { Code, CodeLink } from '~components/document'
import { DOCPATHS, PATHS } from '~constants'
import { withProps } from '~modules'
// Use <Code> for deprecated APIS and <CodeLink> for the rest

export default () => ({
  title: 'v3',
  data: [
    {
      title: '3.2.0',
      data: [
        localize({
          keyword: 'CHANGELOG_3_2_0_S01',
          transform: withProps({
            ia: <CodeLink
              to={`${PATHS.docs}/${DOCPATHS.v3.api.isAuto}`}
              children='isAuto()'
            />
          })
        }),
        localize({
          keyword: 'CHANGELOG_3_2_0_S02',
          transform: withProps({
            ad: <CodeLink
              to={`${PATHS.docs}/${DOCPATHS.v3.api.appendDictionary}`}
              children='appendDictionary()'
            />
          })
        }),
        localize({
          keyword: 'CHANGELOG_3_2_0_S03',
          transform: withProps({
            ggl: <CodeLink
              to={`${PATHS.docs}/${DOCPATHS.v3.api.getGuidedLanguage}`}
              children='getGuidedLanguage()'
            />
          })
        }),
        localize({
          keyword: 'CHANGELOG_3_2_0_S04',
          transform: withProps({
            cc: <Code>'camelCase'</Code>,
            pc: <Code>'PascalCase'</Code>,
            kc: <Code>'kebab-case'</Code>,
            sc: <Code>'snake_case'</Code>,
            mc: <Code>'MACRO_CASE'</Code>
          })
        }),
        localize({
          keyword: 'CHANGELOG_3_2_0_S05',
          transform: withProps({
            cd: <CodeLink
              to={`${PATHS.docs}/${DOCPATHS.v3.api.convertDictionary}`}
              children='convertDictionary()'
            />,
            luda: <Code>'langutil/dev-additions'</Code>,
            ck: <Code>createKey()</Code>
          })
        }),
        localize({
          keyword: 'CHANGELOG_3_2_0_S06',
          transform: withProps({
            wl: <CodeLink
              to={`${PATHS.docs}/${DOCPATHS.v3.api.withLang}`}
              children='withLang()'
            />,
            ir: <Code>innerRef</Code>
          })
        }),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
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
