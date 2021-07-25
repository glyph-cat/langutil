module.exports = {
  env: {
    test: {
      presets: [
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  },
  // Moved out of `env/test` to support linting
  plugins: [
    ['@babel/plugin-transform-react-jsx', { pragma: 'React.createElement' }],
    '@babel/plugin-proposal-class-properties',
  ],
}
