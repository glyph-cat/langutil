const { STRINGS } = require('../constants')

/**
 * @version 1.1.0
 * @description Converts plaintext into a hash of any given length
 * @param {String} plaintext
 * @param {Number} length
 * @param {String|Array} charset
 */
module.exports = function flexHash(plaintext, length = 32, charset = STRINGS.defaultHashCharset) {
  length = length + 1

  // Prepare bufferSet
  let bufferSet = Buffer.from(plaintext)
  let bufferSum = 0
  for (let a = 0; a < length; a++) {
    let indexToUse = a % bufferSet.length
    bufferSum += bufferSet[indexToUse]
  }

  // Initialize array
  let arr = []
  for (let i = 0; i < length; i++) {
    let allocationValue = (bufferSet.length * (i + 1)) % charset.length
    allocationValue += bufferSum % (i + 1) * Math.pow(i, 2)
    arr.push(allocationValue)
  }

  // Real hashing happens here
  for (let i = 0; i < bufferSet.length; i++) {
    let currentIndex = i % length
    let bufferValue = bufferSet[i]
    let nextBufferValue = 0
    if (i < plaintext.length - 1) {
      nextBufferValue = bufferSet[i + 1]
    } else {
      nextBufferValue = bufferSet[i][0]
    }
    bufferValue += nextBufferValue
    bufferValue += bufferSet.length % (bufferSet.length - i)
    arr[currentIndex] += bufferValue
  }

  // Map hashed values to characters
  for (let i = 0; i < arr.length; i++) {
    let charIndex = arr[i] % charset.length
    arr[i] = charset[charIndex]
  }

  return arr.join('')
}
