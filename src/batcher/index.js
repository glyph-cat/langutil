export function createBatcher() {
  let debounceRef
  const deferredCallbackStack = []
  const batch = (callback) => {
    clearTimeout(debounceRef)
    deferredCallbackStack.push(callback)
    debounceRef = setTimeout(() => {
      while (deferredCallbackStack.length > 0) {
        // Returned item is a function, since there's nothing extra to do with it,
        // the function is invoked right away with double brackets
        deferredCallbackStack.shift()()
      }
    })
  }
  return batch
}
