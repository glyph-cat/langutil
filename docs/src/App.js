import React, { useState } from 'react'
import langutil, { AUTO_DETECT } from 'langutil'
import Navigator from '~navigator'
import AppBoundary from '~boundaries/AppBoundary'
import VersionCheckContext from '~contexts/VersionCheckContext'
import useVersionCheckEffect from '~hooks/useVersionCheckEffect'
import dict from '~localizations'
import { STRINGS } from '~constants'

// if (process.env.NODE_ENV !== 'production') {
//   let head = document.getElementsByTagName('head')[0]
//   let script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = 'http://localhost:8097'
//   head.appendChild(script)
// }

langutil.init(dict, 'en', AUTO_DETECT)

function App() {
  const [latestVersion, setLatestVersion] = useState(STRINGS.labelWaiting)
  useVersionCheckEffect((latestVersion) => {
    setLatestVersion(latestVersion)
  })
  return (
    <AppBoundary>
      <VersionCheckContext.Provider value={latestVersion}>
        <Navigator />
      </VersionCheckContext.Provider>
    </AppBoundary>
  )

}

export default App
