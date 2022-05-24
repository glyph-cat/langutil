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

    // Expect dictionary to be completely replaced
    core.setDictionary(SAMPLE_DICTIONARY_ALT)
    expect(core.getDictionary()).toStrictEqual(SAMPLE_DICTIONARY_ALT)
    if (isNotProductionBuild) {
      expect(core.M$dictionaryMutationCount).toBe(2)
    }

    // Old dictionary should no longer be in use
    expect(core.localize('GOOD_MORNING')).toBe('GOOD_MORNING')

    // New dictionary should now be effective
    expect(core.localize('GOOD_NIGHT')).toBe('Good night.')

  })

})
