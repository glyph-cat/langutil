import { getRandomString } from '../modules'
import { STRINGS } from '../constants'

class HashMaker {

  constructor(blacklist = []) {
    this.used = blacklist
    this.charset = STRINGS.defaultHashCharset
  }

  createHash(length, charset) {
    const charsetToUse = typeof charset === 'string' ? getSanitizedCharset(charset) : this.charset
    const LOOP_LIMIT = 10 // Temporary, need to find out maximum combination count
    let newHash, count = 0
    do {
      newHash = getRandomString(length, charsetToUse)
    } while (this.used.includes(newHash) && count++ < LOOP_LIMIT)
    if (this.used.includes(newHash)) {
      throw Error('Too many ID clashes while attempting to create a unique hash')
      // throw Error(`All possible hashes of length ${length} has been used up!`)
    }
    this.used.push(newHash)
    return newHash
  }

  unregisterHash(hash) {
    const indexOfHashInUsed = this.used.indexOf(hash)
    if (indexOfHashInUsed > -1) {
      this.used.splice(indexOfHashInUsed, 1)
    }
  }

}

export default HashMaker

function getSanitizedCharset(charset) {
  return [...new Set(charset.split(''))].join('')
}
