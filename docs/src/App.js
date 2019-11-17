import React from 'react'
import langutil, { AUTO_DETECT } from 'langutil'
import Navigator from '~navigator'
import AppBoundary from '~boundaries/AppBoundary'
import dict from '~localizations'

langutil.init(dict, 'en', AUTO_DETECT)

function App() {
  return (
    <AppBoundary>
      <Navigator />
    </AppBoundary>
  )
}

export default App
