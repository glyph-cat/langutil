import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize, setLanguage } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { scrollToTop, getDocs } from '../../modules'
import { PATHS, STRINGS, VALUES } from '../../constants'
import ghIcon from '../../assets/github-icon.svg'
import langutilIcon from '../../assets/langutil-icon.svg'
// import Modal from '../../components/modal'
// import getNavLinks from './navlinks'
import './index.css'

function pathIsMatch(to, exact) {
  const { href, origin } = window.location
  const currentLocation = href.replace(`${origin}/#`, '')
  if (exact) {
    // console.log(`currentLocation("${currentLocation}") === to("${to}")`, currentLocation === to)
    return currentLocation === to
  } else {
    // console.log(`"${currentLocation}".includes("${to}")`, currentLocation.includes(to))
    return currentLocation.includes(to)
  }
}

const NavLink = withRouter(({ to, exact, children }) => {
  const match = pathIsMatch(to, exact)
  return (
    <Link className='navbar-navlink-container' to={to} onClick={scrollToTop}>
      <div
        className='navbar-navlink-text'
        // children={localize(children)}
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

// TOFIX: Version number not changing when switching to docs for other versions
const DocVersion = withRouter(({ match: { params: { version } } }) => {
  console.log('version:', version)
  const latestVersion = Object.keys(getDocs())[0]
  return <span className='navbar-version-num' children={version ? version : latestVersion} />
})

function Navbar() {
  const [showLangMenu, setShowLangMenu] = useState(false)

  // Temporary - TODO: Show language selection menu
  const toggleLangMenu = () => {
    setShowLangMenu(!showLangMenu)
    setLanguage(!showLangMenu ? 'zh' : 'en')
  }

  const widthIsCompact = window.innerWidth < VALUES.compactWidthThreshold

  return (
    <>
      {/* <Modal show>
        Hello world
      </Modal> */}
      <nav className='navbar-container'
        style={{
          gridTemplateColumns: `repeat(${2 + 1},auto) 1fr auto auto`,
          height: VALUES.navbarHeight,
        }}
      >
        {/* Logo */}
        <Link
          className='navbar-navlink-container navbar-logo-container'
          to={PATHS.home}
          onClick={scrollToTop}
          style={{
            gridTemplateColumns: widthIsCompact ? '' : 'repeat(2, auto)',
          }}
        >
          <img className='navbar-logo-img' src={langutilIcon} alt='Homepage' />
          {
            widthIsCompact ? null :
              <p style={{ margin: 0, marginBottom: '0.1em' }}>
                <span className='navbar-logo-text' children='langutil' />
              </p>
          }
        </Link>

        {/* Docs */}
        <NavLink to={PATHS.docs}>
          <div>
            {localize('DOCS')}
            <DocVersion />
          </div>
        </NavLink>

        {/* Changelog */}
        <NavLink to={PATHS.changelog}>
          {localize('CHANGELOG')}
        </NavLink>

        {/* Spacing */}
        <div />

        {/* Translation */}
        <button
          className='navbar-navlink-button navbar-navlink-container navbar-squareitem-container'
          title={localize('SWITCH_LANGUAGE')}
          style={{
            backgroundColor: showLangMenu ? '#FFFFFF' : '',
            width: VALUES.navbarHeight,
          }}
          onClick={toggleLangMenu}
        >
          <i
            className='material-icons navbar-navlink-button-text'
            children='translate'
            style={{ color: showLangMenu ? '#212833' : '' }}
          />
        </button>

        {/* View in GitHub */}
        <a
          className='navbar-navlink-container navbar-squareitem-container'
          href={STRINGS.githubRepo}
          target='_blank' rel='noopener noreferrer'
          style={{ width: VALUES.navbarHeight }}
          title={localize('VIEW_IN_GITHUB')}
        >
          <img className='navbar-navlink-img' src={ghIcon} alt={localize('VIEW_IN_GITHUB')} />
        </a>

      </nav>
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
