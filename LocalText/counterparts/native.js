import React from 'react'
import { Text } from 'react-native'
import langutil from 'langutil'
import PropTypes from 'prop-types'

const Localizable = ({ children, paramArray, ...otherProps }) => {
    // TODO: Type-checking (Acceptable children are string, element, array<element>)
    return <Text children={langutil.localize(children, paramArray)} {...otherProps}/>
}

Localizable.propTypes = {
    children: PropTypes.string.isRequired,
    paramArray: PropTypes.array,
    otherProps: PropTypes.any
}

export default Localizable