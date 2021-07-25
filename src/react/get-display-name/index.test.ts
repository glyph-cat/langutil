import getDisplayName from '.'

describe('getDisplayName', () => {

  test('Provided: (none)', () => {
    const MyComponent = (): JSX.Element => null
    const output = getDisplayName(MyComponent)
    expect(output).toBe('MyComponent')
  })

  test('Provided: display name', () => {
    const MyComponent = (): JSX.Element => null
    MyComponent.displayName = 'foo'
    const output = getDisplayName(MyComponent)
    expect(output).toBe('foo')
  })

})
