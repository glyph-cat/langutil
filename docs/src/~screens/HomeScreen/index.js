import React from 'react'
import { withLang } from 'langutil/react-additions'
import AppendMeta from '~components/append-meta'
import HomeScreenBanner from '~components/home-screen-banner'
import StatContainer from './stat-container'
import HowItWorksStatContainer from './how-it-works-container'
import './index.css'

function HomeScreen() {
  return (
    <div className='home-scn-container'>
      <AppendMeta />
      <HomeScreenBanner />
      <StatContainer />
      <HowItWorksStatContainer />
    </div>
  )
}

export default withLang(HomeScreen)
