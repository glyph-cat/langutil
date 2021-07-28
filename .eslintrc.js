const OFF = 0
// const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['eslint-plugin-functional', 'eslint-plugin-import'],
  rules: {

    // === Code Health ===
    // Problems that fall under this category may produce nasty bugs
    // NOTE: Some of the rules below are turned off because they trigger false
    // positives in JavaScript files. They are re-enabled exclusively for
    // TypeScript in the `overrides` section.
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': [ERROR, { ignoreRestArgs: true }],
    '@typescript-eslint/no-shadow': [ERROR],
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
    '@typescript-eslint/no-var-requires': OFF,
    'eqeqeq': [ERROR, 'always'],
    'import/no-cycle': ERROR,
    'import/no-deprecated': ERROR,
    'import/no-unresolved': ERROR,
    'no-duplicate-imports': ERROR,
    'no-console': ERROR,
    'no-shadow': OFF, // See '@typescript-eslint/no-shadow'

    // === Code that requires attention ===
    'no-warning-comments': ['warn', {
      terms: ['TODO', 'TOFIX', 'KIV'],
    }],

    // === Code Styles ===
    // Problems that fall under this category will at most make the codebase
    // look inconsistent

    'import/newline-after-import': ERROR,
    indent: [ERROR, 2],
    'lines-between-class-members': [
      ERROR,
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-irregular-whitespace': [
      ERROR,
      {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    'no-restricted-imports': [ERROR, {
      name: 'jest',
      importNames: ['it'],
      message: 'Please import `test` instead',
    }],
    'no-trailing-spaces': ERROR,
    'operator-linebreak': [
      ERROR,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'padded-blocks': [
      ERROR,
      {
        classes: 'always',
        switches: 'never',
      },
      { allowSingleLineBlocks: true },
    ],
    'quotes': [ERROR, 'single'],
    'semi': [ERROR, 'never'],
    'yoda': [ERROR, 'never'],

    // React
    'react/no-children-prop': OFF,
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': OFF,

  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ERROR,
        '@typescript-eslint/no-var-requires': ERROR,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'react': {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },
  },
}
