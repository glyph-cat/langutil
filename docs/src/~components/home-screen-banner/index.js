import React from 'react'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import { PATHS } from '~constants'
import { Body } from '~components/document'
import BannerGround from '~svg/banner-ground'
import BannerStarField from '~svg/banner-starfield'
import BannerRocket from '~svg/banner-rocket'
import BannerSmoke1 from '~svg/banner-smoke-1'
import BannerSmoke2 from '~svg/banner-smoke-2'
import './index.css'

function HomeScreenBanner() {
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
          children={localize({ keyword: 'GET_STARTED', casing: 'upperCase' })}
        />
      </div>
    </div>
  )
}

export default HomeScreenBanner
