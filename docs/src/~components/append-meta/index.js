import { useLayoutEffect } from 'react'

const DEFAULT_TITLE = 'langutil'
const DEFAULT_DESC = 'Localization for JavaScript made simple'

let memory = {
  title: DEFAULT_TITLE,
  desc: DEFAULT_TITLE,
}

function AppendMeta({ title, desc }) {

  useEffectTitle(title)

  useLayoutEffect(() => {

    // Append metadata
    document.getElementsByTagName('meta')['description'].content = DEFAULT_DESC

    // let meta = document.getElementsByTagName('meta')
    // for (let m of meta) {
    //   if (m.name === 'description') {
    //     m.content = 'Localization for JavaScript made simple'
    //   }
    //   // console.log('m.name:', m.name)
    //   // TODO: og-description
    // }

    return () => {
      // Remove metadata
      // ...
    }
  })
  return null
}

export default AppendMeta


function useEffectTitle(title) {
  // Titles
  useLayoutEffect(() => {
    if (memory.title !== title) {
      const _title = DEFAULT_TITLE + (typeof title === 'string' ? ` | ${title}` : '')
      document.title = _title
      document.getElementsByTagName('meta')['og:title'].content = _title
    }
    // return () => {
    //   document.title = DEFAULT_TITLE
    //   // TODO: og-title
    // }
  })
}
