import {
  createCleanupRef,
  createHookInterface,
} from '@glyph-cat/react-test-utils'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

const cleanupRef = createCleanupRef()
afterEach((): void => { cleanupRef.run() })

wrapper(({
  Langutil: { LangutilCore },
  LangutilReact: { useLangutil },
}: IntegrationTestConfig): void => {

  test('main', (): void => {

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

})
