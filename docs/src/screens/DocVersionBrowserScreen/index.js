import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { getDocs } from '../../modules'
import { PATHS } from '../../constants'

/**
 * @description Redirects user to the URL-DEFINED version > FIRST section > FIRST topic (by id)
 */
function DocVersionBrowserScreen({ match: { params: { version } } }) {
  const allDocs = getDocs()
  const targetVersion = allDocs[version]
  console.log('targetVersion:', targetVersion)
  if (targetVersion) {
    const targetSection = targetVersion[0].data[0].to
    console.log('targetSection:', targetSection)
    return <Redirect to={`${PATHS.docs}/${targetSection}`} />
  } else {
    return <Redirect to={PATHS.docs}/>
  }
}

export default withRouter(DocVersionBrowserScreen)
