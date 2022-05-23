import {
  createCleanupRef,
  UNSTABLE_createHocInterface,
} from '@glyph-cat/react-test-utils'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

const cleanupRef = createCleanupRef()
afterEach((): void => { cleanupRef.run() })

wrapper(({
  Langutil: { LangutilCore },
  LangutilReact: { createLangutilHOC },
}: IntegrationTestConfig): void => {
  test('main', (): void => {

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
})
