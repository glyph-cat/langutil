import { IntegrationTestProps } from '../../constants'
import { version as VERSION_FROM_PACKAGE_JSON } from '../../../../package.json'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps

  test('VERSION is exported properly', () => {
    expect(Langutil.VERSION).toBe(VERSION_FROM_PACKAGE_JSON)
  })

}
