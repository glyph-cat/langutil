import React from 'react'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { PATHS } from '../../constants'
import CodeSamples from '../../code-samples'
import { H1, Body } from '../../components/document'
import './index.css'

class HomeScreen extends React.Component {

  render() {
    return (
      <div className='home-scn-container'>

        <div className='home-scn-banner-container'>
          <Body
            className='home-scn-banner-title'
            children={localize('LOC_JS_MADE_SIMPLE')}
          />
          <Link
            className='home-scn-getStarted'
            to={PATHS.docs}
            children={localize({ keyword: 'GET_STARTED', casing: 'upperCase' })}
          />
        </div>

        <div className='home-scn-howItWorks-container'>
          <div className=''>
            <H1
              style={{ textAlign: 'center' }}
              children={localize('HERES_HOW_IT_WORKS_NUTSHELL')}
            />
            <CodeSamples.HomeDemo />
          </div>
        </div>

      </div>
    )
  }

}

export default withLang(HomeScreen)
