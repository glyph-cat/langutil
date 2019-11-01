import React from 'react'
import { getDocs, bridge } from '../../modules'

class DocVersion extends React.Component {

  state = { version: '' }

  componentDidMount() {
    this.setVersion()
    bridge.setItem({
      onDocVersionChange: (version) => { this.setState({ version }) }
    })
  }

  componentWillUnmount() {
    bridge.removeItem('onDocVersionChange')
  }

  setVersion = (newVersion) => {
    const latestVersion = Object.keys(getDocs())[0]
    this.setState({
      version: newVersion ? newVersion : latestVersion
    })
  }

  render() {
    const { version } = this.state
    // console.log('version:', version)
    const latestVersion = Object.keys(getDocs())[0]
    return <span className='navbar-version-num' children={version ? version : latestVersion} />
  }

}

export default DocVersion
