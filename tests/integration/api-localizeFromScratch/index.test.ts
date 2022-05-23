import { IntegrationTestConfig } from '../../helpers'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { localizeFromScratch } }: IntegrationTestConfig): void => {

  test('Spreaded syntax', (): void => {
    const output = localizeFromScratch(SAMPLE_DICTIONARY, 'en', 'GOOD_MORNING')
    expect(output).toBe('Good morning.')
  })

  test('Object syntax', (): void => {
    const output = localizeFromScratch(SAMPLE_DICTIONARY, {
      language: 'en',
      keyword: 'GOOD_MORNING',
    })
    expect(output).toBe('Good morning.')
  })

})
