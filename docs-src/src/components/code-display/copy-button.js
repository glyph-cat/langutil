import React from 'react'
import PropTypes from 'prop-types'
import { localize } from 'langutil'

// TODO: If isMobile: Use styles below for the button
// height: 32pt;
// padding-left: 1em;
// padding-right: 1em;

function CopyButton({ onClick, copied }) {
  return (
    <button
    className='code-disp-toolbar-button'
    onClick={onClick}
    style={{
      backgroundColor: copied ? 'transparent' : '',
      border: copied ? 'solid 1px #00AA00' : '',
    }}
    >
      <div
        className='code-disp-toolbar-button-div'
        style={{
          color: copied ? '#00CC00' : '',
        }}
      >
        <i
          className='material-icons code-disp-toolbar-button-icon'
          children={copied ? 'done' : 'file_copy'}
        />
        {localize({ keyword: copied ? 'COPIED' : 'COPY', casing: 'upperCase' })}
      </div>
    </button>
  )
}

CopyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  copied: PropTypes.bool,
}

export default CopyButton
