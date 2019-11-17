import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { getDocs } from '~modules'
import { PATHS } from '~constants'

/**
 * @description Redirects user to the URL-DEFINED version > URL-DEFINED section > FIRST topic (by id)
 */
function DocSectionBrowserScreen({ match: { params: { version, section } } }) {
  const allDocs = getDocs()
  const targetVersion = allDocs[version]
  const firstTopic = getFirstTopicFrom({ doc: targetVersion, bySection: `${version}/${section}/` })
  if (firstTopic) {
    return <Redirect to={`${PATHS.docs}/${firstTopic}`} />
  } else {
    return <Redirect to={`${PATHS.docs}/${targetVersion}/`}/>
  }
}

export default withRouter(DocSectionBrowserScreen)

function getFirstTopicFrom({ doc = [], bySection }) {
  console.log('doc:', doc)
  for (let i = 0; i < doc.length; i++) {
    console.log(bySection, doc[i].data[0].to)
    if (doc[i].data[0].to.includes(bySection)) {
      return doc[i].data[0].to
    }
  }
  return null
}
