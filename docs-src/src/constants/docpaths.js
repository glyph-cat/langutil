const basic = ver => val => `v${ver}_basic_${val}`
const api = ver => val => `v${ver}_api_${val}`
const advanced = ver => val => `v${ver}_advanced_${val}`

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
    localizeWith: api(3)('localize-with'),
    autoDetect: api(3)('auto-detect'),
    withLang: api(3)('with-lang'),
    alternative_syntax: advanced(3)('alternative-syntax'),
    localizing_jsx: advanced(3)('localizing-jsx'),
  }
}

export default DOCPATHS
