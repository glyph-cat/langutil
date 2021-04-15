import { createBatcher } from '../batcher'

export function createBasicListener() {
  let counter = 0
  const batch = createBatcher()
  const subscribers = {}
  return {
    M$add: (callback) => {
      const newId = ++counter
      subscribers[newId] = callback
      return newId
    },
    M$remove: (id) => {
      delete subscribers[id]
    },
    M$refresh: (...args) => {
      batch(() => {
        const listenerStack = Object.values(subscribers)
        for (const listener of listenerStack) {
          listener(...args)
        }
      })
    },
  }
}

export function createLangutilListener() {
  const listener = createBasicListener()
  return {
    M$add: listener.M$add,
    M$remove: listener.M$remove,
    /**
     * @param {import('../../').LangutilEventType} eventType
     * @param {import('../../').LangutilEvent<object>} eventData
     */
    M$refresh: (eventType, { oldLangState, newLangState }) => {
      listener.M$refresh({
        type: eventType,
        data: { oldLangState, newLangState },
      })
    },
  }
}
