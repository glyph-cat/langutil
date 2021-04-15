import localizations from '../../sample-dictionary'

export default function ({ Langutil }) {
  const {
    createLangutilCore,
    EVENT_TYPE_DICTIONARY,
    EVENT_TYPE_LANGUAGE,
  } = Langutil

  it('Listeners', () => {
    jest.useFakeTimers()

    let receivedEventData = null

    const LUcore = createLangutilCore({}, 'en')
    const listenerId = LUcore.addListener((event) => {
      receivedEventData = event
    })

    LUcore.setDictionary(localizations)
    jest.advanceTimersByTime()
    expect(receivedEventData).toStrictEqual({
      type: EVENT_TYPE_DICTIONARY,
      data: {
        oldLangState: { language: 'en', isAuto: false },
        newLangState: { language: 'en', isAuto: false },
      },
    })

    LUcore.appendDictionary({})
    jest.advanceTimersByTime()
    expect(receivedEventData).toStrictEqual({
      type: EVENT_TYPE_DICTIONARY,
      data: {
        oldLangState: { language: 'en', isAuto: false },
        newLangState: { language: 'en', isAuto: false },
      },
    })

    LUcore.setLanguage('ms')
    jest.advanceTimersByTime()
    expect(receivedEventData).toStrictEqual({
      type: EVENT_TYPE_LANGUAGE,
      data: {
        oldLangState: { language: 'en', isAuto: false },
        newLangState: { language: 'ms', isAuto: false },
      },
    })

    LUcore.setLanguage('en', { auto: true })
    jest.advanceTimersByTime()
    expect(receivedEventData).toStrictEqual({
      type: EVENT_TYPE_LANGUAGE,
      data: {
        oldLangState: { language: 'ms', isAuto: false },
        newLangState: { language: 'en', isAuto: true },
      },
    })

    // Cleanup - `receivedEventData` should remain same as previous one
    LUcore.removeListener(listenerId)
    LUcore.setLanguage('en', false)
    jest.advanceTimersByTime()
    expect(receivedEventData).toStrictEqual({
      type: EVENT_TYPE_LANGUAGE,
      data: {
        oldLangState: { language: 'ms', isAuto: false },
        newLangState: { language: 'en', isAuto: true },
      },
    })
  })
}
