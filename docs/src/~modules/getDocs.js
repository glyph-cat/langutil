import { localize } from 'langutil'
import { DOCPATHS } from '~constants'

const localizeTitle = (keyword) => localize({ keyword, casing: 'titleCase' })

const getDocs = () => ({
  // v4: [
  //   {
  //     title: 'Testing',
  //     data: [
  //       {
  //         to: DOCPATHS.v3.basic.installation_setup,
  //         text: localizeTitle('INSTALLATION_AND_SETUP'),
  //       }
  //     ]
  //   }
  // ],
  v3: [
    {
      title: localizeTitle('BASICS'),
      data: [
        {
          to: DOCPATHS.v3.basic.installation_setup,
          text: localizeTitle('INSTALLATION_AND_SETUP')
        },
        {
          to: DOCPATHS.v3.basic.basic_usage,
          text: localizeTitle('BASIC_USAGE')
        },
        {
          to: DOCPATHS.v3.basic.insert_parameters,
          text: localizeTitle('INSERT_PARAMETERS')
        },
        {
          to: DOCPATHS.v3.basic.apply_casings,
          text: localizeTitle('APPLY_CASINGS')
        },
        {
          to: DOCPATHS.v3.basic.apply_transformation,
          text: localizeTitle('APPLY_TRANSFORMATION')
        },
      ]
    },
    // {
    //   title: localize('ADVANCED'),
    //   data: [
    //     {
    //       to: DOCPATHS.v3.advanced.create_lang_menu,
    //       text: localize('CREATING_A_LANG_SELECT_MENU'),
    //     },
    //     {
    //       to: DOCPATHS.v3.advanced.nested_localizing,
    //       text: localize('NESTED_LOCALIZING'),
    //     },
    //     {
    //       to: DOCPATHS.v3.advanced.localizing_jsx,
    //       text: localize('LOCALIZING_JSX'),
    //     },
    //     {
    //       to: DOCPATHS.v3.advanced.localizing_on_server,
    //       text: localize('LOCALIZING_ON_SERVER'),
    //     }
    //   ]
    // },
    {
      title: localize('FAQ'),
      data: [
        {
          to: DOCPATHS.v3.faq['001'],
          text: localize('FAQ_TITLE_001')
        },
        {
          to: DOCPATHS.v3.faq['002'],
          text: localize('FAQ_TITLE_002')
        },
        {
          to: DOCPATHS.v3.faq['003'],
          text: localize('FAQ_TITLE_003')
        },
        {
          to: DOCPATHS.v3.faq['004'],
          text: localize('FAQ_TITLE_004')
        },
      ]
    },
    {
      title: localize('API_REFERENCES'),
      data: [
        {
          to: DOCPATHS.v3.api.init,
          text: 'init'
        },
        {
          to: DOCPATHS.v3.api.setDictionary,
          text: 'setDictionary'
        },
        {
          to: DOCPATHS.v3.api.setLanguage,
          text: 'setLanguage'
        },
        {
          to: DOCPATHS.v3.api.localize,
          text: 'localize'
        },
        {
          to: DOCPATHS.v3.api.langmap,
          text: 'langmap'
        },
        {
          to: DOCPATHS.v3.api.getCurrentLanguage,
          text: 'getCurrentLanguage'
        },
        {
          to: DOCPATHS.v3.api.getDefinedLanguages,
          text: 'getDefinedLanguages'
        },
        {
          to: DOCPATHS.v3.api.autoDetect,
          text: 'AUTO_DETECT'
        },
        {
          to: DOCPATHS.v3.api.isAuto,
          text: 'isAuto'
        },
        {
          to: DOCPATHS.v3.api.withLang,
          text: 'withLang'
        },
        {
          to: DOCPATHS.v3.api.useLang,
          text: 'useLang'
        },
        {
          to: DOCPATHS.v3.api.logs,
          text: 'logs'
        },
        {
          to: DOCPATHS.v3.api.createKey,
          text: 'createKey'
        },
        {
          to: DOCPATHS.v3.api.getLanguage,
          text: 'getLanguage'
        },
        {
          to: DOCPATHS.v3.api.localizeWith,
          text: 'localizeWith'
        },
        {
          to: DOCPATHS.v3.api.snoozeInspectionUntil,
          text: 'snoozeInspectionUntil'
        },
        {
          to: DOCPATHS.v3.api.localizable,
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
