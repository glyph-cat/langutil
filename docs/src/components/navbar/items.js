import React from 'react'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import { bridge, getDocs, scrollToTop } from '../../modules'
import { PATHS, STRINGS, VALUES } from '../../constants'
import langutilIcon from '../../assets/langutil-icon.svg'
import ghIcon from '../../assets/github-icon.svg'

/**
 * @description
 */
export function LogoLink() {
  return (
    <Link
      className='navbar-navlink-container navbar-logo-container'
      to={PATHS.home}
      onClick={scrollToTop}
    >
      <img className='navbar-logo-img' src={langutilIcon} alt='Homepage' />
      <p style={{ margin: 0, marginBottom: '0.1em' }}>
        <span className='navbar-logo-text' children='langutil' />
      </p>
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
  return (
    <button
      className='navbar-navlink-button navbar-navlink-container navbar-squareitem-container'
      style={{ backgroundColor: active ? '#FFFFFF' : '', width: VALUES.navbarHeight }}
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
      href={STRINGS.githubRepo}
      target='_blank' rel='noopener noreferrer'
      style={{ width: VALUES.navbarHeight }}
      title={localize('VIEW_ON_GITHUB')}
    >
      <img className='navbar-navlink-img' src={ghIcon} alt={localize('VIEW_ON_GITHUB')} />
    </a>
  )
}

