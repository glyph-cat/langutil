import React from 'react'
import PropTypes from 'prop-types'
import { localize } from 'langutil'
import './index.css'

function DeprecationWarning({ sinceVersion, removeDate, message }) {
  const alreadyRemoved = removeDate - new Date() <= 0
  return (
    <div className='deprecated-warning-container'>
      <div className='deprecated-warning-title-container'>
        <i className='material-icons deprecated-warning-icon' children='warning' />
        <div className='deprecated-warning-title-div'>
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
        <p className='deprecated-warning-content' children={message} />
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
