import { displayStringArray } from '.'

describe(displayStringArray.name, () => {

  test('Empty array', () => {
    const output = displayStringArray([])
    expect(output).toBe('[]')
  })

  test('Array with items', () => {
    const output = displayStringArray(['foo', 'bar'])
    expect(output).toBe('[\'foo\', \'bar\']')
  })

})
