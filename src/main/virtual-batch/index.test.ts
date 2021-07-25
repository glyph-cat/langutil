import { createVirtualBatcher } from '.'

describe('createBatcher', () => {
  jest.useFakeTimers()

  it('All callbacks are fired', () => {
    let counter = 0
    const batch = createVirtualBatcher()
    batch(() => {
      counter += 1
    })
    batch(() => {
      counter += 1
    })
    batch(() => {
      counter += 1
    })
    jest.advanceTimersByTime(0)
    expect(counter).toBe(3)
  })
})
