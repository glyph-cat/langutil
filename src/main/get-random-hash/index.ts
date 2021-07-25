const CHARSET = '0123456789abcdef'

function getRandomHash(length: number): string {
  let hash = ''
  while (hash.length < length) {
    hash += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }
  return hash
}

export default getRandomHash
