import { getItemByPath } from '.'

describe(getItemByPath.name, () => {

  test('Dot notation', () => {
    const data = { a: { b: { c: 1 } } }
    const path = 'a.b.c'
    const output = getItemByPath(data, path)
    expect(output).toBe(1)
  })

  test('Square brackets', () => {
    const data = { a: { b: [0, 1, 2] } }
    const path = 'a.b[2]'
    const output = getItemByPath(data, path)
    expect(output).toBe(2)
  })

})
