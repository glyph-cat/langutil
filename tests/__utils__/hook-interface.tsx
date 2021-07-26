import { Component as ReactComponent, Fragment, useLayoutEffect } from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

export interface HookInterfaceChannel<A extends string, V extends string> {
  hook: {
    method(...args: Array<unknown>): unknown
    parameters?: Array<unknown>
  }
  actions?: Record<A, (...args: Array<unknown>) => void>
  values?: Record<V, (...args: Array<unknown>) => string>
}

export type HookInterfaceChannelsCollection<A extends string, V extends string> = Record<string, HookInterfaceChannel<A, V>>

export interface HookInterface<A extends string, V extends string> {
  actions(actionKeyStack: Array<A>): void,
  get(valueKey: V): string
  getRenderCount(): number
  cleanup(): void
}

export interface CompoundHookInterface<A extends string, V extends string> {
  at(channelKey: string): Omit<HookInterface<A, V>, 'cleanup'>
  cleanup: HookInterface<A, V>['cleanup'],
}

export interface HocInterfaceConfig<A extends string, V extends string> {
  entry<E>(entryArgs: { C: E }): E
  actions?: HookInterfaceChannel<A, V>['actions']
  values?: HookInterfaceChannel<A, V>['values']
}

export type HocInterface<A extends string, V extends string> = HookInterface<A, V>

/**
 * A wrapper for testing React Hooks by abstracting the DOM container's logic.
 */
export function createHookInterface<A extends string, V extends string>(
  config: HookInterfaceChannel<A, V>
): HookInterface<A, V> {

  const { hook, actions = {}, values = {} } = config

  let renderCount = 0
  let dispatchableActions = {}
  let retrievableValues = {}

  const Component = () => {

    const providedHook = hook.method(...hook.parameters)

    useLayoutEffect(() => { renderCount += 1 })

    const actionKeys = Object.keys(actions)
    dispatchableActions = {}
    for (const actionKey of actionKeys) {
      const callback = actions[actionKey]
      dispatchableActions[actionKey] = () => {
        callback({ H: providedHook })
      }
    }

    const valueKeys = Object.keys(values)
    retrievableValues = {}
    for (const valueKey of valueKeys) {
      const valueMapper = values[valueKey]
      // All values should be casted to string
      retrievableValues[valueKey] = '' + valueMapper(providedHook)
    }

    return null

  }

  let root: ReactTestRenderer
  act(() => { root = create(<Component />) })

  return {
    actions: (actionKeyStack: Array<string>) => {
      if (!Array.isArray(actionKeyStack)) {
        // This allows multiple actions to be invoked in the same `act()` callback
        actionKeyStack = [actionKeyStack]
      }
      act(() => {
        // Array of actions are batched in one `act()`
        for (const actionKey of actionKeyStack) {
          if (!dispatchableActions[actionKey]) {
            throw new ReferenceError(`Action '${actionKey}' is undefined`)
          }
          dispatchableActions[actionKey]()
        }
      })
    },
    get: (valueKey: string) => {
      if (!retrievableValues[valueKey]) {
        throw new ReferenceError(`Value '${valueKey}' is undefined`)
      }
      return retrievableValues[valueKey]
    },
    getRenderCount: () => renderCount,
    cleanup: root.unmount,
  }
}

export function createCompoundHookInterface<A extends string, V extends string>(
  channels: HookInterfaceChannelsCollection<A, V> = {}
): CompoundHookInterface<A, V> {

  const renderStack = []
  const renderCount = {}
  const outlets = {}

  const channelKeys = Object.keys(channels)
  for (const channelKey of channelKeys) {
    renderCount[channelKey] = 0
    outlets[channelKey] = {
      dispatchableActions: {},
      retrievableValues: {},
    }
    const { hook, actions = {}, values = {} } = channels[channelKey]

    const ChildComponent = () => {
      const providedHook = hook.method(...hook.parameters)
      useLayoutEffect(() => {
        renderCount[channelKey] += 1
      })

      const actionKeys = Object.keys(actions)
      outlets[channelKey].dispatchableActions = {}
      for (const actionKey of actionKeys) {
        const callback = actions[actionKey]
        outlets[channelKey].dispatchableActions[actionKey] = () => {
          callback({ H: providedHook })
        }
      }

      const valueKeys = Object.keys(values)
      outlets[channelKey].retrievableValues = {}
      for (const valueKey of valueKeys) {
        const valueMapper = values[valueKey]
        // All values should be casted to string
        outlets[channelKey].retrievableValues[valueKey] =
          '' + valueMapper(providedHook)
      }

      return null
    }

    renderStack.push(<ChildComponent key={channelKey} />)
  }

  let root: ReactTestRenderer
  act(() => { root = create(<Fragment children={renderStack} />) })

  return {
    at: (channelKey: string) => {
      if (!outlets[channelKey]) {
        throw new ReferenceError(`Channel '${channelKey}' is undefined`)
      }
      return {
        actions: (actionKeyStack: Array<string>) => {
          if (!Array.isArray(actionKeyStack)) {
            // This allows multiple actions to be invoked in the same `act()` callback
            actionKeyStack = [actionKeyStack]
          }
          act(() => {
            // Array of actions are batched in one `act()`
            for (const actionKey of actionKeyStack) {
              if (!outlets[channelKey].dispatchableActions[actionKey]) {
                throw new ReferenceError(
                  `Action '${actionKey} in '${channelKey}' is undefined`
                )
              }
              outlets[channelKey].dispatchableActions[actionKey]()
            }
          })
        },
        get: (valueKey: string) => outlets[channelKey].retrievableValues[valueKey],
        getRenderCount: () => renderCount[channelKey],
      }
    },
    cleanup: root.unmount,
  }
}

export function createHocInterface<A extends string, V extends string>(
  config: HocInterfaceConfig<A, V>
): HocInterface<A, V> {

  const { entry, actions = {}, values = {} } = config

  let renderCount = 0
  let dispatchableActions = {}
  let retrievableValues = {}

  class Component extends ReactComponent {

    render() {
      return null
    }

    componentDidMount() {
      this.componentDidEffect()
    }

    componentDidUpdate() {
      this.componentDidEffect()
    }

    componentDidEffect() {
      renderCount += 1
      const actionKeys = Object.keys(actions)
      dispatchableActions = {}
      for (const actionKey of actionKeys) {
        const callback = actions[actionKey]
        dispatchableActions[actionKey] = () => {
          callback(this.props)
        }
      }

      const valueKeys = Object.keys(values)
      retrievableValues = {}
      for (const valueKey of valueKeys) {
        const valueMapper = values[valueKey]
        // All values should be casted to string
        retrievableValues[valueKey] = '' + valueMapper(this.props)
      }
    }

  }

  let root: ReactTestRenderer
  act(() => {
    // Parameters are first applied then passed in as a component, example
    // entry: ({ C }) => withHoc(C, options)
    const WrappedComponent = entry({ C: Component })
    root = create(<WrappedComponent />)
  })

  return {
    actions: (actionKeyStack: Array<string>) => {
      if (!Array.isArray(actionKeyStack)) {
        // This allows multiple actions to be invoked in the same `act()` callback
        actionKeyStack = [actionKeyStack]
      }
      act(() => {
        // Array of actions are batched in one `act()`
        for (const actionKey of actionKeyStack) {
          if (!dispatchableActions[actionKey]) {
            throw new ReferenceError(`Action '${actionKey}' is undefined`)
          }
          dispatchableActions[actionKey]()
        }
      })
    },
    get: (valueKey: string) => {
      if (!retrievableValues[valueKey]) {
        throw new ReferenceError(`Value '${valueKey}' is undefined`)
      }
      return retrievableValues[valueKey]
    },
    getRenderCount: () => renderCount,
    cleanup: root.unmount,
  }
}
