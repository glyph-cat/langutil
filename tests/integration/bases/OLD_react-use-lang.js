import { act } from 'react-test-renderer'
import { createHookInterface } from '../../__utils__/hook-interface'
import localizations from '../../sample-dictionary'

export default function ({ Langutil, LangutilReact }) {
  const { createLangutilCore } = Langutil
  const { useLang } = LangutilReact

  test('React useLang', () => {
    jest.useFakeTimers()
    const LUcore = createLangutilCore(localizations, 'en')

    const hookInterface = createHookInterface({
      hook: {
        method: useLang,
        props: [LUcore],
      },
      actions: {
        setLanguageToMs: ({ H }) => {
          H.setLanguage('ms')
        },
      },
      values: {
        currentLanguage: (H) => H.language,
        currentlyIsAuto: (H) => JSON.stringify(H.isAuto),
        hello: (H) => H.localize('HELLO'),
      },
    })

    // Initial phase
    expect(hookInterface.get('currentLanguage')).toBe('en')
    expect(hookInterface.get('currentlyIsAuto')).toBe('false')
    expect(hookInterface.get('hello')).toBe('Hello')

    // After changing language
    act(() => {
      hookInterface.actions('setLanguageToMs')
      jest.advanceTimersByTime()
    })
    expect(hookInterface.get('currentLanguage')).toBe('ms')
    expect(hookInterface.get('currentlyIsAuto')).toBe('false')
    expect(hookInterface.get('hello')).toBe('Apa khabar')

    // Setting to same language should not result in component update
    act(() => {
      hookInterface.actions('setLanguageToMs')
      jest.advanceTimersByTime()
    })
    expect(hookInterface.getRenderCount()).toBe(2)
    // Component should have rendered 2 times only so far
  })
}
