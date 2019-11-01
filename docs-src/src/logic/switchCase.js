import PropTypes from 'prop-types'
const DEBUG = process.env.NODE_ENV !== 'production'

/**
 * @description JSX wrapper for switch-case statement
 */
export function Switch({ value, children }) {
    if (!Array.isArray(children)) { children = [children] }

    const lastChildIsDefault = children[children.length - 1].type.selectType === 'Default'
    const loopLength = lastChildIsDefault ? children.length - 1 : children.length

    if (DEBUG) { var caseImplemented = false, defaultImplemented = false }

    let renderIndex = -1
    for (let i = 0; i < loopLength; i++) {

        const { type: { selectType } } = children[i]

        if (DEBUG) {
            if (selectType === 'Default') {
                if (defaultImplemented) {
                    console.error('<Default/> should only appear once as the last child.')
                }
                defaultImplemented = true
            } else if (selectType !== 'Case') {
                console.error(`Expected children to be a <Case/> but got <${selectType}/> instead.`)
            }
        }

        if (selectType === 'Case') {
            caseImplemented = true
            if (value === children[i].props.value) {
                // So that when DEBUG === true, renderIndex is not overwritten by other values
                if (renderIndex < 0) { renderIndex = i }
                // Continue to loop during debug to catch for possible errors
                if (!DEBUG) { break }
            }
        }

    }

    if (DEBUG && !caseImplemented) {
        console.error(`There should be at least one <Case/> inside a <Switch/> tag.`)
    }

    if (renderIndex < 0) {
        return lastChildIsDefault ? children[children.length - 1].props.children : null
    } else {
        return children[renderIndex].props.children
    }

}

const basePropTypes = {
    value: PropTypes.any.isRequired,
    children: PropTypes.any,
}

Switch.propTypes = basePropTypes

export function Case({ value, children }) { }
Case.propTypes = basePropTypes
Case.selectType = 'Case'

export function Default({ children }) { }
Default.propTypes = { children: PropTypes.any }
Default.selectType = 'Default'

