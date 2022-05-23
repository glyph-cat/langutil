import { getDisplayName } from '.'

describe(getDisplayName.name, (): void => {

  test('Nothing provided', (): void => {
    const MyComponent = (): JSX.Element => null
    const output = getDisplayName(MyComponent)
    expect(output).toBe('MyComponent')
  })

  test('Provided: static `displayName`', (): void => {
    const MyComponent = (): JSX.Element => null
    MyComponent.displayName = 'foo'
    const output = getDisplayName(MyComponent)
    expect(output).toBe('foo')
  })

  test('Unavailable', (): void => {
    const MyComponent = (): JSX.Element => null
    delete MyComponent['displayName']
    const output = getDisplayName(MyComponent)
    expect(output).toBe('Unknown')
  })

})
