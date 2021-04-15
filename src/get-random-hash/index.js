const charset = '0123456789abcdef'

/**
 * @param {number} length
 * @returns {string}
 */
function getRandomHash(length) {
  let hash = ''
  while (hash.length < length) {
    hash += charset[Math.floor(Math.random() * charset.length)]
  }
  return hash
}

export default getRandomHash
