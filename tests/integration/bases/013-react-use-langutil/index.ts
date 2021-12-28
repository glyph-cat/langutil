import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import {
  createCleanupRef,
  createHookInterface,
} from '@glyph-cat/react-test-utils'
import { IntegrationTestProps } from '../../constants'

const cleanupRef = createCleanupRef()
afterEach(() => { cleanupRef.run() })

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { createLangutilCore } = Langutil
  const { useLangutil } = LangutilReact

  test('Basic usage', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')

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

}
