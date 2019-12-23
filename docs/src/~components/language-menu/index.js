import React from 'react'
import { setLanguage, AUTO_DETECT } from 'langutil'
import { useLang } from 'langutil/react-additions'
import { STRINGS } from '~constants'
import getLanguages from './get-languages'
import './index.css'

// Press escape key to dismiss
// Click anywhere outside of menu to dismiss

function LanguageMenu() {
  const { lang: _lang, auto: _auto } = useLang()
  const list = getLanguages(_lang)
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
          localStorage.setItem(STRINGS.langpref, JSON.stringify({ lang: code, auto }))
        }}
      >
        <i
          className='material-icons langmenu-item-tick-container'
          children='done'
          style={{
            opacity: selected ? 1 : 0,
          }}
        />
        <div className='langmenu-item-text-container'>
          <span
            className='langmenu-item-displayName'
            children={displayName}
            style={{
              // ...
            }}
          />
          <span
            className='langmenu-item-nativeName'
            children={nativeName}
            style={{
              // opacity: displayName === nativeName ? 0 : 1,
            }}
          />
        </div>
      </div>
    )
  }
  return (
    <div className='langmenu-container' >
      {toRender}
    </div>
  )
}

export default LanguageMenu
