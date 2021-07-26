import localizations from '../../../tests/sample-dictionary'
import { baseLocalizer } from './'

// eslint-disable-next-line
const mockDebouncedWarning = () => { }

describe('baseLocalizer', () => {
  test('Basic localization', () => {
    const output = baseLocalizer(
      localizations,
      'en',
      'HELLO',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('Hello')
  })

  test('Non-existent key', () => {
    const output = baseLocalizer(
      localizations,
      'en',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Ignored on purpose to test incorrect types
      'ABC',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('ABC')
  })

  describe('With parameters', () => {
    describe('With array as param', () => {
      test('1 item', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_PARAM',
          ['John'],
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, John')
      })

      test('2 items', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_PARAM_AND_PARAM',
          ['John', 'Jane'],
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, John and Jane')
      })

      test('No items', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_PARAM',
          undefined,
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, %p')
      })
    })

    describe('With object as param', () => {
      test('1 item', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_NAME',
          {
            name: 'John',
          },
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, John')
      })

      test('2 item', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_NAME_AND_NAME',
          {
            name1: 'John',
            name2: 'Jane',
          },
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, John and Jane')
      })

      test('No items', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_NAME',
          undefined,
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, {:name}')
      })
    })

    test('Invalid param type', () => {
      const callback = () => {
        baseLocalizer(
          localizations,
          'en',
          'HELLO_NAME',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore Ignored on purpose to test incorrect types
          2,
          mockDebouncedWarning
        )
      }
      expect(callback).toThrowError(TypeError)
    })
  })
})
