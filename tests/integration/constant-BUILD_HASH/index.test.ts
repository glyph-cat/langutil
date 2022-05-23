import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

wrapper(({ Langutil, buildEnv }: IntegrationTestConfig): void => {
  test('main', (): void => {
    if (buildEnv === 'debug') {
      expect(Langutil.BUILD_HASH).toBe(undefined)
    } else {
      expect(Langutil.BUILD_HASH).toMatch(/^[a-f0-9]{40}$/)
    }
  })
})
