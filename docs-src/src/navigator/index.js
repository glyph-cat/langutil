import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Loader from '../components/loader'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { PATHS } from '../constants'

const Navigator = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={PATHS.root} component={RootScreen} />
          <Route path={PATHS.home} component={HomeScreen} />
          <Route path={`${PATHS.docs}/:id`} component={DocScreen} />
          <Route path={PATHS.docs} component={DocScreen} />
          {/* <Route path={PATHS.changelog} component={ChangelogScreen} /> */}
          {/* <Route path={PATHS.builder} component={BuilderScreen} /> */}
          <Route path={PATHS.root} component={RootScreen} />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  )
}

export default Navigator

const RootScreen = lazy(() => import('../screens/RootScreen'))
const HomeScreen = lazy(() => import('../screens/HomeScreen'))
const DocScreen = lazy(() => import('../screens/DocScreen'))
// const BuilderScreen = lazy(() => import('../screens/BuilderScreen'))
// const ChangelogScreen = lazy(() => import('../screens/ChangelogScreen'))
