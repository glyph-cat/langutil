import React from 'react'
import './index.css'

class ModalBase extends React.Component {

  render() {
    return (
      <div className='modal-underlay'>
        <div
          className='modal-container'
          children={this.props.children}
        />
      </div>
    )
  }

}

export default class Modal extends React.Component {

  state = { show: false }

  static getDerivedStateFromProps = (newProps) => {
    return { show: newProps.show }
  }

  triggerOpen = () => { }

  triggerClose = () => { }

  onExpand = () => {
    // ...
  }

  onDidClose = () => {
    this.setState({ show: false })
  }

  render() {
    if (this.state.show) {
      return (
        <ModalBase onExpand={this.onExpand} onDidClose={this.onDidClose}>
          {this.props.children}
        </ModalBase>
      )
    } else {
      return null
    }
  }

}
