import { localize } from 'langutil'
import { DOCPATHS } from '~constants'

const localizeTitle = (keyword) => localize({ keyword, casing: 'titleCase' })

const getDocs = () => ({
  v3: [
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
          to: DOCPATHS.v3.getCurrentLanguage,
          text: 'getCurrentLanguage'
        },
        {
          to: DOCPATHS.v3.getDefinedLanguages,
          text: 'getDefinedLanguages'
        },
        {
          to: DOCPATHS.v3.autoDetect,
          text: 'AUTO_DETECT'
        },
        {
          to: DOCPATHS.v3.isAuto,
          text: 'isAuto'
        },
        {
          to: DOCPATHS.v3.withLang,
          text: 'withLang'
        },
        {
          to: DOCPATHS.v3.useLang,
          text: 'useLang'
        },
        {
          to: DOCPATHS.v3.logs,
          text: 'logs'
        },
        {
          to: DOCPATHS.v3.createKey,
          text: 'createKey'
        },
        {
          to: DOCPATHS.v3.getLanguage,
          text: 'getLanguage'
        },
        {
          to: DOCPATHS.v3.localizeWith,
          text: 'localizeWith'
        },
        {
          to: DOCPATHS.v3.snoozeInspectionUntil,
          text: 'snoozeInspectionUntil'
        },
        {
          to: DOCPATHS.v3.localizable,
          text: 'Localizable'
        },
      ]
    },
    // {
    //   title: localize('ADVANCED'),
    //   data: [
    //     {
    //       to: DOCPATHS.v3.alternative_syntax,
    //       text: localizeTitle('ALTERNATIVE_SYNTAX')
    //     },
    //     {
    //       to: DOCPATHS.v3.localizing_jsx,
    //       text: localize('LOCALIZING_JSX')
    //     }
    //   ]
    // },
    // {
    //   title: 'Debug & Testing',
    //   data: [
    //     {
    //       to: DOCPATHS.v3.theUnavailableDocument,
    //       text: 'The Unavailable Document'
    //     },
    //   ]
    // }
  ],
  // v2: [
  //   {
  //     title: localize('ADVANCED'),
  //     data: [
  //       {
  //         to: 'v2/advanced/alternative-syntax',
  //         text: localizeTitle('ALTERNATIVE_SYNTAX')
  //       },
  //       {
  //         to: 'v2/advanced/localizing-jsx',
  //         text: localize('LOCALIZING_JSX')
  //       }
  //     ]
  //   }
  // ],
})

export default getDocs
