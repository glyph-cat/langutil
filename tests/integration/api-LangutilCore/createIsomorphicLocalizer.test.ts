import { IntegrationTestConfig } from '../../helpers'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { wrapper } from '../wrapper'

// KIV: Usage unclear

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {

  test('Header language matches', (): void => {
    const mockHeaderLanguage = 'id'
    const core = new LangutilCore(SAMPLE_DICTIONARY, mockHeaderLanguage)
    const isomorphicLocalize = core.createIsomorphicLocalizer(mockHeaderLanguage)
    const output = isomorphicLocalize('GOOD_MORNING')
    expect(output).toBe('Selamat pagi.')
  })

  test('Header language does not match', (): void => {
    const mockHeaderLanguage = 'zh'
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const isomorphicLocalize = core.createIsomorphicLocalizer(mockHeaderLanguage)
    const output = isomorphicLocalize('GOOD_MORNING')
    expect(output).toBe('Good morning.')
  })

})
