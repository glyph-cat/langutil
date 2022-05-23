const OFF = 0

module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': OFF,
      },
    },
  ],
}
