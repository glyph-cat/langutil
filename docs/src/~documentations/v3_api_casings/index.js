import React from 'react'
import { localize, appendDictionary } from 'langutil'
import { useLang } from 'langutil/react-additions'
import CodeTitle from '~components/code-title'
import CasingExamples from '~components/casing-examples'
import CodeSamples from '~code-samples'
import { Body, CodeLink } from '~components/document'
import localizations from './localizations'
import { PATHS, DOCPATHS } from '~constants'
import { withProps } from '~modules'

export const CASING_PRESETS = [
  'lowerCase',
  'localeLowerCase',
  'localeUpperCase',
  'sentenceCase',
  'titleCase',
  'upperCase',
  'camelCase',
  'pascalCase',
  'kebabCase',
  'snakeCase',
  'macroCase',
]

export default function () {
  useLang()
  appendDictionary(localizations, 'api-casings')
  return (
    <>
      <CodeTitle name='Casings' isNotFunction />
      <Body children={localize({
        keyword: 'API_DESC_CASINGS',
        transform: withProps({
          l: <CodeLink
            to={`${PATHS.docs}/${DOCPATHS.v3.api.localize}`}
            children='localize()'
          />
        })
      })} />
      <CodeSamples.ApiCasings />
      <CasingExamples />
    </>
  )
}
