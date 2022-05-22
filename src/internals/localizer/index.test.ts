import { SAMPLE_DICTIONARY } from '../../../tests/sample-dictionary'
import { baseLocalizer } from '.'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const mockDebouncedWarning = () => { }

describe(baseLocalizer.name, () => {

  test('Basic localization', () => {
    const output = baseLocalizer(
      SAMPLE_DICTIONARY,
      'en',
      'GOOD_MORNING',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('Good morning.')
  })

  test('Non-existent language', () => {
    const output = baseLocalizer(
      SAMPLE_DICTIONARY,
      // @ts-expect-error: Ignored on purpose to test incorrect types.
      'ab',
      'GOOD_MORNING',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('GOOD_MORNING')
  })

  test('Non-existent key', () => {
    const output = baseLocalizer(
      SAMPLE_DICTIONARY,
      'en',
      'ABC',
      undefined,
      mockDebouncedWarning
    )
    expect(output).toBe('ABC')
  })

  test('Falsy values', () => {
    const specialDictionary = {
      en: {
        A: 0,
        B: '',
        C: false,
        D: null,
        E: undefined,
      }
    }
    const wrappedLocalizer = (keyword: string) => {
      return baseLocalizer(
        specialDictionary,
        'en',
        keyword,
        undefined,
        mockDebouncedWarning
      )
    }
    expect(wrappedLocalizer('A')).toBe(0)
    expect(wrappedLocalizer('B')).toBe('')
    expect(wrappedLocalizer('C')).toBe(false)
    expect(wrappedLocalizer('D')).toBe(null)
    expect(wrappedLocalizer('E')).toBe(undefined)
    expect(wrappedLocalizer('X')).toBe('X')
  })

  describe('With parameters', () => {

    describe('With array as param', () => {

      test('1 item', () => {
        const output = baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_PNAME',
          ['John'],
          mockDebouncedWarning
        )
        expect(output).toBe('Good morning, John.')
      })

      test('2 items', () => {
        const output = baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_PNAME_AND_PNAME',
          ['John', 'Jane'],
          mockDebouncedWarning
        )
        expect(output).toBe('Good morning, John and Jane.')
      })

      test('No items', () => {
        const output = baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_PNAME',
          undefined,
          mockDebouncedWarning
        )
        expect(output).toBe('Good morning, %p.')
      })
    })

    describe('With object as param', () => {

      test('1 item', () => {
        const output = baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_NAME',
          { name: 'John' },
          mockDebouncedWarning
        )
        expect(output).toBe('Good morning, John.')
      })

      test('2 item', () => {
        const output = baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_NAME1_AND_NAME2',
          {
            name1: 'John',
            name2: 'Jane',
          },
          mockDebouncedWarning
        )
        expect(output).toBe('Good morning, John and Jane.')
      })

      test('No items', () => {
        const output = baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_NAME',
          undefined,
          mockDebouncedWarning
        )
        expect(output).toBe('Good morning, {:name}.')
      })
    })

    test('Invalid param type', () => {
      const callback = () => {
        baseLocalizer(
          SAMPLE_DICTIONARY,
          'en',
          'GOOD_MORNING_NAME',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error: Ignored on purpose to test incorrect types.
          2,
          mockDebouncedWarning
        )
      }
      expect(callback).toThrowError(TypeError)
    })

  })

})
