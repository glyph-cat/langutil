import React from 'react'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import langutilIcon from '~assets/langutil-icon.svg'
import ghIcon from '~assets/github-icon.svg'
import { EXT_LINKS, PATHS, VALUES } from '~constants'
import useTheme from '~hooks/useTheme'
import { bridge, getDocs, scrollToTop } from '~modules'

/**
 * @description
 */
export function LogoLink() {
  const isCompact = useMediaQuery('(max-height: 600px), (max-width: 800px)')
  return (
    <Link
      className='navbar-navlink-container navbar-logo-container'
      to={PATHS.home}
      onClick={scrollToTop}
      style={{ gridTemplateColumns: `repeat(${isCompact ? 1 : 2}, auto)` }}
    >
      <img className='navbar-logo-img' src={langutilIcon} alt='Homepage' />
      <p
        className='navbar-logo-text'
        children='langutil'
        style={{ display: isCompact ? 'none' : '' }}
      />
    </Link>
  )
}

/**
 * @description
 */
export class DocVersion extends React.Component {

  state = { version: '' }

  componentDidMount() {
    this.setVersion()
    bridge.setItem({ onDocVersionChange: this.setVersion })
  }

  componentWillUnmount() {
    bridge.removeItem('onDocVersionChange')
  }

  setVersion = (newVersion) => {
    const latestVersion = Object.keys(getDocs())[0]
    setTimeout(() => {
      this.setState({
        version: newVersion ? newVersion : latestVersion
      })
    })
  }

  render() {
    const { version } = this.state
    // console.log('version:', version)
    const latestVersion = Object.keys(getDocs())[0]
    return <span className='navbar-version-num' children={version ? version : latestVersion} />
  }

}

export function ToggleButton({ active, buttonProps, iconName, iconProps }) {
  const { palette: { misc } } = useTheme()
  return (
    <button
      className='navbar-navlink-button navbar-navlink-container navbar-squareitem-container'
      style={{
        backgroundColor: active ? misc.nbToggleActiveBg : '',
        width: VALUES.navbarHeight,
      }}
      {...buttonProps}
    >
      <i
        className='material-icons navbar-navlink-button-text'
        children={iconName} style={{ color: active ? '#212833' : '' }}
        {...iconProps}
      />
    </button>
  )
}

/**
 * @description
 */
export function GitHubLink() {
  return (
    <a
      className='navbar-navlink-container navbar-squareitem-container'
      href={EXT_LINKS.githubRepo}
      target='_blank' rel='noopener noreferrer'
      style={{ width: VALUES.navbarHeight }}
      title={localize('VIEW_ON_GITHUB')}
    >
      <img className='navbar-navlink-img' src={ghIcon} alt={localize('VIEW_ON_GITHUB')} />
    </a>
  )
}

