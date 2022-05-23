import { useCallback, useDebugValue, useRef } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'
import { $$INTERNALS } from '../../constants'
import { SyncValue } from '../../internals/helper-types'
import { LangutilCore } from '../../main/core'
import { LangutilReactState } from '../schema'

/**
 * @internal
 */
const EMPTY_CACHED_SYNC_VALUE: SyncValue<any> = {
  [$$INTERNALS]: null
}

/**
 * @public
 */
export function useLangutil<D>(core: LangutilCore<D>): LangutilReactState<D> {
  const cachedSyncValue = useRef<SyncValue<LangutilReactState<D>>>(EMPTY_CACHED_SYNC_VALUE)
  const state = useSyncExternalStore(
    core.watch,
    useCallback(() => {
      const {
        isAuto: previousAuto,
        language: previousLanguage,
      } = cachedSyncValue.current[$$INTERNALS]
      const currentLangutilState = core.getLangutilState()
      const {
        isAuto: currentAuto,
        language: currentLanguage,
      } = currentLangutilState

      const shouldReturnCachedValue =
        previousAuto === currentAuto &&
        previousLanguage === currentLanguage

      if (shouldReturnCachedValue) {
        return cachedSyncValue.current
      } else {
        const nextSyncValue: LangutilReactState<D> = {
          ...core,
          ...currentLangutilState,
        }
        cachedSyncValue.current = nextSyncValue
        return nextSyncValue
      }
    }, [core])
  )
  useDebugValue(undefined, () => ({
    language: state.language,
    isAuto: state.isAuto,
  }))
  return state
}
