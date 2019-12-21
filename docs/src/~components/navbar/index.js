import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { pathIsMatch, scrollToTop } from '~modules'
import LanguageMenu from '~components/language-menu'
import { PATHS, VALUES } from '~constants'
import { LogoLink, DocVersion, ToggleButton, GitHubLink } from './items'
import './index.css'

const NavLink = withRouter(({ to, exact, children }) => {
  const match = pathIsMatch(to, exact)
  return (
    <Link className='navbar-navlink-container' to={to} onClick={scrollToTop}>
      <div
        className='navbar-navlink-text'
        children={children}
        style={{ backgroundColor: match ? '#000000' : '' }}
      />
      <div
        className='navbar-navlink-indicator'
        style={{ height: match ? '0.3em' : 0 }}
      />
    </Link>
  )
})



function Navbar() {
  const [showLangMenu, setShowLangMenu] = useState(false)

  // Temporary - TODO: Show language selection menu
  const toggleLangMenu = () => {
    window.alert('Documentation in other languages coming soon!')
    // setShowLangMenu(!showLangMenu)
    // setLanguage(!showLangMenu ? 'zh' : 'en')
  }

  // const widthIsCompact = window.innerWidth < VALUES.compactWidthThreshold

  return (
    <>
      <nav className='navbar-container'
        style={{
          // gridTemplateColumns: widthIsCompact ? 'auto 1fr auto' : `repeat(${2 + 1},auto) 1fr auto auto`,
          gridTemplateColumns: `repeat(${2 + 1},auto) 1fr auto auto`,
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

        <GitHubLink />

      </nav>

      {showLangMenu &&
        <div style={{
          position: 'absolute',
          right: VALUES.navbarHeight,
          top: VALUES.navbarHeight,
          minWidth: 250,
          maxHeight: 400,
          overflow: 'hidden',
          overflowY: 'scroll',
        }}>
          <LanguageMenu />
        </div>
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
