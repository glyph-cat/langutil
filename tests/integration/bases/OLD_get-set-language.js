export default function ({ Langutil }) {
  const { createLangutilCore } = Langutil
  test('Get/Set language', () => {
    const LUcore = createLangutilCore({}, 'en')

    LUcore.setLanguage('ms')
    expect(LUcore.getLanguage()).toBe('ms')
    expect(LUcore.getLangState()).toStrictEqual({
      language: 'ms',
      isAuto: false,
    })

    LUcore.setLanguage('en', { auto: true })
    expect(LUcore.getLanguage()).toBe('en')
    expect(LUcore.getLangState()).toStrictEqual({
      language: 'en',
      isAuto: true,
    })
  })

  test('Invalid setLanguage options', () => {
    const callback = () => {
      const LUcore = createLangutilCore({}, 'en')
      LUcore.setLanguage('en', 'auto: true')
    }
    expect(callback).toThrowError(TypeError)
  })
}
