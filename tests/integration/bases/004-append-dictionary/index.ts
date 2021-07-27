import {
  SAMPLE_DICTIONARY,
  SAMPLE_DICTIONARY_ALT,
} from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore, INTERNALS_SYMBOL } = Langutil

  test('.appendDictionary', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    core.appendDictionary(SAMPLE_DICTIONARY_ALT)

    // Old dictionary should still be effective
    expect(core.localize('GOOD_MORNING')).toBe('Good morning.')

    // New dictionary should also be effective
    expect(core.localize('GOOD_NIGHT')).toBe('Good night.')

    // Expect both dictionaries to be merged
    const output = core[INTERNALS_SYMBOL].getDictionary()
    expect(output).toStrictEqual({
      en: {
        ...SAMPLE_DICTIONARY.en,
        ...SAMPLE_DICTIONARY_ALT.en,
      },
      in: {
        ...SAMPLE_DICTIONARY.in,
        ...SAMPLE_DICTIONARY_ALT.in,
      },
      ja: {
        ...SAMPLE_DICTIONARY.ja,
        ...SAMPLE_DICTIONARY_ALT.ja,
      },
    })

  })

}
