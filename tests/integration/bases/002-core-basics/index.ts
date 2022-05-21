import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { LangutilCore } = Langutil

  test('.getLanguage', () => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getLanguage()
    expect(output).toBe('en')
  })

  test('.setLanguage + .getLanguage', () => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    core.setLanguage('id')
    const output = core.getLanguage()
    expect(output).toBe('id')
  })

  test('.getLangutilState', () => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getLangutilState()
    expect(output).toStrictEqual({
      isAuto: false,
      language: 'en',
    })
  })

  test('.getAllLanguages', () => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getAllLanguages().sort()
    expect(output).toStrictEqual(['en', 'id', 'ja'].sort())
  })

}
