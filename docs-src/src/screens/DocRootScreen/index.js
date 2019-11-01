import React from 'react'
import { Redirect } from 'react-router-dom'
import { getDocs } from '../../modules'
import { PATHS } from '../../constants'

/**
 * @description Redirects user to the LATEST version > FIRST section > FIRST topic (by id)
 */
function DocRootScreen() {
  const allDocs = getDocs()
  const targetVersion = Object.values(allDocs)[0] // Get latest version
  const firstSection = targetVersion[0].data[0].to
  return <Redirect to={`${PATHS.docs}/${firstSection}`} />
}

export default DocRootScreen
