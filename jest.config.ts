import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testPathIgnorePatterns: [
    '.draft',
    '.old',
  ],
  testTimeout: 1000,
  testRegex: '.test.(tsx|ts|jsx|js)',
  verbose: false,
}

export default config
