import React from 'react'
// import { Redirect } from 'react-router-dom'
import { withLang } from 'langutil/react-additions'
// import { PATHS } from '../../constants'
import DocDisplay from '../../fragments/DocDisplay'
import { SectionContext } from '../../context'
import { getDocs } from '../../modules'

class DocContentScreen extends React.Component {

  sectionIndices = []

  componentDidMount() {
    this.sectionIndices = this.getSectionIndices()
  }

  getSectionIndices = () => {
    const { match: { params: { version } } } = this.props
    let indices = []
    for (let section of getDocs()[version]) {
      for (let topic of section.data) {
        indices.push(topic.to)
      }
    }
    return indices
  }

  render() {
    // const { match: { path, params: { version, section, id } } } = this.props
    // if (path === '')
    // '/docs/:version/:section/:id'
    // console.log(this.props)
    const { match: { params: { version } } } = this.props
    const sections = getDocs()[version]
    return (
      <SectionContext.Provider value={{ sections }}>
        <DocDisplay sections={sections} />
      </SectionContext.Provider>
    )
  }

}

export default withLang(DocContentScreen)
