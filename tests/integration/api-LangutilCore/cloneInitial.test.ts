import { IntegrationTestConfig } from '../../helpers'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { LangutilCore } }: IntegrationTestConfig): void => {
  test('main', (): void => {
    // Original core is compared as well to test for mutability
    const originalCore = new LangutilCore(SAMPLE_DICTIONARY, 'id')
    originalCore.setLanguage('en', { auto: true })
    const clonedCore = originalCore.cloneInitial()
    originalCore.setLanguage('id', { auto: false })
    expect(originalCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'id',
    })
    expect(clonedCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'id',
    })
  })
})
