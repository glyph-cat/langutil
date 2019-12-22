import React from 'react'
import { localize } from 'langutil'
import { Code } from '~components/document'
import { withProps } from '~modules'

export default () => ({
  title: 'v3',
  data: [
    {
      title: '3.1.2',
      data: [
        localize('CHANGELOG_FIXED_ISSUE_GROUPED_WARN_LANGMAP')
      ]
    },
    {
      title: '3.1.1',
      data: [
        localize({
          keyword: 'CHANGELOG_NEW_LANGMAP_FN',
          transform: withProps({ m: <Code>langmap</Code> })
        }),
        localize('CHANGELOG_REFINED_AUTO_DETECT_ALGO')
      ]
    },
    {
      title: '3.1.0',
      data: [
        localize('CHANGELOG_ERR_THROWN_UPON_CRITICAL'),
        localize({
          keyword: 'CHANGELOG_WITHLANG_NOW_PASS_LANGSTATE',
          transform: withProps({ wl: <Code>withLang()</Code>, ls: <Code>langState</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_NEW_USELANG_HOOK',
          transform: withProps({ ul: <Code>useLang()</Code>, ls: <Code>langState</Code> })
        }),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
    {
      title: '3.0.2',
      data: [
        localize('CHANGELOG_ADDED_BACK_LEGACY_COMPENSATION'),
        localize('CHANGELOG_WARN_FOR_PARAMOBJ_WILL_BE_SHOWN'),
        localize({
          keyword: 'CHANGELOG_FIXED_INCR_TYPE_REACT_ADD',
          transform: withProps({ add: <Code>react-additions</Code> })
        }),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
    {
      title: '3.0.1',
      data: [
        localize({
          keyword: 'CHANGELOG_FIXED_INCR_FN_NAME_AUTO_DETECT_NATIVE_ADD',
          transform: withProps({ ad: <Code>AUTO_DETECT</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_FIXED_ESC_PHDRS',
          transform: withProps({
            p: <Code>'%p'</Code>, pp: <Code>'%%p'</Code>,
            k: <Code>'{'{:key}'}'</Code>, kk: <Code>'{'{::key}'}'</Code>
          })
        }),
        localize('CHANGELOG_WHEN_APPLY_CASING_ALLCAP_PRESERVED'),
        localize('CHANGELOG_COMPLETE_REMOVAL_DEPRE_SET_MAR2020'),
        localize('CHANGELOG_CODE_OPTIMIZATIONS'),
      ]
    },
    {
      title: '3.0.0',
      data: [
        localize({
          keyword: 'CHANGELOG_LOC_FN_SIMPLIFIED',
          transform: withProps({ loc: <Code>localize()</Code> })
        }),
        localize({
          keyword: 'CHANGELOG_NEW_WITHLANG_HOC',
          transform: withProps({
            wl: <Code>withLang()</Code>,
            locz: <Code>{'<Localizable />'}</Code>
          })
        }),
        localize({
          keyword: 'CHANGELOG_NEW_AUTO_DETECT_IMPLEMENTATION',
          transform: withProps({ ad: <Code>AUTO_DETECT</Code> })
        }),
        localize('CHANGELOG_DICT_INSP_NOT_HAPPEN_DEFAULT'),
        localize('CHANGELOG_STRUCT_DICT_AS_OBJ'),
        localize({
          keyword: 'CHANGELOG_NEW_SET_DICT_FN',
          transform: withProps({ sd: <Code>setDictionary()</Code> })
        }),
      ]
    }
  ]
})
