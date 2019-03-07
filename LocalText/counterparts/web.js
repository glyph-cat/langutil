import React from 'react'
import PropTypes from 'prop-types'
import langutil from 'langutil'

const Localizable = ({ children, paramArray, type, ...otherProps }) => {
    const localizedString = langutil.localize(children, paramArray)
    if (elementType) {
        return React.createElement(elementType, ...otherProps, localizedString)
    } else {
        return localizedString
    }
}

// Localizable.propTypes = {
//     children: PropTypes.oneOfType()
// }

export default Localizable