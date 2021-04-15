import {
  substituteWithUniqueSwapper,
  getItemByPath,
  stringMapArray,
  stringMapObject,
} from './'

it('substituteWithUniqueSwapper', () => {
  const str = 'lorem-ipsum-dolor-sit-amet'
  const [newStr, swapper] = substituteWithUniqueSwapper(str, /-/g)
  const swapperExistsInOriginalString = !!str.match(swapper)
  expect(swapperExistsInOriginalString).toBe(false)
  expect(newStr).toBe(
    `lorem${swapper}ipsum${swapper}dolor${swapper}sit${swapper}amet`
  )
})

describe('getItemByPath', () => {
  it('Dot notation', () => {
    const data = { a: { b: { c: 1 } } }
    const path = 'a.b.c'
    const output = getItemByPath(data, path)
    expect(output).toBe(1)
  })

  it('Square brackets', () => {
    const data = { a: { b: [0, 1, 2] } }
    const path = 'a.b[2]'
    const output = getItemByPath(data, path)
    expect(output).toBe(2)
  })
})

describe('stringMapArray', () => {
  describe('Valid placeholders only', () => {
    const str = 'Hello %p and %p'

    it('Exactly enough params', () => {
      const param = ['foo', 'bar']
      const output = stringMapArray(str, param)
      expect(output).toBe('Hello foo and bar')
    })

    it('Too little params', () => {
      const param = ['foo']
      const output = stringMapArray(str, param)
      expect(output).toBe('Hello foo and %p')
    })

    it('Too many params', () => {
      const param = ['foo', 'bar', 'baz']
      const output = stringMapArray(str, param)
      expect(output).toBe('Hello foo and bar')
    })
  })

  it('Escaped placeholders only', () => {
    const str = 'Hello %%p and %%%p'
    const param = ['foo', 'bar']
    const output = stringMapArray(str, param)
    expect(output).toBe('Hello %p and %%p')
  })

  it('Valid and escaped placeholders', () => {
    const str = 'Hello %%p and %p'
    const param = ['foo', 'bar']
    const output = stringMapArray(str, param)
    expect(output).toBe('Hello %p and foo')
  })
})

describe('stringMapObject', () => {
  it('Valid placeholders only', () => {
    const str = 'Hello {:name1} and {:name2}'
    const param = { name1: 'foo', name2: 'bar' }
    const output = stringMapObject(str, param)
    expect(output).toBe('Hello foo and bar')
  })

  it('Escaped placeholders only', () => {
    const str = 'Hello {::name1} and {:::name2}'
    const param = { name1: 'foo', name2: 'bar' }
    const output = stringMapObject(str, param)
    expect(output).toBe('Hello {:name1} and {::name2}')
  })

  it('Valid and escaped placeholders', () => {
    const str = 'Hello {::name1} and {:name2}'
    const param = { name1: 'foo', name2: 'bar' }
    const output = stringMapObject(str, param)
    expect(output).toBe('Hello {:name1} and bar')
  })

  it('With dot notation', () => {
    const str = 'Hello {:person.name}'
    const param = { person: { name: 'foo' } }
    const output = stringMapObject(str, param)
    expect(output).toBe('Hello foo')
  })
})
