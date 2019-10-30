import React, { createElement, Fragment } from 'react'
import { localize } from 'langutil'
import { Code } from '../../components/document'
import { asProps } from '../../modules'
import { STRINGS } from '../../constants'

function getChangelogs() {
  return [
    {
      title: 'v3',
      data: [
        // {
        //   title: '3.0.1',
        //   data: [
        //     ''
        //   ]
        // },
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
    },
    {
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
    },
    {
      title: 'v1',
      data: [
        {
          title: '1.1.4',
          data: [
            'Minor performance fixes.'
          ]
        },
        {
          title: '1.1.3',
          data: [
            'Fixed a bug where certain valid keywords are recognized as invalid.'
          ]
        },
        {
          title: '1.1.2',
          data: [
            'Performance optimization for production mode.'
          ]
        },
        {
          title: '1.1.1',
          data: [
            'Added some quick fixes to the documentation.'
          ]
        },
        {
          title: '1.1.0',
          data: [
            <><Code>showLogs()</Code> (still usable) will be replaced by <Code>logs.hide()</Code> and <Code>logs.show()</Code>.</>,
            <>Added 84 new languages to auto detection algorithm: {createElement(() => {
              const list = ['akan', 'avestan', 'aymara', 'bihari', 'bislama', 'breton', 'burmese', 'bulgarian_old', 'chamorro', 'chechen', 'chuvash', 'cornish', 'cree', 'divehi', 'dzongka', 'ewe', 'faroese', 'fijian', 'fula', 'gaelic_scot', 'gaelic_manx', 'frisian_western', 'greenlandic', 'guarani', 'herero', 'hirimotu', 'ido', 'interlingua', 'interlingue', 'inuktitut', 'inupiak', 'kanuri', 'kashmiri', 'kikuyu', 'kinyarwanda', 'kirundi', 'komi', 'kongo', 'kwanyama', 'limburger', 'lingala', 'lugakatanga', 'luganda', 'manx', 'marshallese', 'moldavian', 'nauru', 'navajo', 'ndonga', 'ndebele_northern', 'norwegian_bokmal', 'norwegian_nynorsk', 'nuosu', 'occitan', 'ojibwe', 'oriya', 'oromo', 'ossetian', 'pali', 'quechua', 'romansh', 'sami', 'sango', 'sanskrit', 'serbian_croatian', 'setswana', 'siswati', 'southern_ndebele', 'swati', 'tagalog', 'tahitian', 'tatar', 'tibetan', 'tigrinya', 'tonga', 'tsonga', 'turkmen', 'twi', 'uyghur', 'venda', 'volapuk', 'wallon', 'wolof', 'zhuang']
              const toRender = list.map((l, i) => {
                return <Fragment key={i}><Code children={`'${l}'`} />{i < list.length - 1 ? ', ' : null}</Fragment>
              })
              return toRender
            })}.</>
          ]
        },
        {
          title: '1.0.3',
          data: [
            <>Fixed the issue where the <Code>'%q'</Code>s in localization will be replaced with <Code>'%p'</Code>s. Previously, the algorithm temporarily swapped <Code>'%%p'</Code> with <Code>'%q'</Code> to allow escaping <Code>'%p'</Code>.</>,
            'Adapted syntax for CommonJS.',
            <>Added auto suggestions from the Language List to <Code>init()</Code> and <Code>setLanguage()</Code>.</>,
            <>Added the <Code>'chinese'</Code> option to the Language List (not simplified ot traditional specific).</>,
            'Examples have been removed from inline documentation as more detailed ones are already available in this readme file.',
            <><Code>hideLogs()</Code> will be deprecated in future versions in favor of a more flexible method.</>
          ]
        },
        {
          title: '1.0.2',
          data: [
            'Added Update History to Readme.',
            'The Language List table has been made more compact. Native names of the languages have been removed since a few are not able to displayed properly on most devices unless additional fonts are installed.'
          ]
        },
        {
          title: '1.0.1',
          data: [
            localize({
              keyword: 'CHANGELOG_ADDED_HIDELOGS',
              transform: asProps({ hide: <Code>hideLogs()</Code> })
            })
          ]
        },
        {
          title: '1.0.0',
          data: [
            localize('CHANGELOG_CREATION_OF_LANGUTIL'),
          ]
        }
      ]
    },
  ]
}

export default getChangelogs
