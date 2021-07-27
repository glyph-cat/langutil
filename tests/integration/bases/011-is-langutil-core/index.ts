import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore, isLangutilCore } = Langutil

  test('Test against a Langutil Core', () => {
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
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

}
