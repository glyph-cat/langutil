import { SAMPLE_DICTIONARY } from '../../../tests/sample-dictionary'
import { baseLocalizer } from './'

// eslint-disable-next-line
const mockDebouncedWarning = () => { }

describe('baseLocalizer', () => {
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

  test('Non-existent key', () => {
    const output = baseLocalizer(
      SAMPLE_DICTIONARY,
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
          // @ts-ignore Ignored on purpose to test incorrect types
          2,
          mockDebouncedWarning
        )
      }
      expect(callback).toThrowError(TypeError)
    })
  })
})
