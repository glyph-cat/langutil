const fs = require('fs')
const targetPath = './public/index.html'

function getHtml() {
  return fs.readFileSync(targetPath, { encoding: 'utf-8' }).split('\n')
}

function destructureBodyAndHashFromHtml(body) {
  let existingHash = body.pop()
  existingHash = existingHash.replace(/^<!--\sbuild-hash:\s(?=\d{16})/i, '')
  existingHash = existingHash.replace(/\s-->$/, '')
  return { upperBody: body, existingHash }
}

function getNewHash() {
  let str = ''
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  while (str.length < 32) { str += charset[Math.floor(Math.random() * charset.length)] }
  return str
}

function getUniqueNewHash(existing) {
  let newHash
  do { newHash = getNewHash() } while (newHash === existing)
  return newHash
}

const applyFormatToHash = hash => `<!-- build-hash: ${hash} -->`

function renewBuildHash() {
  const raw = getHtml()
  const { upperBody, existingHash } = destructureBodyAndHashFromHtml(raw)
  const newHash = getUniqueNewHash(existingHash)
  const newHtml = [...upperBody, applyFormatToHash(newHash)].join('\n')
  fs.writeFileSync(targetPath, newHtml, { encoding: 'utf-8' })
}

renewBuildHash()
