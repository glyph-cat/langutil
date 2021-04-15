import { createBasicListener } from './'

describe('createBasicListener', () => {
  jest.useFakeTimers()

  // Initialization
  let counter = 0
  const listener = createBasicListener()
  const listenerId = listener.M$add((newValue) => {
    counter += newValue
  })

  it('Fire one event', () => {
    listener.M$refresh(1)
    jest.advanceTimersByTime()
    expect(counter).toBe(1)
  })

  it('Fire multiple events', () => {
    listener.M$refresh(2)
    listener.M$refresh(2)
    jest.advanceTimersByTime()
    expect(counter).toBe(5)
  })

  it('Cleanup', () => {
    listener.M$remove(listenerId)
    listener.M$refresh(1)
    jest.advanceTimersByTime()
    expect(counter).toBe(5) // Make sure counter is no longer updated
  })
})

// describe('createLangutilListener', () => {
//   jest.useFakeTimers()

//   // Initialization
//   let counter = 0
//   const listener = createLangutilListener()
//   const listenerId = listener.M$add((event) => {
//     // ...
//   })

//   it('Fire one event', () => {
//     expect().toBe()
//   })
// })
