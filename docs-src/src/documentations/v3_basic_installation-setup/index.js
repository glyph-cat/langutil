import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { H1, Body, SectionBreak } from '../../components/document'
import CodeSamples from '../../code-samples'

export default withLang(() => (
  <>

    <H1 children={localize('INSTALLATION')} />
    <Body children={localize('DOC_BODY_IN_YOUR_DIRECTORY')} />
    <CodeSamples.InstallUsingNpm />
    <CodeSamples.InstallUsingYarn />

    <SectionBreak />

    <H1 children={localize('SETTING_UP')} />
    <Body children={localize('DOC_BODY_SETTING_UP_DESC')} />
    <Body children={localize('DOC_BODY_SETTING_UP_STRUCT_SUGGESTION')} />
    <CodeSamples.FolderStructure />

    <br />
    <Body children={localize('DOC_BODY_THEN_ADD_SOME_LOC')} />
    <Body children={localize('DOC_BODY_NOTE_DICT_LANG_KEYS_FORMAT')} />
    <CodeSamples.DictionaryPrimaryExample />
    <CodeSamples.DictionarySecondaryExample />

    <br />
    <Body children={localize('DOC_BODY_AS_YOU_BUILD_YOUR_PROJ')} />
    <CodeSamples.DictionaryIndexExample />

  </>
))
