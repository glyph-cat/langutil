import { IntegrationTestConfig } from '../../helpers'
import { wrapper } from '../wrapper'

wrapper(({ Langutil: { stringmap } }: IntegrationTestConfig): void => {

  test('Array as param', (): void => {
    const output = stringmap('Hello %p {:name}', ['John'])
    expect(output).toBe('Hello John {:name}')
  })

  test('Object as param', (): void => {
    const output = stringmap('Hello %p {:name}', { name: 'John' })
    expect(output).toBe('Hello %p John')
  })

  test('Invalid param', (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error: Ignored on purpose to test incorrect types.
    const callback = () => { stringmap('', 42) }
    expect(callback).toThrow(TypeError)
  })

})
