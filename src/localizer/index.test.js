import localizations from '../../tests/sample-dictionary'
import { baseLocalizer } from './'

const mockDebouncedWarning = { pushWarning: () => {} }

describe('baseLocalizer', () => {
  it('Basic localization', () => {
    const output = baseLocalizer(
      localizations,
      'en',
      'HELLO',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('Hello')
  })

  it('Non-existent key', () => {
    const output = baseLocalizer(
      localizations,
      'en',
      'ABC',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('ABC')
  })

  describe('With parameters', () => {
    describe('With array as param', () => {
      it('1 item', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_PARAM',
          ['John'],
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, John')
      })

      it('2 items', () => {
        const output = baseLocalizer(
          localizations,
          'en',
          'HELLO_PARAM_AND_PARAM',
          ['John', 'Jane'],
          mockDebouncedWarning
        )
        expect(output).toBe('Hello, John and Jane')
      })

      it('No items', () => {
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
      it('1 item', () => {
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

      it('2 item', () => {
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

      it('No items', () => {
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

    it('Invalid param type', () => {
      const callback = () => {
        baseLocalizer(
          localizations,
          'en',
          'HELLO_NAME',
          2,
          mockDebouncedWarning
        )
      }
      expect(callback).toThrowError(TypeError)
    })
  })
})
