type VirtualBatchedCallback = (...args: Array<unknown>) => unknown

export type VirtualBatchFunction = (callback: VirtualBatchedCallback) => void

export function createVirtualBatcher(): VirtualBatchFunction {
  // Here we use `number` instead of `ReturnType<typeof setTimeout>` because
  // we only want batching on client-side.
  let debounceRef: number
  const deferredCallbackStack: Array<VirtualBatchedCallback> = []
  const batch = (callback: VirtualBatchedCallback) => {
    if (window) {
      window.clearTimeout(debounceRef)
      deferredCallbackStack.push(callback)
      debounceRef = window.setTimeout(() => {
        while (deferredCallbackStack.length > 0) {
          // Returned item is a function, since there's nothing extra to do
          // with it, the function is invoked right away.
          deferredCallbackStack.shift()()
        }
      })
    } else {
      callback()
    }
  }
  return batch
}
