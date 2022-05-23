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
        const nextSyncValue: SyncValue<LangutilReactState<D>> = {
          [$$INTERNALS]: Object.assign({}, core, currentLangutilState),
          // KIV: TS will complain about missing properties with the syntax below
          // [$$INTERNALS]: {
          //   ...core,
          //   ...currentLangutilState,
          // }
        }
        // const nextSyncValue: LangutilReactState<D> = {
        //   // M$dictionary: core.M$dictionary,
        //   // M$isAuto: core.M$isAuto,
        //   // M$language: core.M$language,
        //   // M$watcher: core.M$watcher,
        //   // hydrate: core.hydrate,
        //   // setLanguage: core.setLanguage,
        //   // getLanguage: core.getLanguage,
        //   // getLangutilState: core.getLangutilState,
        //   // getAllLanguages: core.getAllLanguages,
        //   // getDictionary: core.getDictionary,
        //   // setDictionary: core.setDictionary,
        //   // appendDictionary: core.appendDictionary,
        //   // localize: core.localize,
        //   // localizeExplicitly: core.localizeExplicitly,
        //   // resolveLanguage: core.resolveLanguage,
        //   // safelyResolveLanguage: core.safelyResolveLanguage,
        //   // createIsomorphicLocalizer: core.createIsomorphicLocalizer,
        //   // cloneInitial: core.cloneInitial,
        //   // cloneCurrent: core.cloneCurrent,
        //   // watch: core.watch,
        //   ...core,
        //   ...currentLangutilState,
        // }
        // nextSyncValue.
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
