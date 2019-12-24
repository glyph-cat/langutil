import { useEffect } from 'react'
import { useMediaQuery } from '@material-ui/core'

function MediaQuery({ query, onChange }) {
  const value = useMediaQuery(query)
  useEffect(() => { onChange(value) }, [onChange, value])
  return null
}

export default MediaQuery