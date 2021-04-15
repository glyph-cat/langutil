import localizations from '../../sample-dictionary'

export default function ({ Langutil }) {
  const { createLangutilCore } = Langutil

  describe('localize', () => {
    it('Parameters are spreaded', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.localize('HELLO')
      expect(output).toBe('Hello')
    })

    it('Parameters as object', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      const output = LUcore.localize({
        keyword: 'HELLO_NAME',
        param: { name: 'John' },
      })
      expect(output).toBe('Hello, John')
    })

    it('Switch to another language', () => {
      const LUcore = createLangutilCore(localizations, 'en')
      LUcore.setLanguage('ms')
      const output = LUcore.localize('HELLO')
      expect(output).toBe('Apa khabar')
    })
  })
}
