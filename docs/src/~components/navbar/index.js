import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { useMediaQuery } from '@material-ui/core'
import { pathIsMatch, scrollToTop } from '~modules'
import AppearanceMenu from '~components/appearance-menu'
import LanguageMenu from '~components/language-menu'
import { PATHS, VALUES } from '~constants'
import useTheme from '~hooks/useTheme'
import { LogoLink, DocVersion, ToggleButton, GitHubLink } from './items'
import './index.css'

const NavLink = withRouter(({ to, exact, children }) => {
  const match = pathIsMatch(to, exact)
  const { palette: { misc } } = useTheme()
  return (
    <Link className='navbar-navlink-container' to={to} onClick={scrollToTop}>
      <div
        className='navbar-navlink-text'
        children={children}
        style={{ backgroundColor: match ? misc.navLinkActiveBg : '' }}
      />
      <div
        className='navbar-navlink-indicator'
        style={{
          backgroundColor: misc.navLinkIndicator,
          height: match ? '0.3em' : 0,
        }}
      />
    </Link>
  )
})

function Navbar() {
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showAppearanceMenu, setShowAppearanceMenu] = useState(false)
  const { palette: { misc } } = useTheme()
  const isCompactWidth = useMediaQuery('(max-width: 800px)')

  // Temporary - TODO: Show language selection menu
  const toggleLangMenu = () => {
    // window.alert('Documentation in other languages coming soon!')
    setShowLangMenu(!showLangMenu)
  }
  const toggleAppearanceMenu = () => {
    // window.alert('Coming soon!')
    setShowAppearanceMenu(!showAppearanceMenu)
  }

  return (
    <>
      <nav className='navbar-container'
        style={{
          backgroundColor: misc.navbarBg,
          gridTemplateColumns: `repeat(${2 + 1},auto) 1fr repeat(${isCompactWidth ? 2 : 3}, auto)`,
          height: VALUES.navbarHeight,
        }}
      >
        <LogoLink />

        {/* Docs */}
        <NavLink to={PATHS.docs}>
          <div>{localize('DOCS')}<DocVersion /></div>
        </NavLink>

        {/* Changelog */}
        <NavLink to={PATHS.changelog}>
          {localize('CHANGELOG')}
        </NavLink>

        {/* Spacing */}
        <div />

        {/* Translation */}
        <ToggleButton
          iconName='translate'
          active={showLangMenu}
          buttonProps={{
            onClick: toggleLangMenu,
            title: localize('SWITCH_LANGUAGE')
          }}
        />

        {/* Appearance */}
        <ToggleButton
          iconName='brightness_4'
          active={showAppearanceMenu}
          buttonProps={{
            onClick: toggleAppearanceMenu,
            title: ''
            // localize('TOGGLE_DARK_LIGHT_MODE')
          }}
        />

        {!isCompactWidth && <GitHubLink />}

      </nav>

      {showAppearanceMenu &&
        <MenuComponent
          component={AppearanceMenu}
          hideMenu={() => { setShowAppearanceMenu(false) }}
          offset={{
            right: VALUES.navbarHeight * (isCompactWidth ? 0 : 1),
            top: VALUES.navbarHeight,
          }}
        />
      }

      {showLangMenu &&
        <MenuComponent
          component={LanguageMenu}
          hideMenu={() => { setShowLangMenu(false) }}
          offset={{
            right: VALUES.navbarHeight * (isCompactWidth ? 1 : 2),
            top: VALUES.navbarHeight,
          }}
        />
      }

      <div
        className='navbar-container'
        style={{
          backgroundColor: 'transparent',
          height: VALUES.navbarHeight,
          position: 'relative',
          zIndex: 0,
        }}
      />
    </>
  )
}

export default withLang(Navbar)

function useEscKeyListener(onEsc) {
  const listenForEscKey = ({ keyCode }) => keyCode === 27 ? onEsc() : {}
  useEffect(() => {
    window.addEventListener('keydown', listenForEscKey)
    return () => { window.removeEventListener('keydown', listenForEscKey) }
  })
}

function MenuComponent({ hideMenu, component: Component, offset: { right, top } }) {
  useEscKeyListener(hideMenu)
  const { palette: { misc } } = useTheme()
  return (
    <>
      <div
        className='navbar-menu-underlay'
        onClick={hideMenu}
      />
      <div
        className='navbar-menu-container'
        children={<Component />}
        style={{
          right, top,
          backgroundColor: misc.appBg,
          color: misc.appFg,
          boxShadow: `0 3px 7px 0 ${misc.shadowColor}44`,
        }}
      />
    </>
  )
}
