import React from 'react'
import { localize } from 'langutil'
import { H1, Body, CodeLink, SectionBreak } from '~components/document'
import { DOCPATHS, PATHS } from '~constants'
import { withProps } from '~modules'
import CodeSamples from '~code-samples'

export default () => (
  <>

    <H1 id='initializing' children={localize('INITIALIZING')} />

    <Body children={localize('DOC_BODY_LANGUTIL_NEEDS_TO_BE_INIT')} />
    <Body children={localize('DOC_BODY_CODE_BELOW_SHOWS_SIMPLE_EXAMPLE_COLON')} />
    <CodeSamples.ApiInit />
    <Body children={localize({
      keyword: 'DOC_BODY_ADDITIONALLY_USE_CAN_USE_AUTO_DETECT',
      transform: withProps({
        autoDetect: <CodeLink
          to={`${PATHS.docs}/${DOCPATHS.v3.api.autoDetect}`}
          children='AUTO_DETECT'
        />
      })
    })} />

    <SectionBreak />

    <H1 id='usage' children={localize('USAGE')} />
    <Body children={
      localize({
        keyword: 'DOC_BODY_USE_LOC_TO_TRANSLATE',
        transform: withProps({
          loc: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.localize}`}
            children='localize()'
          />
        }),
      })
    } />
    <CodeSamples.Usage />

    <SectionBreak />

    <H1 id='switching-languages' children={localize('SWITCHING_LANGUAGES')} />
    <Body children={localize({
      keyword: 'DOC_BODY_USE_SETLANG_TO_SWITCH_LANG',
      transform: withProps({
        setL: <CodeLink
          to={`${PATHS.docs}/${DOCPATHS.v3.api.setLanguage}`}
          children='setLanguage()'
        />
      }),
    })} />
    <CodeSamples.SwitchingLanguages />

  </>
)
