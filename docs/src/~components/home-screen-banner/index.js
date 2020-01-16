import React from 'react'
import { Link } from 'react-router-dom'
import { appendDictionary, localize } from 'langutil'
import { PATHS } from '~constants'
import { Body } from '~components/document'
import useTheme from '~hooks/useTheme'
import BannerGround from '~svg/banner-ground'
import BannerStarField from '~svg/banner-starfield'
import BannerRocket from '~svg/banner-rocket'
import BannerSmoke1 from '~svg/banner-smoke-1'
import BannerSmoke2 from '~svg/banner-smoke-2'
import localizations from './localizations'
import './index.css'

function HomeScreenBanner() {
  appendDictionary(localizations, 'hs-banner')
  const { palette: { misc } } = useTheme()
  return (
    <div className='homescnbanner-container'>
      <div className='homescnbanner-pseudocanvas'>
        <BannerStarField />
        <BannerSmoke1 />
        <BannerSmoke2 />
        <BannerRocket />
        <BannerGround />
      </div>
      <div className='homescnbanner-content-container'>
        <Body
          className='homescnbanner-title'
          children={localize('LOC_JS_MADE_SIMPLE')}
        />
        <Link
          className='homescnbanner-getStarted'
          to={PATHS.docs}
          children={localize('GET_STARTED', null, 'upperCase')}
          style={{
            backgroundColor: misc.appBg,
            // boxShadow: `0 5px 15px 0 ${misc.shadowColor}44`,
          }}
        />
      </div>
    </div>
  )
}

export default HomeScreenBanner
