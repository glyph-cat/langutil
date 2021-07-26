import localizations from '../../sample-dictionary'

export default function ({ Langutil }) {
  const { createLangutilCore } = Langutil

  describe('resolveLanguage', () => {
    test('Exact match', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.resolveLanguage('en')
      expect(output).toBe('en')
    })

    test('Closest match', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.resolveLanguage('en_GB')
      expect(output).toBe('en')
    })

    test('No match', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.resolveLanguage('abc')
      expect(output).toBe(null)
    })
  })
}
