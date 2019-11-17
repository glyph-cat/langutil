const basic = ver => val => `v${ver}/basic/${val}`
const api = ver => val => `v${ver}/api/${val}`
const advanced = ver => val => `v${ver}/advanced/${val}`

const DOCPATHS = {
  v3: {
    installation_setup: basic(3)('installation-setup'),
    basic_usage: basic(3)('basic-usage'),
    insert_parameters: basic(3)('insert-parameters'),
    apply_casings: basic(3)('apply-casings'),
    apply_transformation: basic(3)('apply-transformation'),

    init: api(3)('init'),
    setDictionary: api(3)('set-dictionary'),
    setLanguage: api(3)('set-language'),
    localize: api(3)('localize'),
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

    alternative_syntax: advanced(3)('alternative-syntax'),
    localizing_jsx: advanced(3)('localizing-jsx'),

    theUnavailableDocument: 'v3/unavailable/document',
  }
}

export default DOCPATHS
