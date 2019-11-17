import { useLayoutEffect } from 'react'
import { formatDomId, scrollToViewById } from '~modules'

/**
 * @description Scroll to a section within the document
 * @param {string} subId ID of the header DOM element
 */
function useScrollToSection(subId) {
  // Scroll to sub section if specified in URL
  useLayoutEffect(() => {
    if (typeof subId === 'string') { scrollToViewById(formatDomId(subId)) }
  }, [subId])
}

export default useScrollToSection
