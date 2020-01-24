import React, { useState } from 'react'
import { withLang } from 'langutil/react-additions'
import DocDisplay from '~fragments/DocDisplay'
import SectionContext from '~contexts/SectionContext'
import { getDocs } from '~modules'
import useScrollToSection from '~hooks/useScrollToSection'

function DocContentScreen({ match: { params: { version: _version, subId } } }) {
  useScrollToSection(subId)

  const [version, setVersion] = useState(_version)
  const sections = getDocs()[version]

  return (
    <SectionContext.Provider value={{ sections }}>
      <DocDisplay
        sections={sections}
        version={version}
        onChangeVersion={setVersion}
      />
    </SectionContext.Provider>
  )
}

export default withLang(DocContentScreen)
