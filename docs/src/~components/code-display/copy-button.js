import React from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@material-ui/core'
import { localize } from 'langutil'
import useTheme from '~hooks/useTheme'

function CopyButton({ onClick, copied }) {
  const { palette: { misc: { code } }, type } = useTheme()
  const isCompactWidth = useMediaQuery('(max-width: 800px)')
  return (
    <button
      className='code-disp-toolbar-button'
      onClick={onClick}
      style={{
        backgroundColor: copied ? 'transparent' : code.copyButtonBg,
        border: copied ? `solid 1px ${type === 'dark' ? '#00AA00' : '#008800'}` : '',
        color: code.copyButtonFg,
        height: isCompactWidth ? 32 : 'auto',
        paddingLeft: isCompactWidth ? '1em' : 0,
        paddingRight: isCompactWidth ? '1em' : 0,
      }}
    >
      <div
        className='code-disp-toolbar-button-div'
        style={{
          color: copied ? (type === 'dark' ? '#00CC00' : '#006600') : '',
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
