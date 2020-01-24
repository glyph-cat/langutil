import { useLayoutEffect } from 'react'

const DEFAULT_TITLE = 'langutil'
const DEFAULT_DESC = 'Localization for JavaScript made simple'

function AppendMeta({ title, desc }) {
  useEffectTitle(title)
  useEffectDesc(desc)
  return null
}

export default AppendMeta

function useEffectTitle(title) {
  useLayoutEffect(() => {
    const _title = DEFAULT_TITLE + (typeof title === 'string' ? ` | ${title}` : '')
    try {
      document.title = _title
      document.getElementsByTagName('meta')['og:title'].content = _title
    } catch (e) { }
  }, [title])
}

function useEffectDesc(desc = DEFAULT_DESC) {
  useLayoutEffect(() => {
    try {
      document.getElementsByTagName('meta')['description'].content = desc
      document.getElementsByTagName('meta')['og:description'].content = desc
    } catch (e) { }
  }, [desc])
}
