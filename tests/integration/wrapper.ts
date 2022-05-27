import { IntegrationTestConfig } from '../helpers'

const SCOPE = process.env.scope
const DEBUG_BUILDS: Array<IntegrationTestConfig> = [
  {
    buildEnv: 'debug',
    buildType: 'es',
    description: 'Debug',
    Langutil: require('../../src/main-bundle.ts'),
    LangutilReact: require('../../src/react/index.ts'),
  },
]
const BUNDLED_BUILDS: Array<IntegrationTestConfig> = [
  {
    buildEnv: 'dev',
    buildType: 'cjs',
    description: 'CJS',
    Langutil: require('../../lib/cjs/index.js'),
    LangutilReact: require('../../react/lib/cjs/index.js'),
  },
  {
    buildEnv: 'dev',
    buildType: 'es',
    description: 'EcmaScript',
    Langutil: require('../../lib/es/index.js'),
    LangutilReact: require('../../react/lib/es/index.js'),
  },
  // {
  //   buildEnv: 'prod',
  //   buildType: 'es',
  //   description: 'EcmaScript (Minified)',
  //   Langutil: require('../../lib/es/index.mjs'),
  //   LangutilReact: require('../../react/lib/es/index.mjs'),
  // },
  // {
  //   buildEnv: 'debug',
  //   buildType: 'rn',
  //   description: 'React Native',
  //   Langutil: require('../../lib/native/index.js'),
  //   LangutilReact: require('../../react/lib/native/index.js'),
  // },
  {
    buildEnv: 'dev',
    buildType: 'umd',
    description: 'UMD',
    Langutil: require('../../lib/umd/index.js'),
    LangutilReact: require('../../react/lib/umd/index.js'),
  },
  {
    buildEnv: 'prod',
    buildType: 'umd',
    description: 'UMD (Minified)',
    Langutil: require('../../lib/umd/index.min.js'),
    LangutilReact: require('../../react/lib/umd/index.min.js'),
  },
]

// NOTE: RN and ES minified builds will fail to run with the error
// > unexpected token "import"

const testConfigStack: Array<IntegrationTestConfig> = []
if (!SCOPE || SCOPE === 'debug') {
  testConfigStack.push(...DEBUG_BUILDS)
}
if (!SCOPE || SCOPE === 'bundled') {
  testConfigStack.push(...BUNDLED_BUILDS)
}

export function wrapper(
  executor: ((cfg: IntegrationTestConfig) => void)
): void {
  for (const testConfig of testConfigStack) {
    describe(testConfig.description, (): void => {
      executor(testConfig)
    })
  }
}
