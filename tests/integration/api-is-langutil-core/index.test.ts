import { IntegrationTestConfig } from '../../helpers'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: {
  LangutilCore,
  isLangutilCore,
} }: IntegrationTestConfig): void => {

  test('Test against a Langutil Core', () => {
    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')
    const output = isLangutilCore(core)
    expect(output).toBe(true)
  })

  describe('Test against other data types', () => {
    test('Array', () => { expect(isLangutilCore([])).toBe(false) })
    test('Boolean', () => { expect(isLangutilCore(true)).toBe(false) })
    test('Date', () => { expect(isLangutilCore(new Date())).toBe(false) })
    test('Null', () => { expect(isLangutilCore(null)).toBe(false) })
    test('Number', () => { expect(isLangutilCore(42)).toBe(false) })
    test('Object', () => { expect(isLangutilCore({})).toBe(false) })
    test('String', () => { expect(isLangutilCore('')).toBe(false) })
    test('Undefined', () => { expect(isLangutilCore(undefined)).toBe(false) })
  })

})
