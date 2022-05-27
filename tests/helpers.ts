import * as __langutil__ from '../src/main-bundle'
import * as __langutil_React__ from '../src/react'

export interface IntegrationTestConfig {
  buildType: 'cjs' | 'es' | 'rn' | 'umd'
  buildEnv: 'debug' | 'dev' | 'prod'
  description: string
  Langutil: typeof __langutil__
  LangutilReact: typeof __langutil_React__
}
