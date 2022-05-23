import { LangutilEvent } from '../../../src/schema'
import { SAMPLE_DICTIONARY } from '../../sample-dictionary'
import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: {
  LangutilCore,
  LangutilEvents,
} }: IntegrationTestConfig): void => {

  test('main', (): void => {

    const core = new LangutilCore(SAMPLE_DICTIONARY, 'en')

    const eventSnapshots: Array<LangutilEvent<typeof SAMPLE_DICTIONARY>> = []
    const unwatch = core.watch((event) => {
      eventSnapshots.push(event)
    })

    core.setLanguage('id')
    core.setDictionary(SAMPLE_DICTIONARY)
    core.appendDictionary(SAMPLE_DICTIONARY)
    core.hydrate(null, 'en')
    unwatch()
    core.setLanguage('id') // Test for memory leak

    expect(eventSnapshots).toStrictEqual([
      {
        type: LangutilEvents.language,
        data: {
          state: {
            previous: { isAuto: false, language: 'en' },
            current: { isAuto: false, language: 'id' },
          },
        },
      },
      {
        type: LangutilEvents.dictionarySet,
        data: {
          state: {
            previous: { isAuto: false, language: 'id' },
            current: { isAuto: false, language: 'id' },
          },
        },
      },
      {
        type: LangutilEvents.dictionaryAppend,
        data: {
          state: {
            previous: { isAuto: false, language: 'id' },
            current: { isAuto: false, language: 'id' },
          },
        },
      },
      {
        type: LangutilEvents.hydration,
        data: {
          state: {
            previous: { isAuto: false, language: 'id' },
            current: { isAuto: false, language: 'en' },
          },
        },
      },
    ])

  })

})
