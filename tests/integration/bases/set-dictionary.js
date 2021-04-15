import localizations from '../../sample-dictionary'

export default function ({ Langutil }) {
  const { createLangutilCore, INTERNALS_SYMBOL } = Langutil
  it('Set dictionary', () => {
    const LUcore = createLangutilCore({}, 'en')
    LUcore.setDictionary(localizations)
    const output = LUcore[INTERNALS_SYMBOL].getDictionary()
    expect(output).toStrictEqual(localizations)
  })
}
