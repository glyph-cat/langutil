import { useCallback, useDebugValue, useRef } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'
import { $$INTERNALS } from '../../constants'
import { SyncValue } from '../../internals/helper-types'
import { LangutilCore } from '../../main-bundle'
import { LangutilReactState } from '../schema'

/**
 * @internal
 */
const EMPTY_CACHED_SYNC_VALUE: SyncValue<any> = {
  [$$INTERNALS]: null
}

/**
 * @public
 * @ReactBundle
 */
export function useLangutil<D>(core: LangutilCore<D>): LangutilReactState<D> {
  const cachedSyncValue = useRef<SyncValue<LangutilReactState<D>>>(EMPTY_CACHED_SYNC_VALUE)
  const syncState = useSyncExternalStore(
    core.watch,
    useCallback(() => {
      /**
       * It is `false` by default so that if it's first time the hook is
       * running, a new value will be created.
       */
      let shouldReturnCachedValue = false
      const currentLangutilState = core.getLangutilState()
      /**
       * If cached sync value is `null`, it means it's probably the first time
       * this hook is running and there is no "cached value" that we can return.
       */
      const isFirstTimeRunningHook = Object.is(cachedSyncValue.current[$$INTERNALS], null)
      if (!isFirstTimeRunningHook) {
        const {
          isAuto: previousAuto,
          language: previousLanguage,
        } = cachedSyncValue.current[$$INTERNALS]
        const {
          isAuto: currentAuto,
          language: currentLanguage,
        } = currentLangutilState
        shouldReturnCachedValue =
          previousAuto === currentAuto &&
          previousLanguage === currentLanguage
      }
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
  const state = syncState[$$INTERNALS]
  useDebugValue(undefined, () => ({
    language: state.language,
    isAuto: state.isAuto,
  }))
  return state
}
