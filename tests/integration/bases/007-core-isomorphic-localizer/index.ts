import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  test('Header language matches', () => {
    const mockHeaderLanguage = 'in'
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const isomorphicLocalize = core.createIsomorphicLocalizer(mockHeaderLanguage)
    const output = isomorphicLocalize('GOOD_MORNING')
    expect(output).toBe('Selamat pagi.')
  })

  test('Header language does not match', () => {
    const mockHeaderLanguage = 'zh'
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const isomorphicLocalize = core.createIsomorphicLocalizer(mockHeaderLanguage)
    const output = isomorphicLocalize('GOOD_MORNING')
    expect(output).toBe('Good morning.')
  })

}
