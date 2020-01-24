import React from 'react'
import PropTypes from 'prop-types'
import { localize } from 'langutil'
import useTheme from '~hooks/useTheme'
import './index.css'

function DeprecationWarning({ sinceVersion, removeDate, message }) {
  const alreadyRemoved = removeDate - new Date() <= 0
  const { type } = useTheme()
  const isLight = type === 'light'
  return (
    <div
      className='deprecated-warning-container'
      style={{
        backgroundColor: isLight ? '#eeddcc' : '#332211',
        border: `solid 1px ${isLight ? '#aa8800' : '#884400'}`,
      }}>
      <div className='deprecated-warning-title-container'>
        <i
          className='material-icons deprecated-warning-icon'
          children='warning'
          style={{ color: '#cc6600' }}
        />
        <div
          className='deprecated-warning-title-div'
          style={{ color: '#cc6600' }}
        >
          <span children={localize('DEPRECATED', null, 'upperCase')} />
          <span children={localize({
            keyword: alreadyRemoved ? 'DEPRE_REMOVED_SINCE_VERSION' : 'DEPRE_TO_BE_REMOVED_BY_DATE',
            param: alreadyRemoved ?
              { ver: sinceVersion }
              :
              {
                date: localize({
                  keyword: 'MONTH_YEAR',
                  param: {
                    month: localize(`MONTH_${removeDate.getMonth()}`),
                    year: removeDate.getFullYear()
                  }
                })
              }
          })} />
        </div>
      </div>
      <div className='deprecated-warning-content-container'>
        <p
          className='deprecated-warning-content'
          children={message}
          style={{
            color: isLight ? '#774422' : '#CC9977',
          }}
        />
      </div>
    </div>
  )
}

DeprecationWarning.propTypes = {
  sinceVersion: PropTypes.string,
  removeDate: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default DeprecationWarning
