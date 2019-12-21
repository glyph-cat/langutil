import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

function DocInfoBox({ message }) {
  return (
    <div className='doc-infobox-container'>
      <i className='material-icons doc-infobox-icon' children='info' />
      <p className='doc-infobox-content' children={message} />
    </div>
  )
}

DocInfoBox.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default DocInfoBox
