import getRandomhash from '.'

test('getRandomhash', () => {
  const output = getRandomhash(8)
  expect(output).toMatch(/^[0-9a-f]{8}$/)
})
