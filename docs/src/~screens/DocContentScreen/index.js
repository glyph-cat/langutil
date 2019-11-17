import React from 'react'
import { withLang } from 'langutil/react-additions'
import DocDisplay from '~fragments/DocDisplay'
import { SectionContext } from '~context'
import { getDocs } from '~modules'
import { useScrollToSection } from '~custom-hooks'

function DocContentScreen({ match: { params: { version, subId } } }) {
  useScrollToSection(subId)
  const sections = getDocs()[version]
  return (
    <SectionContext.Provider value={{ sections }}>
      <DocDisplay sections={sections} />
    </SectionContext.Provider>
  )
}

export default withLang(DocContentScreen)
