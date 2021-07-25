import { LangutilEvent } from '../../schema'

export function componentShouldUpdateFrom<D>(event: LangutilEvent<D>): boolean {
  const { oldLangState, newLangState } = event.data
  const autoConfigsChanged = oldLangState.isAuto !== newLangState.isAuto
  const languagesChanged = oldLangState.language !== newLangState.language
  return autoConfigsChanged && languagesChanged
}
