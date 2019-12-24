import React from 'react'
import PropTypes from 'prop-types'
import useTheme from '~hooks/useTheme'
import './index.css'

function DocInfoBox({ message }) {
  const { type, palette: { primary } } = useTheme()
  return (
    <div
      className='doc-infobox-container'
      style={{
        backgroundColor: primary.light,
        border: `solid 1px ${primary.main}`,
      }}
    >
      <i
        className='material-icons doc-infobox-icon'
        children='info'
        style={{
          color: type === 'light' ? '#0066cc' : '#3399ff',
        }}
      />
      <p
        className='doc-infobox-content'
        children={message}
        style={{
          color: type === 'light' ? '#224477' : '#7799cc',
        }}
      />
    </div>
  )
}

DocInfoBox.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default DocInfoBox
