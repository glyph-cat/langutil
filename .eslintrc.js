const { configs } = require('@glyph-cat/eslint-config')

const strictConfigs = configs.strict

module.exports = {
  root: true,
  ...strictConfigs,
  plugins: [
    ...strictConfigs.plugins,
    'eslint-plugin-functional',
  ],
}
