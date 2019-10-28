import React, { Suspense, lazy } from 'react'
import { withRouter } from 'react-router-dom'
import DocPrevNext from '../../components/doc-prev-next'
import DocUnavailable from '../../components/doc-unavailable'
// import { SectionBreak } from '../../components/document'
import './index.css'

function DocContent({ match: { params: { id } } }) {
  // console.log('docId:', id)
  let componentFound = false
  let DocComponent = () => <DocUnavailable />
  try { if (require(`../../documentations/${id}`)) { componentFound = true } } catch (e) { }
  if (componentFound) { DocComponent = lazy(() => import(`../../documentations/${id}`)) }
  const prevnext = <DocPrevNext />
  return (
    <Suspense fallback={<div />}>
      <div className='doc-content-container'>
        {prevnext}
        <div className='doc-content-component-container'>
          <DocComponent />
        </div>
        {prevnext}
      </div>
    </Suspense>
  )
}

export default withRouter(DocContent)
