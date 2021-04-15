import { act } from 'react-test-renderer'
import { createHocInterface } from '../../__utils__/hook-interface'
import localizations from '../../sample-dictionary'

export default function ({ Langutil, LangutilReact }) {
  const { createLangutilCore } = Langutil
  const { withLang } = LangutilReact

  it('React withLang', () => {
    jest.useFakeTimers()
    const LUcore = createLangutilCore(localizations, 'en')

    const hocInterface = createHocInterface({
      entry: ({ C }) => withLang(C, LUcore),
      actions: {
        setLanguageToMs: (props) => {
          props.langState.setLanguage('ms')
        },
      },
      values: {
        currentLanguage: (props) => props.langState.language,
        currentlyIsAuto: (props) => props.langState.isAuto,
        hello: (props) => props.langState.localize('HELLO'),
      },
    })

    // Initial phase
    expect(hocInterface.get('currentLanguage')).toBe('en')
    expect(hocInterface.get('currentlyIsAuto')).toBe('false')
    expect(hocInterface.get('hello')).toBe('Hello')

    // After changing language
    act(() => {
      hocInterface.actions('setLanguageToMs')
      jest.advanceTimersByTime()
    })
    expect(hocInterface.get('currentLanguage')).toBe('ms')
    expect(hocInterface.get('currentlyIsAuto')).toBe('false')
    expect(hocInterface.get('hello')).toBe('Apa khabar')

    // Setting to same language should not result in component update
    act(() => {
      hocInterface.actions('setLanguageToMs')
      jest.advanceTimersByTime()
    })
    expect(hocInterface.getRenderCount()).toBe(2)
    // Component should have rendered 2 times only so far
  })
}
