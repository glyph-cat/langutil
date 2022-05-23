import { IntegrationTestConfig } from '../../helpers'
import {
  SAMPLE_DICTIONARY,
  SAMPLE_DICTIONARY_ALT,
} from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {

  test('main', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    core.appendDictionary(SAMPLE_DICTIONARY_ALT)

    // Old dictionary should still be effective
    expect(core.localize('GOOD_MORNING')).toBe('Good morning.')

    // New dictionary should also be effective
    expect(core.localize('GOOD_NIGHT')).toBe('Good night.')

    // Expect both dictionaries to be merged
    const output = core.getDictionary()
    expect(output).toStrictEqual({
      en: {
        ...SAMPLE_DICTIONARY.en,
        ...SAMPLE_DICTIONARY_ALT.en,
      },
      id: {
        ...SAMPLE_DICTIONARY.id,
        ...SAMPLE_DICTIONARY_ALT.id,
      },
      ja: {
        ...SAMPLE_DICTIONARY.ja,
        ...SAMPLE_DICTIONARY_ALT.ja,
      },
    })

  })

})
