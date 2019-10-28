import React from 'react'
import langutil, { AUTO_DETECT } from 'langutil'
import Navigator from './navigator'
import Loader from './components/loader'
import AppBoundary from './boundaries/AppBoundary'
import { ConditionalRender, If, Else } from './logic'
import dict from './localizations'

export default class App extends React.Component {

  constructor() {
    super()
    langutil.init(dict, 'en', AUTO_DETECT)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    return (
      <AppBoundary>
        <ConditionalRender>
          <If condition={this.state.loading}>
            <Loader />
          </If>
          <Else>
            <Navigator />
          </Else>
        </ConditionalRender>
      </AppBoundary>
    )
  }

}
