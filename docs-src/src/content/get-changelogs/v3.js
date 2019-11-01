import React from 'react'
import { Code } from '../../components/document'

export default () => ({
  title: 'v3',
  data: [
    {
      title: '3.0.1',
      data: [
        <>Fixed incorrect function name for <Code>AUTO_DETECT</Code> in Native Additions.</>,
        <>Fixed issue where escaped placeholders do not level down if no param array or objects are provided (<Code>'%%p'</Code> → <Code>'%p'</Code> and <Code>'{'{::key}'}'</Code> → <Code>'{'{:key}'}'</Code>).</>,
        'When applying casings, ALLCAPPED words and Names will be preserved.',
        'Complete removal of deprecated APIs set to be in March 2020.',
        'Minor code optimizations.',
      ]
    },
    {
      title: '3.0.0',
      data: [
        <>Localizing function is now simplified to only one function: <Code>localize()</Code></>,
        <>New <Code>withLang()</Code> higher-order component in favor of <Code>{'<Localizable />'}</Code>.</>,
        <>New <Code>AUTO_DETECT</Code> implementation.</>,
        'Dictionary inspection now do not happen by default in favor of performance.',
        'Structure your dictionary by keywords or language in the shape of an object, langutil will automatically determine which method you\'re using.',
        <>New <Code>setDictionary()</Code> function in case you want to lazy load your localizations.</>,
      ]
    }
  ]
})
