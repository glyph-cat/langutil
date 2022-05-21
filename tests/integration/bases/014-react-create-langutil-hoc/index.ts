import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import {
  createCleanupRef,
  UNSTABLE_createHocInterface,
} from '@glyph-cat/react-test-utils'
import { IntegrationTestProps } from '../../constants'

const cleanupRef = createCleanupRef()
afterEach(() => { cleanupRef.run() })

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { LangutilCore } = Langutil
  const { createLangutilHOC } = LangutilReact

  test('Basic usage', () => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const withLang = createLangutilHOC<typeof SAMPLE_DICTIONARY>(core)

    const hocInterface = UNSTABLE_createHocInterface({
      entry: ({ Component }) => withLang(Component),
      actions: {
        changeLangToId: ({ props }) => {
          props.langutilState.setLanguage('id')
        },
      },
      values: {
        value: ({ props }) => props.langutilState.localize('GOOD_MORNING'),
      },
    }, cleanupRef)

    expect(hocInterface.get('value')).toBe('Good morning.')
    hocInterface.actions('changeLangToId')
    expect(hocInterface.get('value')).toBe('Selamat pagi.')

  })

}
