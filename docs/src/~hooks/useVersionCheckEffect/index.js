import { useEffect, useRef } from 'react'
import { STRINGS } from '~constants'
import axios from 'axios'

function useVersionCheckEffect(updateWithValue) {
  let inited = useRef(false)
  const _axiosCancelToken = useRef(axios.CancelToken.source())
  useEffect(() => {
    if (inited.current) { return }
    const axiosCancelToken = _axiosCancelToken.current
    const isProduction = process.env.NODE_ENV === 'production'
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'
    const url = isProduction ? '' : corsProxy + 'https://registry.npmjs.org/langutil'
    const config = { cancelToken: axiosCancelToken.token }
    axios.get(url, config).then(({ data }) => {
      const { 'dist-tags': { latest } } = data
      updateWithValue(latest)
    }).catch((e) => {
      console.log('Unable to check for latest version of langutil\n', e)
      updateWithValue(STRINGS.labelFailed)
    })
    return () => {
      inited.current = true
      axiosCancelToken.cancel()
    }
  }, [updateWithValue])
}

export default useVersionCheckEffect
