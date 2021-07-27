import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  test('.cloneCurrent', () => {
    // Original core is compared as well to test for mutability
    const originalCore = createLangutilCore(SAMPLE_DICTIONARY, 'in')
    originalCore.setLanguage('en', { auto: true })
    const clonedCore = originalCore.cloneCurrent()
    originalCore.setLanguage('in', { auto: false })
    expect(originalCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'in',
    })
    expect(clonedCore.getLangutilState()).toStrictEqual({
      isAuto: true,
      language: 'en',
    })
  })

  test('.cloneCurrent', () => {
    // Original core is compared as well to test for mutability
    const originalCore = createLangutilCore(SAMPLE_DICTIONARY, 'in')
    originalCore.setLanguage('en', { auto: true })
    const clonedCore = originalCore.cloneInitial()
    originalCore.setLanguage('in', { auto: false })
    expect(originalCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'in',
    })
    expect(clonedCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'in',
    })
  })

}
