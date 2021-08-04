import { componentShouldUpdateFrom } from '.'
import { LangutilEvents } from '../../constants'

describe(componentShouldUpdateFrom.name, () => {

  test('Same language, same auto', () => {
    const output = componentShouldUpdateFrom({
      type: LangutilEvents.language,
      data: {
        state: {
          previous: {
            language: 'en',
            isAuto: false,
          },
          current: {
            language: 'en',
            isAuto: false,
          },
        }
      }
    })
    expect(output).toBe(false)
  })

  test('Same language, different auto', () => {
    const output = componentShouldUpdateFrom({
      type: LangutilEvents.language,
      data: {
        state: {
          previous: {
            language: 'en',
            isAuto: false,
          },
          current: {
            language: 'en',
            isAuto: true,
          },
        },
      }
    })
    expect(output).toBe(true)
  })

  test('Different language, same auto', () => {
    const output = componentShouldUpdateFrom({
      type: LangutilEvents.language,
      data: {
        state: {
          previous: {
            language: 'en',
            isAuto: false,
          },
          current: {
            language: 'zh',
            isAuto: false,
          },
        },
      }
    })
    expect(output).toBe(true)
  })

  test('Different language, different auto', () => {
    const output = componentShouldUpdateFrom({
      type: LangutilEvents.language,
      data: {
        state: {
          previous: {
            language: 'en',
            isAuto: false,
          },
          current: {
            language: 'zh',
            isAuto: true,
          },
        },
      }
    })
    expect(output).toBe(true)
  })

})
