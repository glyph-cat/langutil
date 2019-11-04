import PropTypes from 'prop-types'
const DEBUG = process.env.NODE_ENV !== 'production'

/**
 * @description JSX wrapper for if-else statement
 */
export function ConditionalRender({ children }) {

    // Convert children to array if it is not already one
    if (!Array.isArray(children)) { children = [children] }

    const lastChildIsElse = children[children.length - 1].type.selectType === 'Else'
    const loopLength = lastChildIsElse ? children.length - 1 : children.length

    if (DEBUG) { var ifImplemented = false, elseImplemented = false }

    let renderIndex = -1
    for (let i = 0; i < loopLength; i++) {
        const { type: { selectType } } = children[i]
        if (DEBUG) {
            if (selectType === 'If') {
                if (ifImplemented) {
                    console.error('<If/> should only appear once as the first child.')
                }
                ifImplemented = true
            } else if (selectType === 'Else') {
                if (elseImplemented) {
                    console.error('<Else/> should only appear once as the last child.')
                }
                elseImplemented = true
            }
            if (i === 0 && selectType !== 'If') {
                console.error(`Expected first children of ConditionRender to be <If/> but got <${selectType}/> instead.`)
            } else if (i > 0 && i < loopLength && selectType !== 'ElseIf') {
                if (selectType === 'Else') {
                    console.error(`<Else/> should only appear once as the last child.`)
                } else {
                    console.error(`Expected subsequent children of ConditionRender to be <ElseIf/> but got <${selectType}/> instead.`)
                }
            }
        }

        const tagIsValid = ['If', 'ElseIf', 'Else'].includes(selectType)
        if (tagIsValid && children[i].props.condition === true) {
            // So that when DEBUG === true, renderIndex is not overwritten by other values
            if (renderIndex < 0) { renderIndex = i }
            // Continue to loop during debug to catch for possible errors
            if (!DEBUG) { break }
        }
    }

    if (renderIndex < 0) {
        return lastChildIsElse ? children[children.length - 1].props.children : null
    } else {
        return children[renderIndex].props.children
    }

}

const childrenBasePropTypes = {
    condition: PropTypes.bool.isRequired,
    children: PropTypes.any
}

export function If({ condition, children }) { }
If.propTypes = childrenBasePropTypes
If.selectType = 'If'

export function ElseIf({ condition, children }) { }
ElseIf.propTypes = childrenBasePropTypes
ElseIf.selectType = 'ElseIf'

export function Else() { }
Else.propTypes = { children: PropTypes.any }
Else.selectType = 'Else'
