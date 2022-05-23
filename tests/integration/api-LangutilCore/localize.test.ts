import { IntegrationTestConfig } from '../../helpers'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {

  describe('Basic usage', (): void => {

    test('In originally set language', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.localize('GOOD_MORNING')
      expect(output).toBe('Good morning.')
    })

    test('In another language', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      core.setLanguage('id')
      const output = core.localize('GOOD_MORNING')
      expect(output).toBe('Selamat pagi.')
    })

  })

  describe('Different argument syntaxes', (): void => {

    test('Arguments are spreaded', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.localize('GOOD_MORNING_NAME', { name: 'John' })
      expect(output).toBe('Good morning, John.')
    })

    test('Arguments as object', (): void => {
      const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.localize({
        keyword: 'GOOD_MORNING_NAME',
        param: { name: 'John' },
      })
      expect(output).toBe('Good morning, John.')
    })

  })

})
