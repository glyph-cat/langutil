import React from 'react'

const withProps = props => Comp => {
  if (!Comp) { return '[withProps]' }
  return (
    <WithPropBoundary>
      <Comp {...props} />
    </WithPropBoundary>
  )
}

export default withProps

class WithPropBoundary extends React.Component {
  state = { error: this.props.children ? false : true }
  static getDerivedStateFromError = () => ({ error: true })
  render() { return this.state.error ? '[withProps]' : this.props.children }
}
