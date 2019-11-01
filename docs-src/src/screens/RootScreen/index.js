import React from 'react'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../constants'

function RootScreen() {
  return <Redirect to={PATHS.home} />
}

export default RootScreen
