import { createElement } from 'react'
const asProps = props => Comp => createElement(Comp, props)
export default asProps
