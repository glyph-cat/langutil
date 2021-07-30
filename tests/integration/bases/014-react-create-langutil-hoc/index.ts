import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import {
  createCleanupRef,
  createHocInterface,
} from '../../../__utils__/hook-interface'
import { IntegrationTestProps } from '../../constants'

const cleanupRef = createCleanupRef()
afterEach(() => { cleanupRef.run() })

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { createLangutilCore } = Langutil
  const { createLangutilHOC } = LangutilReact

  test('Basic usage', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const withLang = createLangutilHOC<typeof SAMPLE_DICTIONARY>(core)

    const hocInterface = createHocInterface({
      entry: ({ Component }) => withLang(Component),
      actions: {
        changeLangToIn: ({ props }) => {
          props.langutilState.setLanguage('in')
        },
      },
      values: {
        value: ({ props }) => props.langutilState.localize('GOOD_MORNING'),
      },
    }, cleanupRef)

    expect(hocInterface.get('value')).toBe('Good morning.')
    hocInterface.actions(['changeLangToIn'])
    expect(hocInterface.get('value')).toBe('Selamat pagi.')

  })

}
