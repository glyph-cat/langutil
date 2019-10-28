import { localize } from 'langutil'
import { DOCPATHS } from '../../constants'

const localizeTitle = (keyword) => localize({ keyword, casing: 'titleCase' })

const getSections = () => [
  {
    title: localizeTitle('BASICS'),
    data: [
      {
        to: DOCPATHS.v3.installation_setup,
        text: localizeTitle('INSTALLATION_AND_SETUP')
      },
      {
        to: DOCPATHS.v3.basic_usage,
        text: localizeTitle('BASIC_USAGE')
      },
      {
        to: DOCPATHS.v3.insert_parameters,
        text: localizeTitle('INSERT_PARAMETERS')
      },
      {
        to: DOCPATHS.v3.apply_casings,
        text: localizeTitle('APPLY_CASINGS')
      },
      {
        to: DOCPATHS.v3.apply_transformation,
        text: localizeTitle('APPLY_TRANSFORMATION')
      },
    ]
  },
  {
    title: localize('API'),
    data: [
      {
        to: DOCPATHS.v3.init,
        text: 'init'
      },
      {
        to: DOCPATHS.v3.setDictionary,
        text: 'setDictionary'
      },
      {
        to: DOCPATHS.v3.setLanguage,
        text: 'setLanguage'
      },
      {
        to: DOCPATHS.v3.localize,
        text: 'localize'
      },
      {
        to: DOCPATHS.v3.localizeWith,
        text: 'localizeWith'
      },
      {
        to: DOCPATHS.v3.autoDetect,
        text: 'AUTO_DETECT'
      },
    ]
  },
  {
    title: localize('ADVANCED'),
    data: [
      {
        to: DOCPATHS.v3.alternative_syntax,
        text: localizeTitle('ALTERNATIVE_SYNTAX')
      },
      {
        to: DOCPATHS.v3.localizing_jsx,
        text: localize('LOCALIZING_JSX')
      }
    ]
  }
]

export default (getSections)
