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
    let receivedCalledCount = 0

    const LUcore = createLangutilCore({}, 'en')
    const listenerId = LUcore.addListener((event) => {
      receivedEventData = event
      receivedCalledCount += 1
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

    // shouldRefresh = false
    LUcore.setLanguage('zh', { shouldRefresh: false })
    jest.advanceTimersByTime()
    expect(receivedCalledCount).toBe(2)
    expect(LUcore.getLanguage()).toBe('zh')
    expect(receivedEventData).toStrictEqual({
      // Should still remain the same as above
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
        oldLangState: { language: 'zh', isAuto: false },
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
