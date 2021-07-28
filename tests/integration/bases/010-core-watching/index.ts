import { LangutilEvent } from '../../../../src/schema'
import { SAMPLE_DICTIONARY } from '../../../sample-dictionary'
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

    core.setLanguage('in')
    core.setDictionary(SAMPLE_DICTIONARY)
    core.appendDictionary(SAMPLE_DICTIONARY)
    core.hydrate(null, 'en')
    unwatch()
    core.setLanguage('in') // Test for memory leak

    expect(eventSnapshots).toStrictEqual([
      {
        type: LangutilEvents.language,
        data: {
          state: {
            previous: { isAuto: false, language: 'en' },
            current: { isAuto: false, language: 'in' },
          },
        },
      },
      {
        type: LangutilEvents.dictionarySet,
        data: {
          state: {
            previous: { isAuto: false, language: 'in' },
            current: { isAuto: false, language: 'in' },
          },
        },
      },
      {
        type: LangutilEvents.dictionaryAppend,
        data: {
          state: {
            previous: { isAuto: false, language: 'in' },
            current: { isAuto: false, language: 'in' },
          },
        },
      },
      {
        type: LangutilEvents.hydration,
        data: {
          state: {
            previous: { isAuto: false, language: 'in' },
            current: { isAuto: false, language: 'en' },
          },
        },
      },
    ])

  })

}
