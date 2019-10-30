import React from 'react'

class PlaygroundScreen extends React.Component {

  constructor(props) {
    super(props)
    console.log('this.props:', this.props)
  }

  render() {
    return (
      <div>
        PlaygroundScreen
      </div>
    )
  }

}

export default PlaygroundScreen
