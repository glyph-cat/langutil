import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { scrollToTop } from '~modules'
import { bridge } from '~modules'
import { PATHS, VALUES } from '~constants'
import './index.css'

class DocSidebar extends React.Component {

  state = {
    footerHeightInView: 0
  }

  componentDidMount() {
    bridge.setItem({
      onChangeFooterHeightInView: this.onChangeFooterHeightInView
    })
  }

  componentWillUnmount() {
    bridge.removeItem('onChangeFooterHeightInView')
  }

  onChangeFooterHeightInView = (height) => {
    this.setState({ footerHeightInView: Math.min(Math.max(0, height), VALUES.footerHeight) })
  }

  render() {
    const { footerHeightInView } = this.state
    const { sections = [], location: { pathname } } = this.props
    let toRender = []
    for (let i = 0; i < sections.length; i++) {
      const { title, data } = sections[i]
      let topicArray = []
      for (let j = 0; j < data.length; j++) {
        const { to, text } = data[j]
        const _to = `${PATHS.docs}/${to}`
        const pathMatched = pathname.includes(_to)
        topicArray.push(
          <Link key={_to} to={_to} onClick={scrollToTop}
            className='doc-sidebar-link'
            style={pathMatched ? {
              color: '#0099BB',
              fontWeight: 'bold',
            } : {}}
          >
            <span children='• ' style={{ opacity: pathMatched ? 1 : 0 }} />
            {text}
          </Link>
        )
      }
      toRender.push(<p key={title} className='doc-sidebar-sectionTitle' children={title.toUpperCase()} />)
      toRender.push(...topicArray)
      // if (i < sections.length - 1) { toRender.push(<br key={`br-${title}`} />) }
      toRender.push(<br key={`br-${title}`} />)
    }

    return (
      <>
        <div
          className='docsidebar-container'
          style={{
            padding: VALUES.docsidebarContainerPadding,
            position: 'relative',
            top: 0,
          }}
        />
        <nav
          className='docsidebar-container'
          style={{
            padding: VALUES.docsidebarContainerPadding
          }}
        >
          <div
            className='docsidebar-subcontainer'
            children={toRender}
          />
          <div
            style={{
              height: VALUES.navbarHeight + VALUES.docsidebarContainerPadding * 2 + footerHeightInView,
              display: 'grid'
            }}
          />
        </nav>
      </>
    )
  }

}

export default withRouter(DocSidebar)
