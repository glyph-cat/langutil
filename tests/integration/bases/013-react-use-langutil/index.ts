import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { createHookInterface } from '../../../__utils__/hook-interface'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, LangutilReact } = testProps
  const { createLangutilCore } = Langutil
  const { useLangutil } = LangutilReact

  test('Basic usage', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const useLang = () => useLangutil<typeof SAMPLE_DICTIONARY>(core)

    const hookInterface = createHookInterface({
      hook: {
        method: useLang,
        parameters: [core],
      },
      actions: {
        changeLangToIn: ({ H }) => { H.setLanguage('in') },
      },
      values: {
        value: (langutilState) => langutilState.localize('GOOD_MORNING'),
      },
    })

    expect(hookInterface.get('value')).toBe('Good morning.')
    hookInterface.actions(['changeLangToIn'])
    expect(hookInterface.get('value')).toBe('Selamat pagi.')

    hookInterface.cleanup()

  })

}
