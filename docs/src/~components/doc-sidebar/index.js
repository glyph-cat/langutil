import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { localize } from 'langutil'
// import MiniTabber from '~blocks/mini-tabber' // TODO: For when V4 arrives
import AppendMeta from '~components/append-meta'
import { PATHS, VALUES } from '~constants'
import { scrollToTop } from '~modules'
import { bridge } from '~modules'
import withTheme from '~hocs/withTheme'
import isSidebarPathMatched from './isSidebarPathMatched'
import './index.css'

class DocSidebar extends React.Component {

  constructor() {
    super()
    this.currentTitle = ''
    this.state = {
      footerHeightInView: 0
    }
  }

  componentDidMount() {
    // FHIV = FooterHeightInView
    bridge.setItem({
      onChangeFHIV_sidebar: this.onChangeFHIV_sidebar
    })
  }

  componentWillUnmount() {
    bridge.removeItem('onChangeFHIV_sidebar')
  }

  onChangeFHIV_sidebar = (height) => {
    this.setState({
      footerHeightInView: height,
    })
  }

  render() {
    const { footerHeightInView } = this.state
    const {
      sections = [], location: { pathname },
      theme: { palette: { primary, secondary, misc } },
      width, // `width` defaults to undefined and undefined will the paddingHorizontal 0 as well
      bottomInset = 0, onNavChange,
      // version, onChangeVersion, // TODO: For when V4 arrives
    } = this.props
    let toRender = []
    for (let i = 0; i < sections.length; i++) {
      const { title, data } = sections[i]
      let topicArray = []
      for (let j = 0; j < data.length; j++) {
        const { to, text } = data[j]
        const _to = `${PATHS.docs}/${to}`
        const pathMatched = isSidebarPathMatched(pathname, _to)
        if (pathMatched === true && text) {
          this.currentTitle = text
        }
        topicArray.push(
          <Link key={_to} to={_to} onClick={() => { onNavChange(); scrollToTop() }}
            className='doc-sidebar-link'
            style={{
              color: pathMatched ? misc.docSidebarPathMatch : '',
              fontWeight: pathMatched ? 'bold' : '',
            }}
          >
            <span children='•' style={{ opacity: pathMatched ? 1 : 0 }} />
            <span children={text} />
          </Link>
        )
      }
      toRender.push(<p
        key={title}
        className='doc-sidebar-sectionTitle'
        children={title.toUpperCase()}
        style={{ color: `${misc.docSideBarTitle}77` }}
      />)
      toRender.push(...topicArray)
      // if (i < sections.length - 1) { toRender.push(<br key={`br-${title}`} />) }
      toRender.push(<br key={`br-${title}`} />)
    }

    const sideBarWidth = width ? width : 0
    const paddingHorizontal = width ? VALUES.docsidebarContainerPadding : 0

    return (
      <>
        <AppendMeta title={localize('DOCS_COLON', [this.currentTitle])} />
        <div
          className='docsidebar-container'
          style={{
            padding: VALUES.docsidebarContainerPadding,
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
            position: 'relative',
            top: 0,
            width: sideBarWidth,
          }}
        />
        <nav
          className='docsidebar-container'
          style={{
            backgroundImage: `linear-gradient(${primary.light} 0%, ${secondary.light} 200%)`,
            padding: VALUES.docsidebarContainerPadding,
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
            width: sideBarWidth,
          }}
        >
          {/* So that FAB won't block the content */}
          <div className='docsidebar-subcontainer'>
            {/* TODO: For when V4 arrives */}
            {/* <div className='docsidebar-mini-tabber-container'>
              <MiniTabber
                value={version}
                data={[
                  { text: 'v3', value: 'v3' },
                  { text: 'v4', value: 'v4' },
                ]}
                onChange={onChangeVersion}
              />
            </div> */}
            {toRender}
            <div style={{ height: bottomInset, width: '100%' }} />
          </div>
          <div
            style={{
              display: 'grid',
              height: VALUES.navbarHeight + VALUES.docsidebarContainerPadding * 2 + footerHeightInView,
            }}
          />
        </nav>
      </>
    )
  }

}

export default withTheme(withRouter(DocSidebar))
