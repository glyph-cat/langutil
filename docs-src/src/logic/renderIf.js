import PropTypes from 'prop-types'

/**
 * @description Renders the children if `condition` evaluates to `true`.
 * @param {object} props
 * @param {boolean} props.condition The condition to evaluate
 * @param {any} props.children The content to render
 */
export default function RenderIf({ condition, children }) {
    return condition ? children : null
}

RenderIf.propTypes = {
    condition: PropTypes.bool.isRequired,
    children: PropTypes.any,
}