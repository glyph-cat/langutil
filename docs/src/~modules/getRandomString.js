import { STRINGS } from '~constants'

function getRandomString(length, charset = STRINGS.defaultHashCharset) {
  let str = ''
  while (str.length < length) {
    str += charset[Math.floor(Math.random() * charset.length)]
  }
  return str
}

export default getRandomString
