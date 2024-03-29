const { configs } = require('@glyph-cat/eslint-config')

const strictConfigs = configs.strict
const [NRIstatus, NRIconfig] = strictConfigs.rules['no-restricted-imports']

module.exports = {
  root: true,
  ...strictConfigs,
  plugins: [
    ...strictConfigs.plugins,
    'eslint-plugin-functional',
  ],
  rules: {
    ...strictConfigs.rules,
    'no-restricted-imports': [NRIstatus, {
      ...NRIconfig,
      paths: [
        ...[...NRIconfig.paths].filter((value) => {
          return value.name !== 'react'
        }),
      ],
    }],
  },
}
