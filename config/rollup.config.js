import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { version } from '../package.json'

// NOTE: Adding '@types/react-native' will cause error when running `yarn tsc`

const NODE_RESOLVE_CONFIG_BASE = {
  extensions: ['.ts', '.js'],
}
const NODE_RESOLVE_CONFIG_REACT_NATIVE = {
  ...NODE_RESOLVE_CONFIG_BASE,
  extensions: [
    '.native.ts',
    '.native.js',
    ...NODE_RESOLVE_CONFIG_BASE.extensions,
  ],
}

const MAIN_INPUT_FILE = 'src/main/index.ts'
const REACT_INPUT_FILE = 'src/react/index.ts'

const EXTERNAL_LIBS_MAIN = []
const EXTERNAL_LIBS_REACT = [
  ...EXTERNAL_LIBS_MAIN,
  'hoist-non-react-statics',
  'react',
]
const EXTERNAL_LIBS_REACT_DOM = [
  ...EXTERNAL_LIBS_REACT,
  'react-dom',
]
const EXTERNAL_LIBS_REACT_NATIVE = [
  ...EXTERNAL_LIBS_REACT,
  'react-native',
]

const UMD_GLOBALS = {
  react: 'React',
  'hoist-non-react-statics': 'hoistNonReactStatics',
  'react-dom': 'ReactDOM',
}

/**
 * @param {object} config
 * @param {object} config.overrides
 * @param {Array<string>} config.presets
 * @param {'development'|'production'} config.mode
 * @param {'boolean'} config.isRNBuild
 * @returns {Array}
 */
function getPlugins({
  overrides,
  mode,
  presets = [],
} = {}) {

  const basePlugins = {
    nodeResolve: nodeResolve(NODE_RESOLVE_CONFIG_BASE),
    typescript: typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          declarationDir: null,
          outDir: null,
        },
      },
    }),
    babel: babel({
      presets,
      plugins: ['@babel/plugin-proposal-optional-chaining'],
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled',
    }),
    commonjs: commonjs(),
  }

  // Override plugins
  for (const overrideKey in overrides) {
    basePlugins[overrideKey] = overrides[overrideKey]
  }

  // Convert plugins object to array
  const pluginStack = []
  for (const i in basePlugins) {
    // Allows plugins to be excluded by replacing them with falsey values
    if (basePlugins[i]) {
      pluginStack.push(basePlugins[i])
    }
  }

  // Replace values
  const replaceValues = {
    'process.env.DIST_ENV': JSON.stringify(true),
    'process.env.NPM_PACKAGE_VERSION': JSON.stringify(version),
  }
  if (mode) {
    replaceValues['process.env.NODE_ENV'] = JSON.stringify(mode)
  }
  pluginStack.push(replace({
    preventAssignment: true,
    values: replaceValues,
  }))

  // Minification and cleanup
  if (mode === 'production') {
    const terserPlugin = terser({ mangle: { properties: { regex: /^M\$/ } } })
    pluginStack.push(terserPlugin)
  }
  pluginStack.push(forceCleanup())

  return pluginStack

}

const coreConfig = [
  {
    // CommonJS
    input: MAIN_INPUT_FILE,
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_MAIN,
    plugins: getPlugins(),
  },
  {
    // EcmaScript
    input: MAIN_INPUT_FILE,
    output: {
      file: 'dist/es/index.js',
      format: 'es',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_MAIN,
    plugins: getPlugins(),
  },
  {
    // EcmaScript (Browsers)
    input: MAIN_INPUT_FILE,
    output: {
      file: 'dist/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_MAIN,
    plugins: getPlugins({ mode: 'production' }),
  },
  {
    // React Native
    input: MAIN_INPUT_FILE,
    output: {
      file: 'dist/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_REACT_NATIVE,
    plugins: getPlugins({
      overrides: {
        nodeResolve: nodeResolve(NODE_RESOLVE_CONFIG_REACT_NATIVE),
      },
    }),
  },
  {
    // UMD
    input: MAIN_INPUT_FILE,
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_MAIN,
    plugins: getPlugins({ mode: 'development' }),
  },
  {
    // UMD (Production)
    input: MAIN_INPUT_FILE,
    output: {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_MAIN,
    plugins: getPlugins({ mode: 'production' }),
  },
]

const reactConfig = [
  {
    // CommonJS
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_REACT_DOM,
    plugins: getPlugins({
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // EcmaScript
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/dist/es/index.js',
      format: 'es',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_REACT_DOM,
    plugins: getPlugins({
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // EcmaScript (Browsers)
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/dist/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_REACT_DOM,
    plugins: getPlugins({
      mode: 'production',
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // React Native
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/dist/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: EXTERNAL_LIBS_REACT_NATIVE,
    plugins: getPlugins({
      presets: ['@babel/preset-react'],
      overrides: {
        nodeResolve: nodeResolve(NODE_RESOLVE_CONFIG_REACT_NATIVE),
      },
    }),
  },
  {
    // UMD
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/dist/umd/index.js',
      format: 'umd',
      name: 'LangutilReact',
      exports: 'named',
      globals: UMD_GLOBALS,
    },
    external: EXTERNAL_LIBS_REACT_DOM,
    plugins: getPlugins({
      mode: 'development',
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // UMD (Production)
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/dist/umd/index.min.js',
      format: 'umd',
      name: 'LangutilReact',
      exports: 'named',
      globals: UMD_GLOBALS,
    },
    external: EXTERNAL_LIBS_REACT_DOM,
    plugins: getPlugins({
      mode: 'production',
      presets: ['@babel/preset-react'],
    }),
  },
]

const config = [
  ...coreConfig,
  ...reactConfig,
]

export default config

function forceCleanup() {
  return {
    name: 'forceCleanup',
    transform: (code, id) => {
      if (id.includes('tslib')) {
        return new Promise((resolve) => {
          const indexOfFirstCommentCloseAsterisk = code.indexOf('*/')
          if (indexOfFirstCommentCloseAsterisk >= 0) {
            // +2 to include the 2 searched characters as well
            code = code.substring(
              indexOfFirstCommentCloseAsterisk + 2,
              code.length
            )
          }
          resolve({ code })
        })
      }
      return null
    },
  }
}
