import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { createHocInterface } from '../../../__utils__/hook-interface'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { createLangutilCore } = Langutil
  const { createLangutilHOC } = LangutilReact

  test('Basic usage', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const withLang = createLangutilHOC<typeof SAMPLE_DICTIONARY>(core)

    const hocInterface = createHocInterface({
      entry: ({ C }) => withLang(C),
      actions: {
        changeLangToIn: ({ H }) => { H.setLanguage('in') },
      },
      values: {
        value: (langState) => langState.localize('GOOD_MORNING'),
      },
    })

    expect(hocInterface.get('value')).toBe('Good morning.')
    hocInterface.actions(['changeLangToIn'])
    expect(hocInterface.get('value')).toBe('Selamat pagi.')

    hocInterface.cleanup()

  })

}
