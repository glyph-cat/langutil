import React from 'react'
import { withLang } from 'langutil/react-additions'
import DocDisplay from '../../fragments/DocDisplay'
import { SectionContext } from '../../context'
import { getDocs } from '../../modules'

function DocContentScreen({ match: { params: { version } } }) {
  const sections = getDocs()[version]
  return (
    <SectionContext.Provider value={{ sections }}>
      <DocDisplay sections={sections} />
    </SectionContext.Provider>
  )
}

export default withLang(DocContentScreen)
