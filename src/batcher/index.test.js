import { createBatcher } from './'

describe('createBatcher', () => {
  jest.useFakeTimers()

  it('All callbacks are fired', () => {
    let counter = 0
    const batch = createBatcher()
    batch(() => {
      counter += 1
    })
    batch(() => {
      counter += 1
    })
    batch(() => {
      counter += 1
    })
    jest.advanceTimersByTime()
    expect(counter).toBe(3)
  })
})
