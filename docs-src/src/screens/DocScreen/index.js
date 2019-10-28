import React from 'react'
import { Redirect } from 'react-router-dom'
import { withLang } from 'langutil/react-additions'
import { PATHS } from '../../constants'
import DocDisplay from '../../fragments/DocDisplay'
import { SectionContext } from '../../context'
import getSections from './sections'

class DocScreen extends React.Component {

  constructor() {
    super()
    this.sectionIndices = this.getSectionIndices()
  }

  getSectionIndices = () => {
    let indices = []
    for (let section of getSections()) {
      for (let topic of section.data) {
        indices.push(topic.to)
      }
    }
    return indices
  }

  render() {
    const { pathname } = this.props.location
    // console.log('pathname:', pathname)
    const pathnameIsValid = this.sectionIndices.includes(pathname.replace(`${PATHS.docs}/`, ''))
    // console.log('pathnameIsValid:', pathnameIsValid)
    const sections = getSections()
    if (PATHS.docs === pathname || !pathnameIsValid) {
      return <Redirect to={`${PATHS.docs}/${sections[0].data[0].to}`} />
    } else {
      // console.log('sections:', sections)
      return (
        <SectionContext.Provider value={{ sections }}>
          <DocDisplay sections={sections} />
        </SectionContext.Provider>
      )
    }
  }

}

export default withLang(DocScreen)
