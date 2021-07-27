import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  describe('Basic usage', () => {

    test('In originally set language', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.localize('GOOD_MORNING')
      expect(output).toBe('Good morning.')
    })

    test('In another language', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      core.setLanguage('in')
      const output = core.localize('GOOD_MORNING')
      expect(output).toBe('Selamat pagi.')
    })

  })

  describe('Different argument syntaxes', () => {

    test('Arguments are spreaded', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.localize('GOOD_MORNING_NAME', { name: 'John' })
      expect(output).toBe('Good morning, John.')
    })

    test('Arguments as object', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.localize({
        keyword: 'GOOD_MORNING_NAME',
        param: { name: 'John' },
      })
      expect(output).toBe('Good morning, John.')
    })

  })

}
