import React from 'react'
import { localize } from 'langutil'
import { H1, Body, Code, SectionBreak } from '../../components/document'
import { withProps } from '../../modules'
import CodeSamples from '../../code-samples'

export default () => (
  <>

    <H1 children={localize('INITIALIZING')} />

    <Body children={localize('DOC_BODY_LANGUTIL_NEEDS_TO_BE_INIT')} />
    <Body children={localize('DOC_BODY_CODE_BELOW_SHOWS_SIMPLE_EXAMPLE_COLON')} />
    <CodeSamples.ApiInit />
    <Body children={localize({
      keyword: 'DOC_BODY_ADDITIONALLY_USE_CAN_USE_AUTO_DETECT',
      transform: withProps({ autoDetect: <Code>AUTO_DETECT</Code> })
    })} />

    <SectionBreak />

    <H1 children={localize('USAGE')} />
    <Body children={
      localize({
        keyword: 'DOC_BODY_USE_LOC_TO_TRANSLATE',
        transform: withProps({ loc: <Code>localize</Code> }),
      })
    } />
    <CodeSamples.Usage />

    <SectionBreak />

    <H1 children={localize('SWITCHING_LANGUAGES')} />
    <Body children={localize({
      keyword: 'DOC_BODY_USE_SETLANG_TO_SWITCH_LANG',
      transform: withProps({ setL: <Code>setLanguage</Code> }),
    })} />
    <CodeSamples.SwitchingLanguages />

  </>
)
