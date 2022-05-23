import { getRandomHash } from '.'

test(getRandomHash.name, (): void => {
  const output = getRandomHash(8)
  expect(output).toMatch(/^[0-9a-f]{8}$/)
})
