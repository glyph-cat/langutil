import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
import { Body } from '~components/document'
import { EXT_LINKS, PATHS, VALUES } from '~constants'
import withTheme from '~hocs/withTheme'
import { bridge, scrollToTop } from '~modules'
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
    const FOOTER_HEIGHT = VALUES.DERIVED.footerHeight()

    // Control whether footer should stay fixed or absolute while scrolling
    const posY = window.innerHeight + window.scrollY - FOOTER_HEIGHT
    const distanceUntilScreenBottom = document.body.offsetHeight - posY
    const reachedBottom = distanceUntilScreenBottom <= 0
    if (this.state.reachedBottom !== reachedBottom) {
      this.setState({ reachedBottom })
    }

    // Control whether padding should be added to doc-sidebar and it's FAB
    // In case footer is blocking it while reaching bottom of screen
    const RAW_footerHeightInView = FOOTER_HEIGHT - distanceUntilScreenBottom
    const footerHeightInView = Math.min(Math.max(0, RAW_footerHeightInView), FOOTER_HEIGHT)
    const onChangeFHIV_sidebar = bridge.getItem('onChangeFHIV_sidebar')
    if (typeof onChangeFHIV_sidebar === 'function') {
      onChangeFHIV_sidebar(footerHeightInView)
    }
    const onChangeFHIV_fab = bridge.getItem('onChangeFHIV_fab')
    if (typeof onChangeFHIV_fab === 'function') {
      onChangeFHIV_fab(footerHeightInView)
    }
  })

  render() {
    const { reachedBottom } = this.state
    const { theme: { palette: { secondary } } } = this.props
    const FOOTER_HEIGHT = VALUES.DERIVED.footerHeight()

    return (
      <>
        {reachedBottom ?
          <div className='footer-elem' style={{ height: FOOTER_HEIGHT, opacity: 0 }} />
          :
          null
        }
        <footer
          className='footer-elem'
          style={{
            backgroundColor: secondary.dark,
            bottom: reachedBottom ? 0 : '',
            height: FOOTER_HEIGHT,
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
                  onClick={scrollToTop}
                />
                <Link
                  className='footer-links'
                  to={PATHS.changelog}
                  children={localize('CHANGELOG')}
                  onClick={scrollToTop}
                />
              </div>
              {/* <div
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
              </div> */}
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
                  href={EXT_LINKS.githubRepo}
                  children={localize('VIEW_ON_GITHUB')}
                />
                <a
                  className='footer-links'
                  href={EXT_LINKS.npmPage}
                  children={localize('VIEW_ON_NPM')}
                />
              </div>
            </div>

            <div className='footer-lower-container'>
              <Body
                className='footer-copyright-text'
                children={localize({
                  keyword: 'FOOTER_COPYRIGHT_YEAR_NAME',
                  param: {
                    name: 'chin98edwin',
                    year: new Date().getFullYear(),
                  }
                })}
              />
            </div>

          </div>
        </footer>
      </>
    )
  }

}

export default withTheme(withLang(Footer))
