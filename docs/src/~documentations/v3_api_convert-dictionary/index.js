import React from 'react'
import { localize, appendDictionary } from 'langutil'
import { useLang } from 'langutil/react-additions'
import { Body, CodeLink } from '~components/document'
import CodeTitle from '~components/code-title'
import CodeSamples from '~code-samples'
import { withProps } from '~modules'
import { PATHS, DOCPATHS } from '~constants'
import localizations from './localizations'

export default function () {
  useLang()
  appendDictionary(localizations, 'api-convert-dict')
  return (
    <>

      <CodeTitle name='convertDictionary' />

      {/* <Body children={localize('')} /> */}

      {/* <CodeSamples.ApiAutoDetect /> */}

    </>
  )
}
