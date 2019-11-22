import React from 'react'
import { localize } from 'langutil'
import { withLang } from 'langutil/react-additions'
// import './index.css'

class DocContentBoundary extends React.Component {

  state = { error: false }

  static getDerivedStatefromError = () => ({ error: true })

  errorComponent = () => {
    return localize('DOC_NOT_FOUND')
    // <div className='app-boundary-container'>
    //   <p className='app-boundary-text' children={localize('APP_BOUNDARY_ERROR_OCCURED')} />
    // </div>
  }

  render() { return this.state.error ? <this.errorComponent /> : this.props.children }

}

export default withLang(DocContentBoundary)
