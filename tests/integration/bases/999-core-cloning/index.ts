import SAMPLE_DICTIONARY from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore } = Langutil

  test('.cloneCurrent', () => {
    // Original core is compared as well to test for mutability
    const originalCore = createLangutilCore(SAMPLE_DICTIONARY, 'ms')
    originalCore.setLanguage('en', { auto: true })
    const clonedCore = originalCore.cloneCurrent()
    originalCore.setLanguage('ms', { auto: false })
    expect(originalCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'ms',
    })
    expect(clonedCore.getLangutilState()).toStrictEqual({
      isAuto: true,
      language: 'en',
    })
  })

  test('.cloneCurrent', () => {
    // Original core is compared as well to test for mutability
    const originalCore = createLangutilCore(SAMPLE_DICTIONARY, 'ms')
    originalCore.setLanguage('en', { auto: true })
    const clonedCore = originalCore.cloneInitial()
    originalCore.setLanguage('ms', { auto: false })
    expect(originalCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'ms',
    })
    expect(clonedCore.getLangutilState()).toStrictEqual({
      isAuto: false,
      language: 'ms',
    })
  })

}
