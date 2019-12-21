const basic = ver => val => `v${ver}/basic/${val}`
const api = ver => val => `v${ver}/api/${val}`
const faq = ver => val => `v${ver}/faq/${val}`
const advanced = ver => val => `v${ver}/advanced/${val}`

const DOCPATHS = {
  v3: {

    basic: {
      installation_setup: basic(3)('installation-setup'),
      basic_usage: basic(3)('basic-usage'),
      insert_parameters: basic(3)('insert-parameters'),
      apply_casings: basic(3)('apply-casings'),
      apply_transformation: basic(3)('apply-transformation'),
    },

    faq: {
      '001': faq(3)('001'),
      '002': faq(3)('002'),
      '003': faq(3)('003'),
      '004': faq(3)('004'),
    },

    advanced: {
      create_lang_menu: advanced(3)('create-lang-menu'),
      nested_localizing: advanced(3)('nested-localizing'),
      localizing_jsx: advanced(3)('localizing-jsx'),
      localizing_on_server: advanced(3)('localizing-on-server'),
    },

    api: {
      init: api(3)('init'),
      setDictionary: api(3)('set-dictionary'),
      setLanguage: api(3)('set-language'),
      localize: api(3)('localize'),
      langmap: api(3)('langmap'),
      getCurrentLanguage: api(3)('get-current-language'),
      getDefinedLanguages: api(3)('get-defined-languages'),
      autoDetect: api(3)('auto-detect'),
      logs: api(3)('logs'),
      isAuto: api(3)('is-auto'),
      createKey: api(3)('create-key'),
      getLanguage: api(3)('get-language'),
      localizeWith: api(3)('localize-with'),
      snoozeInspectionUntil: api(3)('snooze-inspection-until'),
      localizable: api(3)('localizable'),
      withLang: api(3)('with-lang'),
      useLang: api(3)('use-lang'),
    },

    theUnavailableDocument: 'v3/unavailable/document',
  }
}

export default DOCPATHS
