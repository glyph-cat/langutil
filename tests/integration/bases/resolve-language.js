import localizations from '../../sample-dictionary'

export default function ({ Langutil }) {
  const { createLangutilCore } = Langutil

  describe('resolveLanguage', () => {
    it('Exact match', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.resolveLanguage('en')
      expect(output).toBe('en')
    })

    it('Closest match', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.resolveLanguage('en_GB')
      expect(output).toBe('en')
    })

    it('No match', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.resolveLanguage('abc')
      expect(output).toBe(null)
    })
  })
}
