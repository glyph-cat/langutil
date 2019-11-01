import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '../../components/document'
import { bridge } from '../../modules'
import { PATHS, VALUES, STRINGS } from '../../constants'
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
          <div className='footer-elem' style={{ height: VALUES.footerHeight, opacity: 0 }} />
          :
          null
        }
        <footer
          className='footer-elem'
          style={{
            bottom: reachedBottom ? 0 : '',
            height: VALUES.footerHeight,
            position: reachedBottom ? 'fixed' : 'absolute',
          }}
        >
          <div className='footer-container'>

            <div className='footer-upper-container'>
              <div
                className='footer-upper-column-container'
                style={{ gridTemplateRows: `repeat(${2}, auto) 1fr` }}
              >
                <p
                  className='footer-upper-column-title'
                  children={localize('QUICK_LINKS', null, 'upperCase')}
                />
                <Link
                  className='footer-links'
                  to={PATHS.docs}
                  children={localize('DOCUMENTATION')}
                />
                <Link
                  className='footer-links'
                  to={PATHS.changelog}
                  children={localize('CHANGELOG')}
                />
              </div>
              <div
                className='footer-upper-column-container'
                style={{ gridTemplateRows: `repeat(${2}, auto) 1fr` }}
              >
                <p
                  className='footer-upper-column-title'
                  children={localize('SWITCH_LANGUAGE', null, 'upperCase')}
                />
                <span
                  className='footer-links'
                  children='English (More coming soon)'
                />
              </div>
              <div
                className='footer-upper-column-container'
                style={{ gridTemplateRows: `repeat(${2}, auto) 1fr` }}
              >
                <p
                  className='footer-upper-column-title'
                  children={localize('EXTERNAL_LINKS', null, 'upperCase')}
                />
                <a
                  className='footer-links'
                  href={STRINGS.githubRepo}
                  children={localize('VIEW_ON_GITHUB')}
                />
                <a
                  className='footer-links'
                  href={STRINGS.npmPage}
                  children={localize('VIEW_ON_NPM')}
                />
              </div>
            </div>

            <div className='footer-lower-container'>
              <Body
                className='footer-copyright-text'
                children={localize('FOOTER_COPYRIGHT', [new Date().getFullYear()])}
              />
            </div>

          </div>
        </footer>
      </>
    )
  }

}

export default withLang(Footer)
