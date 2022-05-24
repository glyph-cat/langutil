import { IntegrationTestConfig } from '../../helpers'
import {
  SAMPLE_DICTIONARY,
  SAMPLE_DICTIONARY_ALT,
} from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({
  Langutil: {
    LangutilCore,
  },
  buildEnv,
}: IntegrationTestConfig): void => {

  // TOFIX: `core.M$dictionaryMutationCount` is not accessible in minified builds
  const isNotProductionBuild = buildEnv !== 'prod'

  test('main', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    if (isNotProductionBuild) {
      expect(core.M$dictionaryMutationCount).toBe(1)
    }

    // Old dictionary should still be effective
    core.appendDictionary(SAMPLE_DICTIONARY_ALT)
    if (isNotProductionBuild) {
      expect(core.M$dictionaryMutationCount).toBe(2)
    }
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
