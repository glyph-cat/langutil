import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize, setLanguage } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { scrollToTop } from '../../modules'
import { PATHS, STRINGS, VALUES } from '../../constants'
import ghIcon from '../../assets/github-icon.svg'
import langutilIcon from '../../assets/langutil-icon.svg'
// import Modal from '../../components/modal'
import getNavLinks from './navlinks'
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

function Navbar() {
  const [showLangMenu, setShowLangMenu] = useState(false)

  // Temporary - TODO: Show language selection menu
  const toggleLangMenu = () => {
    setShowLangMenu(!showLangMenu)
    setLanguage(!showLangMenu ? 'zh' : 'en')
  }

  const widthIsCompact = window.innerWidth < VALUES.compactWidthThreshold

  let navlinkArray = []
  const NAV_LINKS = getNavLinks()
  for (let i = 0; i < NAV_LINKS.length; i++) {
    const { to, exact, children } = NAV_LINKS[i]
    navlinkArray.push(<NavLink key={i} to={to} exact={exact} children={children} />)
  }
  return (
    <>
      {/* <Modal show>
        Hello world
      </Modal> */}
      <nav className='navbar-container'
        style={{
          gridTemplateColumns: `repeat(${navlinkArray.length + 1},auto) 1fr auto auto`,
          height: VALUES.navbarHeight,
        }}
      >
        {/* Logo */}
        <Link
          className='navbar-navlink-container navbar-logo-container'
          to={PATHS.home}
          onClick={scrollToTop}
        >
          <img className='navbar-logo-img' src={langutilIcon} alt='Homepage' />
          {
            widthIsCompact ? null :
              <p style={{ margin: 0, marginBottom: '0.1em' }}>
                <span className='navbar-logo-text' children='langutil' />
              </p>
          }
        </Link>

        {/* Other links + spacing */}
        {navlinkArray}
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
