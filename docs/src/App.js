import React from 'react'
import langutil, { AUTO_DETECT } from 'langutil'
import Navigator from '~navigator'
import AppBoundary from '~boundaries/AppBoundary'
import dict from '~localizations'

// if (process.env.NODE_ENV !== 'production') {
//   let head = document.getElementsByTagName('head')[0]
//   let script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = 'http://localhost:8097'
//   head.appendChild(script)
// }

langutil.init(dict, 'en', AUTO_DETECT)

function App() {
  return (
    <AppBoundary>
      <Navigator />
    </AppBoundary>
  )
}

export default App
