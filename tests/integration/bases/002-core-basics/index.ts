import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  test('.getLanguage', () => {
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getLanguage()
    expect(output).toBe('en')
  })

  test('.setLanguage + .getLanguage', () => {
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    core.setLanguage('in')
    const output = core.getLanguage()
    expect(output).toBe('in')
  })

  test('.getLangutilState', () => {
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getLangutilState()
    expect(output).toStrictEqual({
      isAuto: false,
      language: 'en',
    })
  })

  test('.getAllLanguages', () => {
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getAllLanguages().sort()
    expect(output).toStrictEqual(['en', 'in', 'ja'].sort())
  })

}
