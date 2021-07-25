import getMergedDictionary from '.'

it('getMergedDictionary', () => {
  const d1 = {
    en: { FOO: 'foo', BAR: 'bar', BAZ: 'Baz' },
    zh: { FOO: '胡', BAR: '巴' },
  }
  const d2 = {
    en: {
      HELLO: 'Hello',
    },
    zh: {
      HELLO: '哈咯',
      WORLD: '世界',
    },
  }
  const output = getMergedDictionary(d1, d2)
  expect(output).toStrictEqual({
    en: { HELLO: 'Hello', FOO: 'foo', BAR: 'bar', BAZ: 'Baz' },
    zh: { HELLO: '哈咯', FOO: '胡', BAR: '巴', WORLD: '世界' },
  })
})
