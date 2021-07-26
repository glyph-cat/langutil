import * as __langutil__ from '../../../src/main'
import * as __langutilReact__ from '../../../src/react'

export interface IntegrationTestProps {
  Langutil: typeof __langutil__
  LangutilReact: typeof __langutilReact__
  buildEnv: {
    tag: string,
    IS_DEBUG: boolean
  }
}
