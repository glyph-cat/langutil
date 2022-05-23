import { IntegrationTestConfig } from '../../helpers'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {

  test(LangutilCore.prototype.getLanguage.name, (): void => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getLanguage()
    expect(output).toBe('en')
  })

  test([
    LangutilCore.prototype.setLanguage.name,
    LangutilCore.prototype.getLanguage.name,
  ].join(' + '), (): void => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    core.setLanguage('id')
    const output = core.getLanguage()
    expect(output).toBe('id')
  })

  test(LangutilCore.prototype.getLangutilState.name, (): void => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getLangutilState()
    expect(output).toStrictEqual({
      isAuto: false,
      language: 'en',
    })
  })

  test(LangutilCore.prototype.getAllLanguages.name, (): void => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = core.getAllLanguages().sort()
    expect(output).toStrictEqual(['en', 'id', 'ja'].sort())
  })

})
