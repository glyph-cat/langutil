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
          keyword: 'CHANGELOG_LOCZ_WILL_UPDATE_ITSELF',
          transform: withProps({
            locz: <Code>{'<Localizable />'}</Code>,
            setL: <Code>setLanguage()</Code>,
          })
        }),
        localize({
          keyword: 'CHANGELOG_NEW_ALLOW_EMPTY',
          transform: withProps({
            aEty: <Code>allowEmpty</Code>
          })
        }),
        localize('CHANGELOG_SNOOZE_DICT_INSP_TILL_GIVEN_DATE'),
      ]
    },
    {
      title: '2.3.3',
      data: [
        localize('CHANGELOG_FIXED_ISSUE_ALREADY_WARNED_STILL_SHOW_UP')
      ]
    },
    {
      title: '2.3.2',
      data: [
        localize('CHANGELOG_GROUPED_WARNINGS_FOR_MISSING_LOC'),
        localize({
          keyword: 'CHANGELOG_PASS_CUSTOM_COMP_VIA_RENDER_AS',
          transform: withProps({ r: <Code>renderAs</Code> })
        }),
      ]
    },
    {
      title: '2.3.1',
      data: [
        localize('CHANGELOG_HOTFIX_FOR_TS')
      ]
    },
    {
      title: '2.3.0',
      data: [
        localize('CHANGELOG_INTERNAL_OPTIMIZATIONS_PERF_DEBUG_XP'),
        localize({
          keyword: 'CHANGELOG_AUTO_DETECT_SPLITTED',
          transform: withProps({ na: <Code>'langutil/native-additions'</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_THE_REPO_NOW_INCL_TEMPLATE_DICT',
          transform: withProps({
            repo: <a href={EXT_LINKS.dictionaryTemplateLink} children='repo' target='_blank' rel='noopener noreferrer' />
          })
        }),
        localize({
          keyword: 'CHANGELOG_ADDITIONS_FOR_REACT',
          transform: withProps({ locz: <Code>{'<Localizable />'}</Code> })
        })
      ]
    },
    {
      title: '2.2.4',
      data: [
        localize('CHANGELOG_ADDED_DOCS_ABT_DICT'),
        localize({
          keyword: 'CHANGELOG_CHG_RN_DEPENDENCY_TYPE',
          transform: withProps({ rn: <Code>'react-native'</Code> })
        })
      ]
    },
    {
      title: '2.2.3',
      data: [
        localize('CHANGELOG_FIXED_BUG_AUTO_DETECT')
      ]
    },
    {
      title: '2.2.2',
      data: [
        localize('CHANGELOG_FIXED_FALSE_WARNINGS_PARAMS_FOR_SURE')
      ]
    },
    {
      title: '2.2.1',
      data: [
        localize('CHANGELOG_EMERGENCY_FIX_RN_AUTO_DETECT_FAIL')
      ]
    },
    {
      title: '2.2.0',
      data: [
        localize('CHANGELOG_WILL_LOOK_FOR_ALT_LANG_IF_AUTO_UNAVAILABLE'),
        localize('CHANGELOG_FIXED_FALSE_WARNINGS_PARAMS'),
        localize({
          keyword: 'CHANGELOG_NEW_LOGS_FOCUS_FN',
          transform: withProps({ f: <Code>logs.focus()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_NEW_IS_AUTO_FN',
          transform: withProps({ a: <Code>isAuto()</Code> })
        }),
      ]
    },
    {
      title: '2.1.3',
      data: [
        localize({
          keyword: 'CHANGELOG_SILENCED_UNNECESSARY_WARN_IN_LOC_WITH',
          transform: withProps({
            cg: <Code>casing</Code>,
            tr: <Code>transform</Code>,
            lw: <Code>localizeWith()</Code>
          })
        }),
        localize('CHANGELOG_AUTO_DETECT_SUPPORT_RN'),
        localize('CHANGELOG_DOC_UPDATED_REDUCE_SIZE'),
        localize('CHANGELOG_FIXED_ALWAYS_MINIFIED'),
      ]
    },
    {
      title: '2.1.2',
      data: [
        localize('CHANGELOG_FIXED_ISSUE_THIS_LOCALIZE_NOT_FN')
      ]
    },
    {
      title: '2.1.1',
      data: [
        localize('CHANGELOG_ADD_QUICKFIX_TO_DOC'),
        localize({
          keyword: 'CHANGELOG_ADDED_NEW_OPTION_LOC_WITH',
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
          keyword: 'CHANGELOG_NEW_LOC_WITH_FN',
          transform: withProps({ lw: <Code>localizeWith()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_NEW_GET_DEF_LANGS',
          transform: withProps({ gdl: <Code>getDefinedLanguages()</Code> })
        }),
        localize('CHANGELOG_ASSIGN_ANYTHING_TO_LOC_VALUE'),
        localize('CHANGELOG_FIXED_PROD_BUILD_FAILS_IF_LOG_SHOWN'),
      ]
    },
    {
      title: '2.0.0',
      data: [
        localize('CHANGELOG_CAN_DEFINE_DICT_BY_KEYWORDS'),
        localize({
          keyword: 'CHANGELOG_NEW_CREATEKEY_FN',
          transform: withProps({ ck: <Code>createKey()</Code> })
        }),
        localize('CHANGELOG_LIST_FOLLOWS_ISO_CODES'),
        localize('CHANGELOG_SUPPORT_TYPINGS'),
      ]
    }
  ]
})
