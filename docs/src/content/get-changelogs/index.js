const getChangelogs = () => {
  return [
    require('./v3').default(),
    require('./v2').default(),
    require('./v1').default(),
  ]
}

export default getChangelogs
