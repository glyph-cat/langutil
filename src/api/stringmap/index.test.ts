import {
  stringmapArray,
  stringmapObject,
  substituteWithUniqueSwapper,
  warnIfPlaceholdersArePresent,
} from '.'

// NOTE: `stringmap` is an exposed API so it is tested under integration

test(substituteWithUniqueSwapper.name, () => {
  const str = 'lorem-ipsum-dolor-sit-amet'
  const [newStr, swapper] = substituteWithUniqueSwapper(str, /-/g)
  const swapperExistsInOriginalString = !!str.match(swapper)
  expect(swapperExistsInOriginalString).toBe(false)
  expect(newStr).toBe(
    `lorem${swapper}ipsum${swapper}dolor${swapper}sit${swapper}amet`
  )
})

describe(stringmapArray.name, () => {

  describe('Valid placeholders only', () => {

    const str = 'Hello %p and %p'

    test('Exactly enough params', () => {
      const param = ['foo', 'bar']
      const output = stringmapArray(str, param)
      expect(output).toBe('Hello foo and bar')
    })

    test('Empty array param', () => {
      const param = []
      const output = stringmapArray(str, param)
      expect(output).toBe('Hello %p and %p')
    })

    test('Too little params', () => {
      const param = ['foo']
      const output = stringmapArray(str, param)
      expect(output).toBe('Hello foo and %p')
    })

    test('Too many params', () => {
      const param = ['foo', 'bar', 'baz']
      const output = stringmapArray(str, param)
      expect(output).toBe('Hello foo and bar')
    })

  })

  test('Escaped placeholders only', () => {
    const str = 'Hello %%p and %%%p'
    const param = ['foo', 'bar']
    const output = stringmapArray(str, param)
    expect(output).toBe('Hello %p and %%p')
  })

  test('Valid and escaped placeholders', () => {
    const str = 'Hello %%p and %p'
    const param = ['foo', 'bar']
    const output = stringmapArray(str, param)
    expect(output).toBe('Hello %p and foo')
  })

})

describe(stringmapObject.name, () => {

  test('Valid placeholders only', () => {
    const str = 'Hello {:name1} and {:name2}'
    const param = { name1: 'foo', name2: 'bar' }
    const output = stringmapObject(str, param)
    expect(output).toBe('Hello foo and bar')
  })

  test('Escaped placeholders only', () => {
    const str = 'Hello {::name1} and {:::name2}'
    const param = { name1: 'foo', name2: 'bar' }
    const output = stringmapObject(str, param)
    expect(output).toBe('Hello {:name1} and {::name2}')
  })

  test('Valid and escaped placeholders', () => {
    const str = 'Hello {::name1} and {:name2}'
    const param = { name1: 'foo', name2: 'bar' }
    const output = stringmapObject(str, param)
    expect(output).toBe('Hello {:name1} and bar')
  })

  test('With dot notation', () => {
    const str = 'Hello {:person.name}'
    const param = { person: { name: 'foo' } }
    const output = stringmapObject(str, param)
    expect(output).toBe('Hello foo')
  })

  test('Falsy values VS non-existent values', () => {
    const str = '{:item.a}-{:item.b}-{:item.c}-{:item.d}-{:item.e}-{:item.x}-{:x}'
    const param = {
      item: {
        a: 0,
        b: '',
        c: false,
        d: null,
        e: undefined,
      }
    }
    const output = stringmapObject(str, param)
    expect(output).toBe('0--false-null-undefined-{:item.x}-{:x}')
  })

})

describe(warnIfPlaceholdersArePresent.name, () => {

  test('Leftover placeholders are present', () => {
    const str = 'Hello %p and {:name}'
    const output = warnIfPlaceholdersArePresent(str)
    expect(output).toBe(true)
  })

  test('No leftover placeholders', () => {
    const str = 'Hello foo and bar'
    const output = warnIfPlaceholdersArePresent(str)
    expect(output).toBe(false)
  })

})
