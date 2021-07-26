export default function ({ Langutil }) {
  const { createLangutilCore } = Langutil

  describe('localizeFromScratch', () => {
    const customLocalizations = {
      'zh-Hans': {
        HELLO: '哈咯',
        HELLO_NAME: '哈咯，{:name}',
      },
    }

    test('Parameters are spreaded', () => {
      const LUcore = createLangutilCore({}, 'en')
      const output = LUcore.localizeFromScratch(
        customLocalizations,
        'zh-Hans',
        'HELLO'
      )
      expect(output).toBe('哈咯')
    })

    test('Parameters as object', () => {
      const LUcore = createLangutilCore({}, 'en')
      const output = LUcore.localizeFromScratch(customLocalizations, {
        language: 'zh-Hans',
        keyword: 'HELLO_NAME',
        param: { name: 'John' },
      })
      expect(output).toBe('哈咯，John')
    })
  })
}
