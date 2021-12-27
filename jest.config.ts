import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testTimeout: 1000,
  testRegex: '.test.(tsx|ts|jsx|js)',
  verbose: true,
}

export default config
