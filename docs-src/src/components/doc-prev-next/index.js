import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize, getCurrentLanguage } from 'langutil'
import { scrollToTop } from '../../modules'
import { SectionContext } from '../../context'
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
    return this.flatSections
  }

  render() {
    const { match: { params: { id } } } = this.props
    this.prepareFlattenedSections()
    // console.log(this.flatSections)
    const getIndexOfIdInIndices = (id, indices) => indices.indexOf(id)
    const indexOfInSections = getIndexOfIdInIndices(id, this.sectionIndices)
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
            to={prev.to}
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
            to={next.to}
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
