import React from 'react'
import { STRINGS } from '../../constants'
import { Code } from '../../components/document'

export default () => ({
  title: 'v2',
  data: [
    {
      title: '2.4.0',
      data: [
        <><Code>{'<Localizable />'}</Code>  will update itself when <Code>setLanguage()</Code> is called.</>,
        <>New <Code>allowEmpty</Code> parameter to suppress warnings about empty keywords.</>,
        'Snooze dictionary inspection until a given date.',
      ]
    },
    {
      title: '2.3.3',
      data: [
        'Fixed issue where already-warned keywords still show up in group warnings.'
      ]
    },
    {
      title: '2.3.2',
      data: [
        'Grouped warnings for missing localizations.',
        <>You can pass in custom components via the <Code>renderAs</Code> prop in React Native like how it can be done in React.</>
      ]
    },
    {
      title: '2.3.1',
      data: [
        'Hot fix for a problem in TypeScript.'
      ]
    },
    {
      title: '2.3.0',
      data: [
        'Internal optimization for better performance and debugging experience.',
        <>Automatic language detection for React Native is no longer included in the core to avoid conflict with webpack config in some cases. It has been splitted out as a function and can be imported from <Code>'langutil/native-additions'</Code>.</>,
        <>The <a href={STRINGS.dictionaryTemplateLink} children='repo' target='_blank' rel='noopener noreferrer' /> now includes template dictionaries, some of the most commonly used words are readily translated. More translations will be added over time.</>,
        <>
          Additions for React: <ul><li>New <Code>{'<Localizable />'}</Code> component that acts as a wrapper for HTML or React elements.</li></ul>
        </>,
        <>
          Additions for React Native: <ul><li>New <Code>{'<Localizable />'}</Code> component that acts as a wrapper the <Code>{'<Text />'}</Code> tag.</li><li>Language detection for React Native has been splitted out from the core and moved into the additions folder.</li></ul>
        </>,
      ]
    },
    {
      title: '2.2.4',
      data: [
        'Added docs about the Dictionary.',
        <>Changed <Code>'react-native'</Code> from optional dependency to peer dependency.</>
      ]
    },
    {
      title: '2.2.3',
      data: [
        'Fixed a bug with auto detect.'
      ]
    },
    {
      title: '2.2.2',
      data: [
        'Fixed the issue where false warnings about insufficient parameters are shown. For sure!'
      ]
    },
    {
      title: '2.2.1',
      data: [
        'Emergency fix for a bug where auto detect in v2.2.0 fails for React Native apps.'
      ]
    },
    {
      title: '2.2.0',
      data: [
        <>In case the automatically detected language is not supported in the dictionary, langutil look for an alternative language from the dictionary. For example, if your dictionary contains localizations for <Code>'en'</Code>, but the automatically detected language is <Code>'en-us'</Code>, langutil will set the language to <Code>'en'</Code>.</>,
        'Fixed an issue where false warnings about insufficient parameters are shown.',
        <>New <Code>logs.focus()</Code> function allows to you see langutil logs in a specific block of code while hiding the rest, that is, only necessary if the logs were already hidden prior to that block.</>,
        <>New <Code>isAuto()</Code> function to know whether autoDetection is set to true.</>
      ]
    },
    {
      title: '2.1.3',
      data: [
        <>Silenced the unneccessary warning messages when <Code>casing</Code> and <Code>transform</Code> parameters in <Code>localizeWith()</Code> are not defined as they are optional.</>,
        'Auto language detection is now supported in React Native.',
        'Documentations have been updated to reduce package size.',
        'Fixed the bug where langutil will always launch in minified mode by default.'
      ]
    },
    {
      title: '2.1.2',
      data: [
        'Fixed an issue where you may encounter an error with a message like "this.localize is not a function".'
      ]
    },
    {
      title: '2.1.1',
      data: [
        'Fixed some documentation errors.',
        <>Added new option <Code>'sentenceCase'</Code> for the <Code>casing</Code> parameter in <Code>localizeWith()</Code>.</>
      ]
    },
    {
      title: '2.1.0',
      data: [
        <>Added new method <Code>localizeWith()</Code> for more powerful localizing capabilities: Apply <b>casing styles</b> and <b>custom transformations</b> to the localized value! 🦄</>,
        <>Added new method <Code>getDefinedLanguages()</Code> which allows you to access the list of languages defined in the dictionary during runtime.</>,
        'You can now assign anything to your localized value, for instance, you might want to have a different logo image for each language if you have a tagline in your logo.',
        'Fixed a critical bug where there production build fails if logs are shown.'
      ]
    },
    {
      title: '2.0.0',
      data: [
        'You can now define dictionaries by Keywords.',
        <>There is a new <Code>createKey()</Code> method to help you with that.</>,
        'Language list now follows ISO language codes but the old convention that langutil 1.x.x still works.',
        <><Code>index.d.ts</Code> integration.</>,
      ]
    }
  ]
})
