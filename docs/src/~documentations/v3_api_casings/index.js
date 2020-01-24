import React from 'react'
import { localize, appendDictionary } from 'langutil'
import { useLang } from 'langutil/react-additions'
import CodeTitle from '~components/code-title'
import { Body } from '~components/document'
import localizations from './localizations'

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
      {/* <Body children={localize('API_DESC_CASINGS')} /> */}
    </>
  )
}
