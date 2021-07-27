import { IntegrationTestProps } from '../../constants'

export default function (testProps: IntegrationTestProps): void {

  const { Langutil } = testProps
  const { stringmap } = Langutil

  describe('stringmap', () => {

    test('Array as param', () => {
      const output = stringmap('Hello %p {:name}', ['John'])
      expect(output).toBe('Hello John {:name}')
    })

    test('Object as param', () => {
      const output = stringmap('Hello %p {:name}', { name: 'John' })
      expect(output).toBe('Hello %p John')
    })

    test('Invalid param', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Ignored on purpose to test incorrect types
      const callback = () => { stringmap('', 42) }
      expect(callback).toThrow(TypeError)
    })

  })

}
