/**
 * Creates a Watcher.
 * @returns A Watcher object.
 * @example
 * const watcher = new Watcher()
 *
 * const unwatch = watcher.watch(() => { ... })
 *
 * // Arguments (if provided) will be passed to all subscribed callbacks
 * watcher.refresh(...)
 *
 * unwatch()
 */
export class Watcher<P> {

  private incrementalWatchId = 0
  private watcherMap: Map<number, CallableFunction> = new Map()

  M$watch = (callback: ((...args: Array<P>) => void)): (() => void) => {
    const newId = ++this.incrementalWatchId
    this.watcherMap.set(newId, callback)
    const unwatch = (): void => {
      this.watcherMap.delete(newId)
    }
    return unwatch
  }

  M$refresh = (...args: Array<P>): void => {
    this.watcherMap.forEach((callback) => {
      callback(...args)
    })
  }

}
