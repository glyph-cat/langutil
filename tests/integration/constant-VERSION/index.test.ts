import pkg from '../../../package.json'
import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

wrapper(({ Langutil, buildEnv }: IntegrationTestConfig): void => {
  test('main', () => {
    if (buildEnv === 'debug') {
      expect(Langutil.VERSION).toBe(undefined)
    } else {
      expect(Langutil.VERSION).toBe(pkg.version)
    }
  })
})
