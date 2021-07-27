import SAMPLE_DICTIONARY from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  describe('LangutilCore (Basics)', () => {

    test('.getLanguage', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.getLanguage()
      expect(output).toBe('en')
    })

    test('.setLanguage + .getLanguage', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      core.setLanguage('ms')
      const output = core.getLanguage()
      expect(output).toBe('ms')
    })

    test('.getLangutilState', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const output = core.getLangutilState()
      expect(output).toStrictEqual({
        isAuto: false,
        language: 'en',
      })
    })

  })

}
