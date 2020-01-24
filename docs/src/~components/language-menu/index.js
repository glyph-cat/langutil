import React from 'react'
import { setLanguage, AUTO_DETECT } from 'langutil'
import { useLang } from 'langutil/react-additions'
import { STRINGS } from '~constants'
import useTheme from '~hooks/useTheme'
import getLanguages from './get-languages'
import './index.css'

function LanguageMenu() {
  const { lang: _lang, auto: _auto } = useLang()
  const list = getLanguages(_lang)
  const { palette: { primary } } = useTheme()
  let toRender = []
  for (let i = 0; i < list.length; i++) {
    const { auto, code, displayName, nativeName } = list[i]
    let selected = true
    if (_auto) {
      selected = _auto && auto
    } else {
      selected = (code === _lang) && !auto
    }
    toRender.push(
      <div key={i}
        className='langmenu-item-container'
        onClick={() => {
          setLanguage(code, auto ? AUTO_DETECT : undefined)
          localStorage.setItem(STRINGS.userPrefLang, JSON.stringify({ lang: code, auto }))
        }}
        style={{
          color: selected ? primary.main : '',
          backgroundColor: selected ? primary.light : '',
        }}
      >
        <i
          className='material-icons langmenu-item-tick-container'
          children='done'
          style={{ opacity: selected ? 1 : 0 }}
        />
        <div className='langmenu-item-text-container'>
          <span
            className='langmenu-item-displayName'
            children={displayName}
          />
          {displayName !== nativeName &&
            <span
              className='langmenu-item-nativeName'
              children={nativeName}
            />
          }
        </div>
      </div>
    )
  }
  return (
    <div
      className='langmenu-container'
      children={toRender}
    />
  )
}

export default LanguageMenu
