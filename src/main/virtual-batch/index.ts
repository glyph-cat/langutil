import { IS_BROWSER_ENV } from '../../constants'

type VirtualBatchedCallback = (...args: Array<unknown>) => unknown

export type VirtualBatchFunction = (callback: VirtualBatchedCallback) => void

export function createBrowserBatcher(): VirtualBatchFunction {
  let debounceRef: ReturnType<typeof setTimeout>
  const deferredCallbackStack: Array<VirtualBatchedCallback> = []
  const batch = (callback: VirtualBatchedCallback) => {
    clearTimeout(debounceRef)
    deferredCallbackStack.push(callback)
    debounceRef = setTimeout(() => {
      while (deferredCallbackStack.length > 0) {
        // Returned item is a function, since there's nothing extra to do
        // with it, the function is invoked right away.
        deferredCallbackStack.shift()()
      }
    })
  }
  return batch
}

export function createServerBatcher(): VirtualBatchFunction {
  const batch = (callback: VirtualBatchedCallback) => { callback() }
  return batch
}

export function createVirtualBatcher(): VirtualBatchFunction {
  return IS_BROWSER_ENV
    ? createBrowserBatcher()
    : createServerBatcher()
}

// NOTE: The solution below is the most optimal but for reasons unknown to me,
// I was unable to instruct jest to run in separate environments.

// References:
// https://jestjs.io/docs/configuration#testenvironment-string
// https://github.com/facebook/jest/issues/3280

// export function createVirtualBatcher(): VirtualBatchFunction {
//   // Here we use `number` instead of `ReturnType<typeof setTimeout>` because
//   // we only want batching on client-side.
//   let debounceRef: number
//   const deferredCallbackStack: Array<VirtualBatchedCallback> = []
//   const batch = (callback: VirtualBatchedCallback) => {
//     if (typeof window !== 'undefined') {
//       window.clearTimeout(debounceRef)
//       deferredCallbackStack.push(callback)
//       debounceRef = window.setTimeout(() => {
//         while (deferredCallbackStack.length > 0) {
//           // Returned item is a function, since there's nothing extra to do
//           // with it, the function is invoked right away.
//           deferredCallbackStack.shift()()
//         }
//       })
//     } else {
//       callback()
//     }
//   }
//   return batch
// }
