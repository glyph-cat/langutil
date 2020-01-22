import React, { useState, useEffect, useRef } from 'react'
import langutil, { AUTO_DETECT } from 'langutil'
import { useMediaQuery } from '@material-ui/core'
import AppBoundary from '~boundaries/AppBoundary'
import { STRINGS, THEMES } from '~constants'
import ThemeContext from '~contexts/ThemeContext'
// import VersionCheckContext from '~contexts/VersionCheckContext'
// import useVersionCheckEffect from '~hooks/useVersionCheckEffect'
import dict from '~localizations'
import Navigator from '~navigator'
import { bridge } from '~modules'

let initedFromPref = false
try {
  const userPrefLang = localStorage.getItem(STRINGS.userPrefLang)
  if (typeof userPrefLang === 'string') {
    const { lang, auto } = JSON.parse(userPrefLang)
    langutil.init(dict, lang, auto ? AUTO_DETECT : undefined)
    initedFromPref = true
  }
} catch (e) { }
if (!initedFromPref) {
  langutil.init(dict, 'en', AUTO_DETECT) // Default
}

function App() {

  // Package version check
  // const [latestVersion, setLatestVersion] = useState(STRINGS.labelWaiting)
  // useVersionCheckEffect((latestVersion) => { setLatestVersion(latestVersion) })

  // Light/Dark appearance
  const localStorageAppearance = useRef(localStorage.getItem(STRINGS.userPrefAppearance) || null)
  const [userPrefAppearance, _setUserPrefAppearance] = useState(localStorageAppearance.current)
  const isSystemDark = useMediaQuery('(prefers-color-scheme: dark)')
  const { lightTheme, darkTheme } = THEMES
  let themeToUse = lightTheme
  if (userPrefAppearance === 'dark' || (!userPrefAppearance && isSystemDark)) {
    themeToUse = darkTheme
  }

  useEffect(() => {
    bridge.setItem({
      userPrefAppearance: localStorageAppearance.current ? localStorageAppearance.current : 'auto',
      appearanceSetAuto: () => {
        _setUserPrefAppearance(null)
        localStorage.removeItem(STRINGS.userPrefAppearance)
        bridge.setItem({ userPrefAppearance: 'auto' })
      },
      appearanceSetLight: () => {
        _setUserPrefAppearance('light')
        localStorage.setItem(STRINGS.userPrefAppearance, 'light')
        bridge.setItem({ userPrefAppearance: 'light' })
      },
      appearanceSetDark: () => {
        _setUserPrefAppearance('dark')
        localStorage.setItem(STRINGS.userPrefAppearance, 'dark')
        bridge.setItem({ userPrefAppearance: 'dark' })
      },
    })
  }, [localStorageAppearance])

  return (
    <>
      <Styles theme={themeToUse} />
      <AppBoundary>
        {/* <VersionCheckContext.Provider value={latestVersion}> */}
          <ThemeContext.Provider value={themeToUse}>
            <Navigator />
          </ThemeContext.Provider>
        {/* </VersionCheckContext.Provider> */}
      </AppBoundary>
    </>
  )

}

export default App

function Styles({ theme: { palette: { misc } } }) {
  return (
    <style>
      {`
          body {
            background-color: ${misc.appBg};
            color: ${misc.appFg};
          }

          a {
            color: ${misc.a};
            font-size: 1.15em;
          }

          a:hover {
            color: ${misc.aHover};
          }

          a:active {
            opacity: 0.5;
          }
        `}
    </style>
  )
}
