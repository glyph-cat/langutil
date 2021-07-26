import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps

  describe('stringmap', () => {

    test('Array as param', () => {
      const { stringmap } = Langutil
      const output = stringmap('Hello %p {:name}', ['John'])
      expect(output).toBe('Hello John {:name}')
    })

    test('Object as param', () => {
      const { stringmap } = Langutil
      const output = stringmap('Hello %p {:name}', { name: 'John' })
      expect(output).toBe('Hello %p John')
    })

    test('Invalid param', () => {
      const { stringmap } = Langutil
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Ignored on purpose to test incorrect types
      const callback = () => { stringmap('', 42) }
      expect(callback).toThrow(TypeError)
    })

  })

}
