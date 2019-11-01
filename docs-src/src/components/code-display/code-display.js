import React from 'react'
import PropTypes from 'prop-types'
import { localize } from 'langutil'
import CopyButton from './copy-button'
import copy from 'copy-to-clipboard'
import { HashFactory } from '../../classes'

let idTracker = new HashFactory()

/**
 * @augments{React.Component<{}>}
 */
class CodeDisplay extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    startLineFrom: PropTypes.number,
    mode: PropTypes.oneOf(['none', 'line', 'all'])
  }

  constructor() {
    super()
    this.componentId = idTracker.createHash(6)
    this.state = {
      copied: false
    }
  }

  modStyles = {
    '+': { backgroundColor: '#44553366', color: '#AAFFAA' },
    '-': { backgroundColor: '#44000066', color: '#FFAAAA' },
    '*': { backgroundColor: '#FFFFFF0F', color: '#00000000' },
  }

  componentWillUnmount() {
    idTracker.unregisterHash(this.componentId)
    clearTimeout(this.timeoutRef)
  }

  extractCode = () => {
    try {
      const { children } = this.props
      let childrenToUse = Array.isArray(children) ? children : [children]
      let output = ''
      for (let i = 0; i < childrenToUse.length; i++) {
        const id = `code-content-${this.componentId}-${i}`
        const extracted = document.getElementById(id).innerText
        output += extracted === ' ' ? '' : extracted
        if (extracted !== '\n') { output += '\n' }
      }
      return output
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  handleCopy = () => {
    const codeToCopy = this.extractCode()
    // console.log('codeToCopy:'); console.log(codeToCopy)
    try {
      copy(codeToCopy)
      this.showCopied()
    } catch (e) {
      window.alert(localize('FAIL_COPY_DESC'))
    }
  }

  showCopied = () => {
    this.setState({ copied: true })
    this.timeoutRef = setTimeout(() => {
      this.setState({ copied: false })
    }, 1500)
  }

  render() {
    const { title, children = [], startLineFrom = 1, mode = 'all' } = this.props
    let modArray = [], lineArray = [], codeArray = [], padArray = []

    // Ensure children is always array
    const _children = Array.isArray(children) ? children : [children]

    for (let i = 0; i < _children.length; i++) {

      // conditional checking for line skipping
      const modType = _children[i].type.mod
      const { backgroundColor, color } = this.modStyles[modType] || {}

      if (mode === 'all') {
        modArray.push(
          <div key={`mod${i}`}
            className='code-disp-content-each-line'
            style={{
              color: ['+', '-'].includes(modType) ? color : 'transparent',
              backgroundColor,
              paddingInlineStart: 20,
            }}
            children={modType || '•'}
          />
        )
      }

      if (['all', 'line'].includes(mode)) {
        lineArray.push(
          <div
            key={`line${i}`}
            className='code-disp-content-each-line'
            style={{
              backgroundColor,
              paddingInlineStart: 20,
              paddingInlineEnd: 20,
            }}
          >
            {i + startLineFrom}
          </div>
        )
      }

      codeArray.push(
        <div
          key={`code${i}`}
          id={`code-content-${this.componentId}-${i}`}
          className='code-disp-content-each-line code-disp-content-code-actual'
          style={{ backgroundColor }}
        >
          {_children[i]}
        </div>
      )

      padArray.push(
        <div
          key={`pad${i}`}
          style={{ color: 'transparent', backgroundColor }}
          className='code-disp-content-each-line'
          children={' '}
        />
      )

    }

    const { copied } = this.state

    return (
      <div className='code-disp-container'>
        <div className='code-disp-toolbar-container'>
          <p className='code-disp-title' children={title} />
          <CopyButton onClick={this.handleCopy} copied={copied} />
        </div>
        <div className='code-disp-content-container'>

          {/* Modified indicator */}
          <div className='code-disp-content-mod-container'>
            <pre className='code-disp-pre' children={modArray} />
          </div>

          {/* Line number */}
          <div className='code-disp-content-line-container'>
            <pre className='code-disp-pre' children={lineArray} />
          </div>

          {/* Actual code */}
          <div className='code-disp-content-code-container'>
            <pre className='code-disp-pre code'>
              {codeArray}
            </pre>
          </div>

          {/* Ending padding */}
          <div>
            <pre className='code-disp-pre' children={padArray} />
          </div>

        </div>
      </div>
    )
  }

}

export default CodeDisplay
