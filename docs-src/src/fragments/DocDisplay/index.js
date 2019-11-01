import React from 'react'
import DocContent from '../../components/doc-content'
import DocSidebar from '../../components/doc-sidebar'
import DocContentBoundary from '../../boundaries/DocContentBoundary'
import './index.css'

function DocDisplay({ sections }) {
  return (
    <div className='doc-display-container'>
      <DocSidebar sections={sections} />
      <DocContentBoundary>
        <DocContent />
      </DocContentBoundary>
    </div>
  )
}

export default DocDisplay
