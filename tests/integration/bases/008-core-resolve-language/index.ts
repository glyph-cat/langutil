import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  describe('.resolveLanguage', () => {

    describe('Single value', () => {

      test('Contains exact match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.resolveLanguage('id')
        expect(output).toBe('id')
      })

      test('Contains partial match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.resolveLanguage('en_GB')
        expect(output).toBe('en')
      })

      test('Contains no match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.resolveLanguage('ko')
        expect(output).toBe(null)
      })

    })

    describe('Array value', () => {

      test('Contains exact match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.resolveLanguage(['ab', 'id'])
        expect(output).toBe('id')
      })

      test('Contains partial match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.resolveLanguage(['ab', 'id-GB'])
        expect(output).toBe('id')
      })

      test('Contains no match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.resolveLanguage(['ab', 'zh'])
        expect(output).toBe(null)
      })

    })

  })

  describe('.safelyResolveLanguage', () => {

    describe('Single value', () => {

      test('Contains exact match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.safelyResolveLanguage('id')
        expect(output).toBe('id')
      })

      test('Contains partial match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.safelyResolveLanguage('en_GB')
        expect(output).toBe('en')
      })

      test('Contains no match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.safelyResolveLanguage('ko')
        expect(output).toBe('en')
      })

    })

    describe('Array value', () => {

      test('Contains exact match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.safelyResolveLanguage(['ab', 'id'])
        expect(output).toBe('id')
      })

      test('Contains partial match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.safelyResolveLanguage(['ab', 'id-GB'])
        expect(output).toBe('id')
      })

      test('Contains no match', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.safelyResolveLanguage(['ab', 'zh'])
        expect(output).toBe('en')
      })

    })

  })

}
