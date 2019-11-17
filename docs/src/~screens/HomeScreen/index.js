import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import CodeSamples from '~code-samples'
import { H1 } from '~components/document'
import HomeScreenBanner from '~components/home-screen-banner'
import './index.css'

class HomeScreen extends React.Component {
  state = { firstRenderComplete: false } // For performance boost
  componentDidMount() { this.setState({ firstRenderComplete: true }) }
  render() {
    const { firstRenderComplete } = this.state
    return (
      <div className='home-scn-container'>
        {firstRenderComplete ? <HomeScreenBanner /> : null}
        <div className='home-scn-howItWorks-container'>
          <div className=''>
            <H1
              style={{ textAlign: 'center' }}
              children={localize('HERES_HOW_IT_WORKS_NUTSHELL')}
            />
            {firstRenderComplete ? <CodeSamples.HomeDemo /> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default withLang(HomeScreen)
