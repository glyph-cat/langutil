import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Loader from '~components/loader'
import Navbar from '~components/navbar'
import Footer from '~components/footer'
import { PATHS } from '~constants'

const Navigator = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Switch>

          <Route exact path={PATHS.root} component={RootScreen} />

          <Route path={PATHS.home} component={HomeScreen} />

          <Route path={`${PATHS.docs}/:version/:section/:id/:subId`} component={DocContentScreen} />
          <Route path={`${PATHS.docs}/:version/:section/:id`} component={DocContentScreen} />
          <Route path={`${PATHS.docs}/:version/:section`} component={DocSectionBrowserScreen} />
          <Route path={`${PATHS.docs}/:version`} component={DocVersionBrowserScreen} />
          <Route path={PATHS.docs} component={DocRootScreen} />

          <Route path={`${PATHS.changelog}/:subId`} component={ChangelogScreen} />
          <Route path={PATHS.changelog} component={ChangelogScreen} />

          {/* <Route path={PATHS.builder} component={BuilderScreen} /> */}

          {/* <Route path={`${PATHS.playground}/:version/:section/:id`} component={PlaygroundScreen} /> */}
          {/* <Route path={`${PATHS.playground}/:version/:section`} component={PlaygroundScreen} /> */}
          {/* <Route path={`${PATHS.playground}/:version`} component={PlaygroundScreen} /> */}
          {/* <Route path={PATHS.playground} component={PlaygroundScreen} /> */}

          <Route path={PATHS.root} component={RootScreen} />

        </Switch>
      </Suspense>
      <Footer />
    </Router>
  )
}

export default Navigator

const RootScreen = lazy(() => import('~screens/RootScreen'))
const HomeScreen = lazy(() => import('~screens/HomeScreen'))
const DocRootScreen = lazy(() => import('~screens/DocRootScreen'))
const DocVersionBrowserScreen = lazy(() => import('~screens/DocVersionBrowserScreen'))
const DocSectionBrowserScreen = lazy(() => import('~screens/DocSectionBrowserScreen'))
const DocContentScreen = lazy(() => import('~screens/DocContentScreen'))
const ChangelogScreen = lazy(() => import('~screens/ChangelogScreen'))
// const BuilderScreen = lazy(() => import('~screens/BuilderScreen'))
// const PlaygroundScreen = lazy(() => import('~screens/PlaygroundScreen'))
// const HomeScreen = lazy(async () => undefined) // For testing the loader
