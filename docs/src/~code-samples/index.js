let defaultExtracted = false
let CodeSamples = {
  // Demo: require('./demo'),
  ApiAutoDetect: require('./api-auto-detect'),
  ApiInit: require('./api-init'),
  ApiInitReact: require('./api-init-react'),
  ApiLangmap: require('./api-langmap'),
  ApiLocalize: require('./api-localize'),
  ApiLogsFocus: require('./api-logs-focus'),
  ApiSetLanguage: require('./api-set-language'),
  ApiSetDictionary: require('./api-set-dictionary'),
  ApiUseLang: require('./api-use-lang'),
  ApiWithLang: require('./api-with-lang'),
  ApiAppendDictionary: require('./api-append-dictionary'),
  Casings: require('./casings'),
  DictionaryPrimaryExample: require('./dictionary-primary-example'),
  DictionarySecondaryExample: require('./dictionary-secondary-example'),
  DictionaryIndexExample: require('./dictionary-index-example'),
  FolderStructure: require('./folder-structure'),
  GetGuidedLanguage: require('./api-get-guided-language'),
  HomeDemo: require('./home-demo'),
  InstallUsingNpm: require('./install-using-npm'),
  InstallUsingYarn: require('./install-using-yarn'),
  ParamArray: require('./paramarray'),
  ParamArrayDictionary: require('./paramarray-dictionary'),
  ParamObject: require('./paramobject'),
  ParamObjectDictionary: require('./paramobject-dictionary'),
  SwitchingLanguages: require('./switching-languages'),
  Transformations: require('./transformations'),
  Usage: require('./usage'),
}

if (!defaultExtracted) {
  const index = Object.keys(CodeSamples)
  for (let i = 0; i < index.length; i++) {
    CodeSamples[index[i]] = CodeSamples[index[i]].default
  }
}

module.exports = CodeSamples
