import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

wrapper(({ Langutil, buildEnv, buildType }: IntegrationTestConfig): void => {
  test('main', (): void => {
    if (buildEnv === 'debug') {
      expect(Langutil.BUILD_TYPE).toBe(undefined)
    } else if (buildType === 'cjs') {
      expect(Langutil.BUILD_TYPE).toBe(Langutil.LangutilBuildType.CJS)
    } else if (buildType === 'es') {
      if (buildEnv === 'dev') {
        expect(Langutil.BUILD_TYPE).toBe(Langutil.LangutilBuildType.ES)
      } else if (buildEnv === 'prod') {
        expect(Langutil.BUILD_TYPE).toBe(Langutil.LangutilBuildType.MJS)
      }
    } else if (buildType === 'umd') {
      if (buildEnv === 'dev') {
        expect(Langutil.BUILD_TYPE).toBe(Langutil.LangutilBuildType.UMD)
      } else if (buildEnv === 'prod') {
        expect(Langutil.BUILD_TYPE).toBe(Langutil.LangutilBuildType.UMD_MIN)
      }
    } else {
      throw new Error(`Unexpected condition: ${JSON.stringify({
        buildEnv,
        buildType,
      })}`)
    }
  })
})
