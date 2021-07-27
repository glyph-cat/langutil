import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { localizeFromScratch } = Langutil

  test('Spreaded syntax', () => {
    const output = localizeFromScratch(SAMPLE_DICTIONARY, 'en', 'GOOD_MORNING')
    expect(output).toBe('Good morning.')
  })

  test('Object syntax', () => {
    const output = localizeFromScratch(SAMPLE_DICTIONARY, {
      language: 'en',
      keyword: 'GOOD_MORNING',
    })
    expect(output).toBe('Good morning.')
  })

}
