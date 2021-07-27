import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  describe('.localizeExplicitly', () => {

    describe('Basic usage', () => {

      test('en', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.localizeExplicitly('en', 'SOMETIMES_IM_A_BEAR')
        expect(output).toBe('Sometimes, I\'m a bear, and at other times I am a be-ar.')
      })

      test('ja', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.localizeExplicitly('in', 'SOMETIMES_IM_A_BEAR')
        expect(output).toBe('Kadang-kadang aku beruang, dan kadang-kadang aku ber-uang(berwang).')
      })

      test('in', () => {
        const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
        const output = core.localizeExplicitly('ja', 'SOMETIMES_IM_A_BEAR')
        expect(output).toBe('ある時はクマ、そしてまたある時は…ク-マ。')
      })

    })

    describe('Different argument syntaxes', () => {

      describe('Argument are spreaded', () => {

        test('en', () => {
          const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
          const output = core.localizeExplicitly('en', 'GOOD_MORNING_PNAME', ['John'])
          expect(output).toBe('Good morning, John.')
        })

        test('ja', () => {
          const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
          const output = core.localizeExplicitly('in', 'GOOD_MORNING_PNAME', ['John'])
          expect(output).toBe('Selamat pagi, John.')
        })

        test('in', () => {
          const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
          const output = core.localizeExplicitly('ja', 'GOOD_MORNING_PNAME', ['ジョン'])
          expect(output).toBe('おはようございまする、ジョンさん。')
        })

      })

      describe('Argument as object', () => {

        test('en', () => {
          const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
          const output = core.localizeExplicitly('en', 'GOOD_MORNING_NAME', {
            name: 'John',
          })
          expect(output).toBe('Good morning, John.')
        })

        test('ja', () => {
          const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
          const output = core.localizeExplicitly('in', 'GOOD_MORNING_NAME', {
            name: 'John',
          })
          expect(output).toBe('Selamat pagi, John.')
        })

        test('in', () => {
          const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
          const output = core.localizeExplicitly('ja', 'GOOD_MORNING_NAME', {
            name: 'ジョン',
          })
          expect(output).toBe('おはようございまする、ジョンさん。')
        })

      })

    })

  })

}
