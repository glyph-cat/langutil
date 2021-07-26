import localizations from '../../sample-dictionary'

export default function ({ Langutil }) {
  const { createLangutilCore } = Langutil

  describe('localizeExplicitly', () => {
    test('Parameters are spreaded', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.localizeExplicitly('ms', 'HELLO')
      expect(output).toBe('Apa khabar')
    })

    test('Parameters as object', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.localizeExplicitly({
        language: 'ms',
        keyword: 'HELLO_NAME',
        param: { name: 'John' },
      })
      expect(output).toBe('Apa khabar, John')
    })
  })
}
