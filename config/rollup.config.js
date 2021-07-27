import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { version } from '../package.json'

/**
 * @param {object} config
 * @param {object} config.overrides
 * @param {Array<string>} config.presets
 * @param {'development'|'production'} config.mode
 * @returns {Array}
 */
function getPlugins({ overrides, mode, presets = [] } = {}) {
  const basePlugins = {
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
    // // @see https://stackoverflow.com/questions/55362346/rollup-how-to-require-json-but-not-include-it-in-bundle#57922092
    // json: json({ compact: true }),
    nodeResolve: nodeResolve(),
    commonjs: commonjs(),
  }
  for (const overrideKey in overrides) {
    basePlugins[overrideKey] = overrides[overrideKey]
  }
  const pluginStack = []
  for (const i in basePlugins) {
    // Allows plugins to be excluded by replacing them with falsey values
    if (basePlugins[i]) {
      pluginStack.push(basePlugins[i])
    }
  }
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
  if (mode === 'production') {
    const terserPlugin = terser({ mangle: { properties: { regex: /^M\$/ } } })
    pluginStack.push(terserPlugin)
  }
  pluginStack.push(forceCleanup())
  return pluginStack
}

const mainInputFile = 'src/main/index.ts'
const coreConfig = [
  {
    // CommonJS
    input: mainInputFile,
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: getPlugins(),
  },
  {
    // EcmaScript
    input: mainInputFile,
    output: {
      file: 'dist/es/index.js',
      format: 'es',
      exports: 'named',
    },
    plugins: getPlugins(),
  },
  {
    // EcmaScript (Browsers)
    input: mainInputFile,
    output: {
      file: 'dist/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'production' }),
  },
  {
    // React Native
    input: mainInputFile,
    output: {
      file: 'dist/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: ['react-native'],
    plugins: getPlugins({
      overrides: {
        nodeResolve: nodeResolve({
          extensions: ['.native.js', '.js'],
        }),
      },
    }),
  },
  {
    // UMD
    input: mainInputFile,
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'development' }),
  },
  {
    // UMD (Production)
    input: mainInputFile,
    output: {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'production' }),
  },
]

const reactInputFile = 'src/react/index.ts'
const reactCommonUmdGlobals = {
  react: 'React',
  'hoist-non-react-statics': 'hoist',
}
const reactCommonExternalLibs = Object.keys(reactCommonUmdGlobals)
const reactConfig = [
  {
    // CommonJS
    input: reactInputFile,
    output: {
      file: 'react/dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    external: [...reactCommonExternalLibs, 'react-dom'],
    plugins: getPlugins({
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // EcmaScript
    input: reactInputFile,
    output: {
      file: 'react/dist/es/index.js',
      format: 'es',
      exports: 'named',
    },
    external: [...reactCommonExternalLibs, 'react-dom'],
    plugins: getPlugins({
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // EcmaScript (Browsers)
    input: reactInputFile,
    output: {
      file: 'react/dist/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    external: [...reactCommonExternalLibs, 'react-dom'],
    plugins: getPlugins({
      mode: 'production',
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // React Native
    input: reactInputFile,
    output: {
      file: 'react/dist/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: [...reactCommonExternalLibs, 'react-native'],
    plugins: getPlugins({
      presets: ['@babel/preset-react'],
      overrides: {
        nodeResolve: nodeResolve({
          extensions: ['.native.js', '.js'],
        }),
      },
    }),
  },
  {
    // UMD
    input: reactInputFile,
    output: {
      file: 'react/dist/umd/index.js',
      format: 'umd',
      name: 'LangutilReact',
      exports: 'named',
      globals: reactCommonUmdGlobals,
    },
    external: reactCommonExternalLibs,
    plugins: getPlugins({
      mode: 'development',
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // UMD (Production)
    input: reactInputFile,
    output: {
      file: 'react/dist/umd/index.min.js',
      format: 'umd',
      name: 'LangutilReact',
      exports: 'named',
      globals: reactCommonUmdGlobals,
    },
    external: reactCommonExternalLibs,
    plugins: getPlugins({
      mode: 'production',
      presets: ['@babel/preset-react'],
    }),
  },
]

const config = [...coreConfig, ...reactConfig]

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
