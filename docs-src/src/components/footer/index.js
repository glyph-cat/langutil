import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '../../components/document'
import { bridge } from '../../modules'
import { VALUES } from '../../constants'
import './index.css'

class Footer extends React.Component {

  state = {
    reachedBottom: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkScreenReachedBottom)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScreenReachedBottom)
  }

  checkScreenReachedBottom = debounce(() => {
    // Control whether footer should stay fixed or absolute while scrolling
    const posY = window.innerHeight + window.scrollY - VALUES.footerHeight
    const distanceUntilScreenBottom = document.body.offsetHeight - posY
    const reachedBottom = distanceUntilScreenBottom <= 0
    if (this.state.reachedBottom !== reachedBottom) {
      this.setState({ reachedBottom })
    }

    // Control whether padding should be added to doc-sidebar
    // In case footer is blocking it while reaching bottom of screen
    const footerHeightInView = Math.max(0, VALUES.footerHeight - distanceUntilScreenBottom)
    const onChangeFooterHeightInView = bridge.getItem('onChangeFooterHeightInView')
    if (typeof onChangeFooterHeightInView === 'function') {
      onChangeFooterHeightInView(footerHeightInView)
    }
  })

  render() {
    const { reachedBottom } = this.state

    return (
      <>
        {reachedBottom ?
          <div className='footer-container' style={{ height: VALUES.footerHeight, opacity: 0 }} />
          :
          null
        }
        <footer
          className='footer-container'
          style={{
            bottom: reachedBottom ? 0 : '',
            height: VALUES.footerHeight,
            position: reachedBottom ? 'fixed' : 'absolute',
          }}
        >
          <Link
            to='/docs/v2/advanced/alternative-syntax'
            style={{ backgroundColor: '#FFFFFF', margin: '2em' }}
            children='Go to V2 (testing)'
          />
          <Body
            className=''
            style={{
              marginTop: 250,
              fontSize: '0.85em',
              textAlign: 'center',
            }}
            children={localize('FOOTER_COPYRIGHT', [new Date().getFullYear()])}
          />
        </footer>
      </>
    )
  }

}

export default withLang(Footer)
