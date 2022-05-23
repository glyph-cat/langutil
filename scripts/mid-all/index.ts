import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const message = [
  'Build process is half complete.',
  'Please complete the following steps, then press [Enter] to continue:',
  '  1. Remove unexported members in react/lib/types/index.d.ts',
  '     (marked with `undeclare`)',
].join('\n')

rl.question(message, () => { rl.close() })
