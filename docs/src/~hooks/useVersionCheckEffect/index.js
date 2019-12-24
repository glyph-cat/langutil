import { useEffect, useRef } from 'react'
import { STRINGS } from '~constants'
import axios from 'axios'

function useVersionCheckEffect(updateWithValue) {
  let inited = useRef(false)
  const _axiosCancelToken = useRef(axios.CancelToken.source())

  function doAxiosThing() {
    const isProduction = process.env.NODE_ENV === 'production'
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'
    const url = isProduction ? '' : corsProxy + 'https://registry.npmjs.org/langutil'
    const config = {
      cancelToken: _axiosCancelToken.current.token,
    }
    axios.get(url, config).then(({ data }) => {
      const { 'dist-tags': { latest } } = data
      updateWithValue(latest)
      // console.log({ latest })
    }).catch((e) => {
      console.log('Unable to check for latest version of langutil\n', e)
      updateWithValue(STRINGS.labelFailed)
    })
  }

  useEffect(() => {
    if (inited.current) { return }
    const axiosCancelToken = _axiosCancelToken.current
    doAxiosThing()
    return () => {
      inited.current = true
      axiosCancelToken.cancel()
    }
    // eslint-disable-next-line
  }, [])
}

export default useVersionCheckEffect
