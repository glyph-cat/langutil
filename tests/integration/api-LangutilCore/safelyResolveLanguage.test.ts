import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {

  describe('Single value', (): void => {

    test('Contains exact match', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.safelyResolveLanguage('id')
      expect(output).toBe('id')
    })

    test('Contains partial match', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.safelyResolveLanguage('en_GB')
      expect(output).toBe('en')
    })

    test('Contains no match', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.safelyResolveLanguage('ko')
      expect(output).toBe('en')
    })

  })

  describe('Array value', (): void => {

    test('Contains exact match', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.safelyResolveLanguage(['ab', 'id'])
      expect(output).toBe('id')
    })

    test('Contains partial match', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.safelyResolveLanguage(['ab', 'id-GB'])
      expect(output).toBe('id')
    })

    test('Contains no match', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.safelyResolveLanguage(['ab', 'zh'])
      expect(output).toBe('en')
    })

  })

})
