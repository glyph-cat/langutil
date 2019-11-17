import { createElement } from 'react'
const withProps = props => Comp => createElement(Comp, props)
export default withProps
