export default function ({ Langutil }) {
  const { createLangutilCore, INTERNALS_SYMBOL } = Langutil
  test('Set dictionary', () => {
    const customLocalizations = {
      en: {
        HELLO: 'Hello',
      },
      zh: {
        HELLO: '哈咯',
      },
    }

    const LUcore = createLangutilCore(customLocalizations, 'en')
    LUcore.appendDictionary({
      en: {
        THE_CAT_IS_MEOWING: 'The cat is meowing',
      },
      ms: {
        THE_CAT_IS_MEOWING: 'Kucing sedang mengiau',
      },
    })

    const output = LUcore[INTERNALS_SYMBOL].getDictionary()
    expect(output).toStrictEqual({
      en: {
        HELLO: 'Hello',
        THE_CAT_IS_MEOWING: 'The cat is meowing',
      },
      ms: {
        THE_CAT_IS_MEOWING: 'Kucing sedang mengiau',
      },
      zh: {
        HELLO: '哈咯',
      },
    })
  })
}
