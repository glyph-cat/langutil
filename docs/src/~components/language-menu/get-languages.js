import { localize, langmap } from 'langutil'

// If nativeName !== displayName
// Then show, for example: [ Chinese Simplified (简体中文) ]
// Otherwise: [ English ]

const getKeyed = code => code.replace(/-/g, '_').toUpperCase()

function createLangItem(code = '') {
  const keyedCode = getKeyed(code)
  return {
    code,
    displayName: localize(`LANG_DISP_${keyedCode}`),
    nativeName: langmap(code, `LANG_DISP_${keyedCode}`),
  }
}

function getLanguages(currentLang = 'en') {
  const autoName = localize('AUTOMATIC')
  return [
    {
      auto: true,
      code: currentLang,
      displayName: autoName,
      nativeName: langmap(currentLang, `LANG_DISP_${getKeyed(currentLang)}`),
    },
    createLangItem('en'),
    createLangItem('ja'),
    createLangItem('ms'),
    createLangItem('zh-Hans'),
    createLangItem('zh-Hant'),
  ]
}

export default getLanguages
