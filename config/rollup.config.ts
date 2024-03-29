import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { execSync } from 'child_process'
import { Plugin as RollupPlugin, RollupOptions } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { version } from '../package.json'
import { LangutilBuildType } from '../src/constants'

const BASE_NODE_RESOLVE_CONFIG = {
  extensions: ['.ts', '.js'],
}

const NODE_RESOLVE_CONFIG_REACT_NATIVE = {
  ...BASE_NODE_RESOLVE_CONFIG,
  extensions: [
    '.native.ts',
    '.native.js',
    ...BASE_NODE_RESOLVE_CONFIG.extensions,
  ],
}

const MAIN_INPUT_FILE = 'src/main-bundle.ts'
const REACT_INPUT_FILE = 'src/react/index.ts'

const MAIN_BUNDLE_EXTERNAL_LIBS = []
const MAIN_BUNDLE_UMD_GLOBALS = {}

const REACT_BUNDLE_EXTERNAL_LIBS = [
  ...MAIN_BUNDLE_EXTERNAL_LIBS,
  'hoist-non-react-statics',
  'react',
]
const REACT_DOM_EXTERNAL_LIBS = [
  ...REACT_BUNDLE_EXTERNAL_LIBS,
  'react-dom',
]
const REACT_NATIVE_EXTERNAL_LIBS = [
  ...REACT_BUNDLE_EXTERNAL_LIBS,
  'react-native',
]
const REACT_BUNDLE_UMD_GLOBALS = {
  ...MAIN_BUNDLE_UMD_GLOBALS,
  react: 'React',
  'hoist-non-react-statics': 'hoistNonReactStatics',
  'react-dom': 'ReactDOM',
}

interface PluginConfigSchema {
  overrides?: Record<string, unknown>
  mode?: 'development' | 'production'
  buildType: LangutilBuildType
  presets?: Array<string>
}

function getPlugins(config: PluginConfigSchema): Array<RollupPlugin> {
  const {
    overrides = {},
    mode,
    presets = [],
    buildType,
  } = config
  const basePlugins = {
    nodeResolve: nodeResolve(BASE_NODE_RESOLVE_CONFIG),
    autoImportReact: autoImportReact(),
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
    'process.env.BUILD_HASH': JSON.stringify(
      execSync('git rev-parse HEAD').toString().trim()
    ),
    'process.env.BUILD_TYPE': JSON.stringify(buildType),
    'process.env.IS_INTERNAL_DEBUG_ENV': JSON.stringify('false'),
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

  return pluginStack

}

const coreConfig: Array<RollupOptions> = [
  {
    // CommonJS
    input: MAIN_INPUT_FILE,
    output: {
      file: 'lib/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    external: MAIN_BUNDLE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.CJS,
    }),
  },
  {
    // EcmaScript
    input: MAIN_INPUT_FILE,
    output: {
      file: 'lib/es/index.js',
      format: 'es',
      exports: 'named',
    },
    external: MAIN_BUNDLE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.ES,
    }),
  },
  {
    // EcmaScript (Browsers)
    input: MAIN_INPUT_FILE,
    output: {
      file: 'lib/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    external: MAIN_BUNDLE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.MJS,
      mode: 'production',
    }),
  },
  {
    // React Native
    input: MAIN_INPUT_FILE,
    output: {
      file: 'lib/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: REACT_NATIVE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.RN,
      overrides: {
        nodeResolve: nodeResolve(NODE_RESOLVE_CONFIG_REACT_NATIVE),
      },
    }),
  },
  {
    // UMD
    input: MAIN_INPUT_FILE,
    output: {
      file: 'lib/umd/index.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    external: MAIN_BUNDLE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.UMD,
      mode: 'development',
    }),
  },
  {
    // UMD (Minified)
    input: MAIN_INPUT_FILE,
    output: {
      file: 'lib/umd/index.min.js',
      format: 'umd',
      name: 'Langutil',
      exports: 'named',
    },
    external: MAIN_BUNDLE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.UMD_MIN,
      mode: 'production',
    }),
  },
]

const reactConfig: Array<RollupOptions> = [
  {
    // CommonJS
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/lib/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    external: REACT_DOM_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.CJS,
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // EcmaScript
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/lib/es/index.js',
      format: 'es',
      exports: 'named',
    },
    external: REACT_DOM_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.ES,
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // EcmaScript (Browsers)
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/lib/es/index.mjs',
      format: 'es',
      exports: 'named',
    },
    external: REACT_DOM_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.MJS,
      mode: 'production',
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // React Native
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/lib/native/index.js',
      format: 'es',
      exports: 'named',
    },
    external: REACT_NATIVE_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.RN,
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
      file: 'react/lib/umd/index.js',
      format: 'umd',
      name: 'LangutilReact',
      exports: 'named',
      globals: REACT_BUNDLE_UMD_GLOBALS,
    },
    external: REACT_DOM_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.UMD,
      mode: 'development',
      presets: ['@babel/preset-react'],
    }),
  },
  {
    // UMD (Minified)
    input: REACT_INPUT_FILE,
    output: {
      file: 'react/lib/umd/index.min.js',
      format: 'umd',
      name: 'LangutilReact',
      exports: 'named',
      globals: REACT_BUNDLE_UMD_GLOBALS,
    },
    external: REACT_DOM_EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: LangutilBuildType.UMD_MIN,
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

/**
 * Automatically `imports React from "react"` if a file ends with '.tsx'.
 */
function autoImportReact() {
  return {
    name: 'autoImportReact',
    transform(code, id) {
      if (/tsx/gi.test(id)) {
        code = 'import React from "react";\n' + code
        return { code }
      }
      return null
    },
  }
}
