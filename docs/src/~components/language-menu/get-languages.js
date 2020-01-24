import { localize, langmap } from 'langutil'

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
      nativeName: autoName,
    },
    createLangItem('en'),
    createLangItem('ja'),
    createLangItem('ms'),
    createLangItem('zh-Hans'),
    createLangItem('zh-Hant'),
  ]
}

export default getLanguages
