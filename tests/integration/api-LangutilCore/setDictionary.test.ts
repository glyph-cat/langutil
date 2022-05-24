import { IntegrationTestConfig } from '../../helpers'
import {
  SAMPLE_DICTIONARY,
  SAMPLE_DICTIONARY_ALT,
} from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {
  test('main', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    expect(core.M$dictionaryMutationCount).toBe(1)

    // Expect dictionary to be completely replaced
    core.setDictionary(SAMPLE_DICTIONARY_ALT)
    expect(core.getDictionary()).toStrictEqual(SAMPLE_DICTIONARY_ALT)
    expect(core.M$dictionaryMutationCount).toBe(2)

    // Old dictionary should no longer be in use
    expect(core.localize('GOOD_MORNING')).toBe('GOOD_MORNING')

    // New dictionary should now be effective
    expect(core.localize('GOOD_NIGHT')).toBe('Good night.')

  })
})
