import fs from 'fs'
import { IntegrationTestProps } from './constants'

const SCOPE = process.env.scope
const DEBUG_BUILDS = [
  {
    tag: 'Debug',
    src: require('../../src/main/index.ts'),
    srcReact: require('../../src/react/index.ts'),
    debug: true,
  },
]
const BUNDLED_BUILDS = [
  {
    tag: 'CJS',
    src: require('../../dist/cjs/index.js'),
    srcReact: require('../../react/dist/cjs/index.js'),
    debug: true,
  },
  {
    tag: 'UMD',
    src: require('../../dist/umd/index.js'),
    srcReact: require('../../react/dist/umd/index.js'),
    debug: true,
  },
  {
    tag: 'UMD (Minified)',
    src: require('../../dist/umd/index.min.js'),
    srcReact: require('../../react/dist/umd/index.min.js'),
  },
  {
    tag: 'ES',
    src: require('../../dist/es/index.js'),
    srcReact: require('../../react/dist/es/index.js'),
    debug: true,
  },
  // --------------------------------------------------
  // // Will fail (unexpected token "import")
  // {
  //   tag: 'ES (Minified)',
  //   src: require('../../dist/es/index.mjs'),
  //   srcReact: require('../../react/dist/es/index.mjs'),
  // },
  // // Doesn't use ReactDOM
  {
    tag: 'React Native',
    src: require('../../dist/native/index.js'),
    srcReact: require('../../react/dist/native/index.js'),
    debug: true,
  },
]

const buildStack = []
if (!SCOPE || SCOPE === 'debug') {
  buildStack.push(...DEBUG_BUILDS)
}
if (!SCOPE || SCOPE === 'bundled') {
  buildStack.push(...BUNDLED_BUILDS)
}

const list = fs.readdirSync('./tests/integration/bases', {
  encoding: 'utf-8',
})

for (const build of buildStack) {
  const { tag, src, srcReact, debug } = build
  describe(tag, () => {
    for (const l of list) {
      if (!/^\d{3}-/.test(l)) { continue }
      describe(l, () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const requiredTest = require(`./bases/${l}`)
        const executor = requiredTest.default || requiredTest
        const testProps: IntegrationTestProps = {
          Langutil: src,
          LangutilReact: srcReact,
          buildEnv: {
            tag,
            IS_DEBUG: debug,
          },
        }
        executor(testProps)
      })
    }
  })
}
