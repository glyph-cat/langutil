import { displayStringArray } from './'

describe('displayStringArray', () => {
  it('Empty array', () => {
    const output = displayStringArray([])
    expect(output).toBe('[]')
  })

  it('Array with items', () => {
    const output = displayStringArray(['foo', 'bar'])
    expect(output).toBe('[\'foo\', \'bar\']')
  })
})
