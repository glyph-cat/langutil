import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import {
  createCleanupRef,
  createHookInterface,
} from '@chin98edwin/react-test-utils'
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
        changeLangToId: ({ hookValue: langutilState }) => {
          langutilState.setLanguage('id')
        },
      },
      values: {
        value: ({ hookValue: langutilState }) => {
          return langutilState.localize('GOOD_MORNING')
        },
      },
    }, cleanupRef)

    expect(hookInterface.get('value')).toBe('Good morning.')
    hookInterface.actions(['changeLangToId'])
    expect(hookInterface.get('value')).toBe('Selamat pagi.')

  })

}
