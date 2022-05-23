import { IntegrationTestConfig } from '../../helpers'
import {
  SAMPLE_DICTIONARY,
  SAMPLE_DICTIONARY_ALT,
} from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {
  test('main', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    core.setDictionary(SAMPLE_DICTIONARY_ALT)

    // Expect dictionary to be completely replaced
    const output = core.getDictionary()
    expect(output).toStrictEqual(SAMPLE_DICTIONARY_ALT)

    // Old dictionary should no longer be in use
    expect(core.localize('GOOD_MORNING')).toBe('GOOD_MORNING')

    // New dictionary should now be effective
    expect(core.localize('GOOD_NIGHT')).toBe('Good night.')

  })
})
