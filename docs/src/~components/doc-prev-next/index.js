import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize, getCurrentLanguage } from 'langutil'
import { PATHS } from '~constants'
import { scrollToTop } from '~modules'
import { SectionContext } from '~context'
import './index.css'

class DocPrevNext extends React.Component {

  static contextType = SectionContext

  lang = getCurrentLanguage()
  sectionIndices = []
  flatSections = null

  prepareFlattenedSections = () => {
    if (this.lang !== getCurrentLanguage() || !this.flatSections) {
      const { sections } = this.context
      let flattened = [], indices = []
      for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < sections[i].data.length; j++) {
          flattened.push(sections[i].data[j])
          indices.push(sections[i].data[j].to)
        }
      }
      this.lang = getCurrentLanguage()
      this.flatSections = flattened
      this.sectionIndices = indices
    }
    // console.log('this.flatSections:', this.flatSections)
    return this.flatSections
  }

  render() {
    const { match: { params: { version, section, id } } } = this.props
    this.prepareFlattenedSections()
    const getIndexOfIdInIndices = (version, section, id, indices) => {
      // console.log({ version, section, id, indices })
      for (let i = 0; i < indices.length; i++) {
        // console.log(`${version}/${section}/${id}`, indices[i])
        if (`${version}/${section}/${id}` === indices[i]) { return i }
      }
      return -1
    }
    const indexOfInSections = getIndexOfIdInIndices(version, section, id, this.sectionIndices)
    // console.log('indexOfInSections:', indexOfInSections)

    let prev, next
    if (this.flatSections[indexOfInSections - 1]) {
      prev = this.flatSections[indexOfInSections - 1]
    }
    if (this.flatSections[indexOfInSections + 1]) {
      next = this.flatSections[indexOfInSections + 1]
    }
    // console.log('prevItem:', prev)
    // console.log('nextItem:', next)

    return (
      <div className='doc-prev-next-container'>
        {prev ?
          <Link
            className='doc-prev-next-link'
            to={`${PATHS.docs}/${prev.to}`}
            onClick={scrollToTop}
            children={localize('DOC_PREV_PARAM', [prev.text])}
          />
          :
          <div />
        }
        <div />
        {next ?
          <Link
            className='doc-prev-next-link'
            to={`${PATHS.docs}/${next.to}`}
            onClick={scrollToTop}
            children={localize('DOC_NEXT_PARAM', [next.text])}
          />
          :
          <div />
        }
      </div>
    )
  }

}

export default withRouter(DocPrevNext)
