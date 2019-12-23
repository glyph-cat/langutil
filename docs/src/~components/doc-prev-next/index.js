import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize, getCurrentLanguage } from 'langutil'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { PATHS } from '~constants'
import { scrollToTop } from '~modules'
import SectionContext from '~contexts/SectionContext'
import './index.css'

function MediaQuery({ onChange }) {
  const isCompact = useMediaQuery('(max-height: 600px), (max-width: 800px)')
  useEffect(() => {
    onChange(isCompact)
  }, [onChange, isCompact])
  return null
}

class DocPrevNext extends React.Component {

  static contextType = SectionContext

  state = { isCompact: false }
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

  handleWidthChange = (isCompact) => {
    this.setState({ isCompact })
  }

  render() {
    const { position, match: { params: { version, section, id } } } = this.props
    this.prepareFlattenedSections()
    const indexOfInSections = getIndexOfIdInIndices(version, section, id, this.sectionIndices)
    const { isCompact } = this.state

    let prev, next
    if (this.flatSections[indexOfInSections - 1]) {
      if (!(position === 'bottom' && isCompact)) {
        prev = this.flatSections[indexOfInSections - 1]
      }
    }
    if (this.flatSections[indexOfInSections + 1]) {
      if (!(position === 'top' && isCompact)) {
        next = this.flatSections[indexOfInSections + 1]
      }
    }

    return (
      <>
        <MediaQuery onChange={this.handleWidthChange} />
        <div className='doc-prev-next-container'>
          {prev ?
            <Link
              className='doc-prev-next-link'
              to={`${PATHS.docs}/${prev.to}`}
              onClick={scrollToTop}
              children={localize('DOC_PREV_PARAM', [smartTrim(prev.text)])}
              title={prev.text}
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
              children={localize('DOC_NEXT_PARAM', [smartTrim(next.text)])}
              title={next.text}
            />
            :
            <div />
          }
        </div>
      </>
    )
  }

}

export default withRouter(DocPrevNext)

function getIndexOfIdInIndices(version, section, id, indices) {
  for (let i = 0; i < indices.length; i++) {
    if (`${version}/${section}/${id}` === indices[i]) { return i }
  }
  return -1
}

/**
 * @description Trims a string by word if it's too long.
 * Expect 'The quick brown fox' to be 'The quick brown...' instead of 'The quick brown f...'
 * @param {string} text
 * @returns {string}
 */
function smartTrim(text) {
  let trimmed = text.substr(0, 30)
  if (trimmed.length < text.length) {
    trimmed = trimmed.replace(/\s\S+$/, '') + '...'
  }
  return trimmed
}
