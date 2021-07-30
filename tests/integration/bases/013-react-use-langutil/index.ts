import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import {
  createCleanupRef,
  createHookInterface,
} from '../../../__utils__/hook-interface'
import { IntegrationTestProps } from '../../constants'

const cleanupRef = createCleanupRef()
afterEach(() => { cleanupRef.run() })

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { createLangutilCore } = Langutil
  const { useLangutil } = LangutilReact

  test('Basic usage', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const useLang = () => useLangutil<typeof SAMPLE_DICTIONARY>(core)

    const hookInterface = createHookInterface({
      hook: {
        method: useLang,
        parameters: [core],
      },
      actions: {
        changeLangToIn: ({ hookValue: langutilState }) => {
          langutilState.setLanguage('in')
        },
      },
      values: {
        value: ({ hookValue: langutilState }) => {
          return langutilState.localize('GOOD_MORNING')
        },
      },
    }, cleanupRef)

    expect(hookInterface.get('value')).toBe('Good morning.')
    hookInterface.actions(['changeLangToIn'])
    expect(hookInterface.get('value')).toBe('Selamat pagi.')

  })

}
