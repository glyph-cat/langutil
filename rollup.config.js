import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const coreInputFile = 'src/index.js'

// TODO: Only replace process.env.NODE_ENV in UMD and ES (Browser) builds

/**
 * @param {object} config
 * @param {object} config.overrides
 * @param {Array<string>} config.presets
 * @param {'development'|'production'} config.mode
 * @returns {Array}
 */
function getPlugins({ overrides, mode, presets = [] }) {
  const basePlugins = {
    babel: babel({
      presets,
      plugins: ['@babel/plugin-proposal-optional-chaining'],
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled',
    }),
    nodeResolve: nodeResolve(),
    commonjs: commonjs(),
    replace: replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(mode),
      },
    }),
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
  if (mode === 'production') {
    const terserPlugin = terser({ mangle: { properties: { regex: /^M\$/ } } })
    pluginStack.push(terserPlugin)
  }
  return pluginStack
}

const coreConfig = [
  {
    // CommonJS
    input: coreInputFile,
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'development' }),
  },
  {
    // EcmaScript
    input: coreInputFile,
    output: {
      file: 'dist/es/index.js',
      format: 'es',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'development' }),
  },
  {
    // EcmaScript (Browsers)
    input: coreInputFile,
    output: {
      file: 'dist/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'production' }),
  },
  {
    // React Native
    input: coreInputFile,
    output: {
      file: 'dist/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: ['react-native'],
    plugins: getPlugins({
      mode: 'development',
      overrides: {
        nodeResolve: nodeResolve({
          extensions: ['.native.js', '.js'],
        }),
        // Here, we leave `process.env.NODE_ENV` as is and let RN's bundler
        // handle it
        replace: null,
      },
    }),
  },
  {
    // UMD
    input: coreInputFile,
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
    input: coreInputFile,
    output: {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    plugins: getPlugins({ mode: 'production' }),
  },
]

const reactInputFile = 'src-react/index.js'
const reactCommonExternalLibs = ['hoist-non-react-statics', 'react']
const reactCommonUmdGlobals = {
  react: 'React',
  'hoist-non-react-statics': 'hoist',
}

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
      mode: 'development',
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
      mode: 'development',
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
      mode: 'development',
      presets: ['@babel/preset-react'],
      overrides: {
        nodeResolve: nodeResolve({
          extensions: ['.native.js', '.js'],
        }),
        // Here, we leave `process.env.NODE_ENV` as is and let RN's bundler
        // handle it
        replace: null,
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
