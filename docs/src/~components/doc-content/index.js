import React, { Suspense, lazy } from 'react'
import { withRouter } from 'react-router-dom'
import DocPrevNext from '~components/doc-prev-next'
import DocUnavailable from '~components/doc-unavailable'
import { bridge } from '~modules'
import './index.css'

function DocContent({ match: { params: { version: v, section: s, id, subId } } }) {
  // Listen for change in doc version
  const onDocVersionChange = bridge.getItem('onDocVersionChange')
  if (typeof onDocVersionChange === 'function') { onDocVersionChange(v) }

  let componentFound = false
  let DocComponent = () => <DocUnavailable />
  // console.log(`path: ${`../../documentations/${v}_${s}_${id}`}`)
  try {
    // if (require(`../../documentations/${v}_${s}_${id}`)) {
    if (require(`~documentations/${v}_${s}_${id}`)) {
      componentFound = true
    }
  } catch (e) { }
  if (componentFound) {
    // DocComponent = lazy(() => import(`../../documentations/${v}_${s}_${id}`))
    DocComponent = lazy(() => import(`~documentations/${v}_${s}_${id}`))
  }
  return (
    <Suspense fallback={<div />}>
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
