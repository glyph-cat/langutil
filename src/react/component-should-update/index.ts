import { LangutilEvent } from '../../schema'

export function componentShouldUpdateFrom<D>(event: LangutilEvent<D>): boolean {
  const { previous, current } = event.data.state
  const autoConfigsChanged = previous.isAuto !== current.isAuto
  const languagesChanged = previous.language !== current.language
  return autoConfigsChanged || languagesChanged
}
