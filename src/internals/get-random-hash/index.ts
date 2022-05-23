/**
 * @internal
 */
const CHARSET = '0123456789abcdef'

/**
 * Creates a random hash.
 * @param length - Length of the hash.
 * @returns A random hash.
 * @internal
 */
export function getRandomHash(length: number): string {
  let hash = ''
  while (hash.length < length) {
    hash += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }
  return hash
}
