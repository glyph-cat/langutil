import {
  SAMPLE_DICTIONARY,
  SAMPLE_DICTIONARY_ALT,
} from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore, INTERNALS_SYMBOL } = Langutil

  test('.setDictionary', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    core.setDictionary(SAMPLE_DICTIONARY_ALT)

    // Expect dictionary to be completely replaced
    const output = core[INTERNALS_SYMBOL].getDictionary()
    expect(output).toStrictEqual(SAMPLE_DICTIONARY_ALT)

    // Old dictionary should no longer be in use
    expect(core.localize('GOOD_MORNING')).toBe('GOOD_MORNING')

    // New dictionary should now be effective
    expect(core.localize('GOOD_NIGHT')).toBe('Good night.')

  })

}