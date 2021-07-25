import { componentShouldUpdateFrom } from '.'

describe('componentShouldUpdateFrom', () => {

  test('Same language, same auto', () => {
    const output = componentShouldUpdateFrom({
      type: 1,
      data: {
        oldLangState: {
          language: 'en',
          isAuto: false,
        },
        newLangState: {
          language: 'en',
          isAuto: false,
        },
      }
    })
    expect(output).toBe(false)
  })

  test('Same language, different auto', () => {
    const output = componentShouldUpdateFrom({
      type: 1,
      data: {
        oldLangState: {
          language: 'en',
          isAuto: false,
        },
        newLangState: {
          language: 'en',
          isAuto: true,
        },
      }
    })
    expect(output).toBe(true)
  })

  test('Different language, same auto', () => {
    const output = componentShouldUpdateFrom({
      type: 1,
      data: {
        oldLangState: {
          language: 'en',
          isAuto: false,
        },
        newLangState: {
          language: 'zh',
          isAuto: false,
        },
      }
    })
    expect(output).toBe(true)
  })

  test('Different language, different auto', () => {
    const output = componentShouldUpdateFrom({
      type: 1,
      data: {
        oldLangState: {
          language: 'en',
          isAuto: false,
        },
        newLangState: {
          language: 'zh',
          isAuto: true,
        },
      }
    })
    expect(output).toBe(true)
  })

})
