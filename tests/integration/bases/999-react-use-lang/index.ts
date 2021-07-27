import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { createHookInterface } from '../../../__utils__/hook-interface'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { createLangutilCore } = Langutil
  const { useLangutil } = LangutilReact

  const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
  const hookInterface = createHookInterface({
    hook: {
      method: useLangutil,
      parameters: [core],
    },
    values: {
      a: (hookData) => {
        const localizedValue = hookData.localize('GOOD_MORNING')
        return localizedValue
      },
    },
  })

  expect(hookInterface.get('a')).toBe('Good morning')

}
