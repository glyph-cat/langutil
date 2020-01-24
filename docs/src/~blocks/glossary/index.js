import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * @description Upon mouse hover, it shows a tooltip to explain the word. In compact screens, a popup is shown instead, containing the same content.
 */
function Glossary({ children, desc }) {
  const [showHint, setShowHint] = useState(false)
  return (
    <>
      {showHint &&
        <div
          className='glossary-desc-container'>
          <span
            className='glossary-desc-text'
            children={desc}
          />
        </div>
      }
      <span
        className='glossary-text'
        children={children}
        onMouseEnter={() => { setShowHint(true) }}
        onMouseLeave={() => { setShowHint(false) }}
      />
    </>
  )
}

Glossary.propTypes = {
  children: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
}

export default Glossary
