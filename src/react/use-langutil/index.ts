import { useCallback, useDebugValue, useRef } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'
import { $$INTERNALS, EMPTY_OBJECT } from '../../constants'
import { SyncValue } from '../../internals/helper-types'
import { LangutilCore } from '../../main-bundle'
import { LangutilReactState } from '../schema'

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const INITIAL_STATE_SYNC_VALUE: SyncValue<[number, any]> = {
  [$$INTERNALS]: [-1, EMPTY_OBJECT]
}

/**
 * @public
 * @ReactBundle
 */
export function useLangutil<D>(core: LangutilCore<D>): LangutilReactState<D> {
  type CachedValueSchema = [mutationCount: number, state: LangutilReactState<D>]
  const cachedSyncValue = useRef<SyncValue<CachedValueSchema>>(INITIAL_STATE_SYNC_VALUE)
  const syncState = useSyncExternalStore(
    core.watch,
    useCallback(() => {
      /**
       * It is `false` by default so that if it's first time the hook is
       * running, a new value will be created.
       */
      let shouldReturnCachedValue = false

      const currentLangutilState = core.getLangutilState()
      const currentDictionaryMutationCount = core.x()

      /**
       * If cached sync value is `null`, it means it's probably the first time
       * this hook is running and there is no "cached value" that we can return.
       */
      const isFirstTimeRunningHook = Object.is(cachedSyncValue.current[$$INTERNALS], null)
      if (!isFirstTimeRunningHook) {
        const [previousDictionaryMutationCount, {
          isAuto: previousAuto,
          language: previousLanguage,
        }] = cachedSyncValue.current[$$INTERNALS]
        const {
          isAuto: currentAuto,
          language: currentLanguage,
        } = currentLangutilState
        if (previousDictionaryMutationCount !== currentDictionaryMutationCount) {
          shouldReturnCachedValue = false
        } else {
          shouldReturnCachedValue =
            previousAuto === currentAuto &&
            previousLanguage === currentLanguage
        }
      }
      if (shouldReturnCachedValue) {
        return cachedSyncValue.current
      } else {
        const nextSyncValue: SyncValue<CachedValueSchema> = {
          [$$INTERNALS]: [
            currentDictionaryMutationCount,
            // KIV: TS will complain about missing properties with the syntax below
            // [$$INTERNALS]: {
            //   ...core,
            //   ...currentLangutilState,
            // }
            Object.assign({}, core, currentLangutilState),
          ]
        }
        cachedSyncValue.current = nextSyncValue
        return nextSyncValue
      }
    }, [core])
  )
  const state = syncState[$$INTERNALS][1]
  useDebugValue(undefined, () => ({
    language: state.language,
    isAuto: state.isAuto,
  }))
  return state
}
