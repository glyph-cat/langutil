import { LangutilEvent } from '../../../../src/schema'
import SAMPLE_DICTIONARY from '../../../sample-dictionary'
import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { createLangutilCore, LangutilEvents } = Langutil

  test('.watch', () => {

    const core = createLangutilCore(SAMPLE_DICTIONARY, 'en')

    const eventSnapshots: Array<LangutilEvent<typeof SAMPLE_DICTIONARY>> = []
    const unwatch = core.watch((event) => {
      eventSnapshots.push(event)
    })

    core.setLanguage('ms')
    core.setDictionary(SAMPLE_DICTIONARY)
    core.appendDictionary(SAMPLE_DICTIONARY)
    core.hydrate(null, 'en')
    unwatch()
    core.setLanguage('ms') // Test for memory leak

    expect(eventSnapshots).toStrictEqual([
      {
        type: LangutilEvents.language,
        data: {
          oldLangState: { isAuto: false, language: 'en' },
          newLangState: { isAuto: false, language: 'ms' },
        },
      },
      {
        type: LangutilEvents.setDictionary,
        data: {
          oldLangState: { isAuto: false, language: 'ms' },
          newLangState: { isAuto: false, language: 'ms' },
        },
      },
      {
        type: LangutilEvents.appendDictionary,
        data: {
          oldLangState: { isAuto: false, language: 'ms' },
          newLangState: { isAuto: false, language: 'ms' },
        },
      },
      {
        type: LangutilEvents.hydration,
        data: {
          oldLangState: { isAuto: false, language: 'ms' },
          newLangState: { isAuto: false, language: 'en' },
        },
      },
    ])

  })

}
