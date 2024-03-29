import {
  createCleanupRef,
  createHookInterface,
} from '@glyph-cat/react-test-utils'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'
import { LangutilReactState } from '../../../src/react'

const cleanupRef = createCleanupRef()
afterEach((): void => { cleanupRef.run() })

wrapper(({
  Langutil: { LangutilCore },
  LangutilReact: { useLangutil },
  buildEnv,
}: IntegrationTestConfig): void => {

  const isNotProductionBuild = buildEnv !== 'prod'

  test('Make sure properties & methods are forwarded accordingly', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')

    const hookInterface = createHookInterface({
      useHook: () => useLangutil<typeof SAMPLE_DICTIONARY>(core),
      actions: {
        changeLangToId: ({ hookData: langutilState }) => {
          langutilState.setLanguage('id')
        },
      },
      values: {
        value: ({ hookData: langutilState }) => {
          return langutilState
        },
      },
    }, cleanupRef)

    const spiedLangutilState = hookInterface.get('value') as LangutilReactState<typeof SAMPLE_DICTIONARY>
    expect(spiedLangutilState.language).toBe('en')
    expect(spiedLangutilState.isAuto).toBe(false)
    if (isNotProductionBuild) {
      expect(spiedLangutilState.M$language).toStrictEqual('en')
      expect(spiedLangutilState.M$coreOptions).toStrictEqual({ auto: false })
      expect(Object.is(spiedLangutilState.M$dictionary, SAMPLE_DICTIONARY)).toBe(true)
      expect(Object.is(spiedLangutilState.M$watcher, core.M$watcher)).toBe(true)
    }
    expect(Object.is(spiedLangutilState.appendDictionary, core.appendDictionary)).toBe(true)
    expect(Object.is(spiedLangutilState.cloneCurrent, core.cloneCurrent)).toBe(true)
    expect(Object.is(spiedLangutilState.cloneInitial, core.cloneInitial)).toBe(true)
    expect(Object.is(
      spiedLangutilState.createIsomorphicLocalizer,
      core.createIsomorphicLocalizer
    )).toBe(true)
    expect(Object.is(spiedLangutilState.getAllLanguages, core.getAllLanguages)).toBe(true)
    expect(Object.is(spiedLangutilState.getDictionary, core.getDictionary)).toBe(true)
    expect(Object.is(spiedLangutilState.getLanguage, core.getLanguage)).toBe(true)
    expect(Object.is(spiedLangutilState.getLangutilState, core.getLangutilState)).toBe(true)
    expect(Object.is(spiedLangutilState.hydrate, core.hydrate)).toBe(true)
    expect(Object.is(spiedLangutilState.localize, core.localize)).toBe(true)
    expect(Object.is(spiedLangutilState.localizeExplicitly, core.localizeExplicitly)).toBe(true)
    expect(Object.is(spiedLangutilState.resolveLanguage, core.resolveLanguage)).toBe(true)
    expect(Object.is(spiedLangutilState.safelyResolveLanguage, core.safelyResolveLanguage)).toBe(true)
    expect(Object.is(spiedLangutilState.setDictionary, core.setDictionary)).toBe(true)
    expect(Object.is(spiedLangutilState.setLanguage, core.setLanguage)).toBe(true)
    expect(Object.is(spiedLangutilState.watch, core.watch)).toBe(true)

  })

  test(LangutilCore.prototype.localize.name, (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')

    const hookInterface = createHookInterface({
      useHook: () => useLangutil<typeof SAMPLE_DICTIONARY>(core),
      actions: {
        changeLangToId: ({ hookData: langutilState }) => {
          langutilState.setLanguage('id')
        },
      },
      values: {
        value: ({ hookData: langutilState }) => {
          return langutilState.localize('GOOD_MORNING')
        },
      },
    }, cleanupRef)

    expect(hookInterface.get('value')).toBe('Good morning.')
    hookInterface.actions('changeLangToId')
    expect(hookInterface.get('value')).toBe('Selamat pagi.')

  })

  test('Rendering', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')

    const hookInterface = createHookInterface({
      useHook: () => useLangutil<typeof SAMPLE_DICTIONARY>(core),
      actions: {
        changeLanguage: ({ hookData: langutilState }) => {
          langutilState.setLanguage('id')
        },
        toggleAutoDetect: ({ hookData: langutilState }) => {
          langutilState.setLanguage('id', { auto: true })
        },
        setDictionary: ({ hookData: langutilState }) => {
          langutilState.setDictionary(SAMPLE_DICTIONARY)
        },
        setDictionary_NEW_OBJ: ({ hookData: langutilState }) => {
          langutilState.setDictionary({ ...SAMPLE_DICTIONARY })
        },
        appendDictionary: ({ hookData: langutilState }) => {
          langutilState.appendDictionary({ ...SAMPLE_DICTIONARY })
        },
      },
      values: {
        value: ({ hookData: langutilState }) => {
          return langutilState.localize('GOOD_MORNING')
        },
      },
    }, cleanupRef)

    // Initial stage
    expect(hookInterface.getRenderCount()).toBe(1)

    hookInterface.actions('changeLanguage')
    expect(hookInterface.getRenderCount()).toBe(2)

    hookInterface.actions('toggleAutoDetect')
    expect(hookInterface.getRenderCount()).toBe(3)

    hookInterface.actions('setDictionary')
    expect(hookInterface.getRenderCount()).toBe(3)

    hookInterface.actions('setDictionary_NEW_OBJ')
    expect(hookInterface.getRenderCount()).toBe(4)

    hookInterface.actions('appendDictionary')
    expect(hookInterface.getRenderCount()).toBe(5)

  })

})
