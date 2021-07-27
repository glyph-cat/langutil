import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  test('Basic usage', () => {
    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
    const output1 = core.localizeExplicitly('en', 'SOMETIMES_IM_A_BEAR')
    expect(output1).toBe('Sometimes, I\'m a bear, and at other times I am a be-ar.')
    const output2 = core.localizeExplicitly('in', 'SOMETIMES_IM_A_BEAR')
    expect(output2).toBe('Kadang-kadang aku beruang, dan kadang-kadang aku ber-uang.')
    const output3 = core.localizeExplicitly('ja', 'SOMETIMES_IM_A_BEAR')
    expect(output3).toBe('ある時はクマ、そしてまたある時は…ク-マ。')
  })

  describe('Different argument syntaxes', () => {

    test('Argument are spreaded', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const output1 = core.localizeExplicitly('en', 'GOOD_MORNING_PNAME', ['John'])
      expect(output1).toBe('Good morning, John.')
      const output2 = core.localizeExplicitly('in', 'GOOD_MORNING_PNAME', ['John'])
      expect(output2).toBe('Selamat pagi, John.')
      const output3 = core.localizeExplicitly('ja', 'GOOD_MORNING_PNAME', ['ジョン'])
      expect(output3).toBe('おはようございまする、ジョンさん。')
    })

    test('Argument as object', () => {
      const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')
      const o1 = core.localizeExplicitly('en', 'GOOD_MORNING_NAME', { name: 'John' })
      expect(o1).toBe('Good morning, John.')
      const o2 = core.localizeExplicitly('in', 'GOOD_MORNING_NAME', { name: 'John' })
      expect(o2).toBe('Selamat pagi, John.')
      const o3 = core.localizeExplicitly('ja', 'GOOD_MORNING_NAME', { name: 'ジョン' })
      expect(o3).toBe('おはようございまする、ジョンさん。')
    })

  })

}
