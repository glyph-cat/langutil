import { IntegrationTestProps } from '../../constants'
import { version as VERSION_FROM_PACKAGE_JSON } from '../../../../package.json'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil, buildEnv } = testProps

  test('VERSION is exported properly', () => {
    if (buildEnv.tag === 'Debug') {
      expect(Langutil.VERSION).toBe(undefined)
    } else {
      expect(Langutil.VERSION).toBe(VERSION_FROM_PACKAGE_JSON)
    }
  })

}
