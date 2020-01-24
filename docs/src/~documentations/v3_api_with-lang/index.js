import React from 'react'
import { localize, appendDictionary } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body, Code, CodeA, SectionBreak } from '~components/document'
import CodeTitle from '~components/code-title'
import ParamList from '~fragments/param-list'
import CodeSamples from '~code-samples'
import { withProps } from '~modules'
import { EXT_LINKS } from '~constants'
import DocInfoBox from '~components/doc-infobox'
import localizations from './localizations'

export function getLangStateInfo() {
  return {
    auto: {
      type: 'boolean',
      desc: localize('LANGSTATE_AUTO'),
    },
    lang: {
      type: 'string',
      desc: localize('LANGSTATE_LANG'),
    }
  }
}

export default withLang(() => {

  appendDictionary(localizations, 'api-with-lang')

  const passProps = getLangStateInfo()
  const params = {
    WrappedComponent: {
      type: 'React.Component',
      desc: localize('API_PARAM_WRAPPED_COMPONENT'),
    },
    options: {
      type: 'object',
      desc: localize('API_PARAM_WL_OPTIONS'),
      optional: true,
    }
  }
  const options = {
    displayName: {
      type: 'string',
      desc: localize('API_PARAM_WL_OPTIONS_DNAME'),
    },
    forwardRef: {
      type: 'boolean',
      desc: localize({
        keyword: 'API_PARAM_WL_OPTIONS_FREF',
        transform: withProps({ t: <Code>true</Code> })
      }),
    }
  }

  return (
    <>
      <CodeTitle name='withLang' params={params} />

      <DocInfoBox message={localize({
        keyword: 'THIS_ITEM_IS_AVAILABLE_UNDER_PATH',
        transform: withProps({
          path: <Code>'langutil/react-additions'</Code>
        })
      })} />

      <Body children={localize('API_DESC_WITH_LANG')} />
      <Body children={localize({
        keyword: 'DOC_BODY_HOIST_NON_REACT_STATICS_REQUIRED',
        transform: withProps({
          h: (<CodeA
            href={EXT_LINKS.hoistNonReactStaticsPage}
            children='hoist-non-react-statics'
          />)
        })
      })} />
      <ParamList data={params} />
      <ParamList data={options} overrideVarName={localize('AVAILABLE_OPTIONS')} />

      <SectionBreak />

      <Body children={localize({
        keyword: 'DOC_BODY_WITH_LANG_ALSO_PASSES_PROPS',
        transform: withProps({ ls: <Code>langState</Code> })
      })} />
      <ParamList data={passProps} overrideVarName={'langState'} />

      <SectionBreak />

      <CodeSamples.ApiWithLang />
    </>
  )

})
