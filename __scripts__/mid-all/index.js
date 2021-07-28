const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const message = 'Build process is half complete, please complete the ' +
  'following steps, then press any key to continue:\n' +
  '1. Remove unexported declarations in react/dist/types/index.d.ts\n' +
  // eslint-disable-next-line quotes
  "2. import { LangutilCore, LangutilState } from '../../..';"

rl.question(message, () => { rl.close() })
