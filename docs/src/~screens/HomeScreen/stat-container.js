import React from 'react'
import { localize } from 'langutil'
import ReadmeBadge from '~components/readme-badge'
import { EXT_LINKS } from '~constants'

function StatContainer() {
  return (
    <div className='home-scn-stat-container'>
      <div className='home-scn-stat-subcontainer'>

        <ReadmeBadge
          src={EXT_LINKS.IMG_npmBadge}
          href={EXT_LINKS.npmPage}
          alt={localize('VIEW_ON_NPM')}
        />

        <ReadmeBadge
          src={EXT_LINKS.IMG_npmTotalDownloadsBadge}
          href={EXT_LINKS.npmStat}
          alt={localize('TOTAL_DOWNLOADS')}
        />

        <ReadmeBadge
          src={EXT_LINKS.IMG_travisCiBadge}
          href={EXT_LINKS.travisCiPage}
          alt={'Travis CI'}
        />

      </div>
    </div>
  )
}

export default StatContainer
