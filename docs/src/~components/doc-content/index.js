import React, { Suspense, lazy } from 'react'
import { withRouter } from 'react-router-dom'
import DocPrevNext from '~components/doc-prev-next'
import Loader from '~components/loader'
import DocUnavailable from '~components/doc-unavailable'
import { bridge } from '~modules'
import './index.css'

function DocContent({ match: { params: { version: v, section: s, id } } }) {
  // Listen for change in doc version
  const onDocVersionChange = bridge.getItem('onDocVersionChange')
  if (typeof onDocVersionChange === 'function') { onDocVersionChange(v) }

  let componentFound = false
  let DocComponent = () => <DocUnavailable />
  try {
    if (require.resolve(`~documentations/${v}_${s}_${id}`)) {
      componentFound = true
    }
  } catch (e) { }
  if (componentFound) {
    DocComponent = lazy(() => import(`~documentations/${v}_${s}_${id}`))
  }
  return (
    <Suspense fallback={<Loader />}>
      <div className='doc-content-container'>
        <DocPrevNext position='top' />
        <div className='doc-content-component-container'>
          <DocComponent />
        </div>
        <DocPrevNext position='bottom' />
      </div>
    </Suspense>
  )
}

export default withRouter(DocContent)
