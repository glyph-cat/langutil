import React, { Component as ReactComponent, Fragment, useLayoutEffect } from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

// Type explanation:
// A: action
// V: values
// K: Channel key
// M: Method (The hook function)

type FunctionType = (...args: Array<unknown>) => unknown

export interface HookInterfaceChannel<A extends string, V extends string, M extends FunctionType> {
  hook: {
    method: M
    parameters?: Array<unknown>
  }
  actions?: Record<A, (arg: { H: ReturnType<M> }) => void>
  values?: Record<V, (hookData: ReturnType<M>) => string>
}

export type HookInterfaceChannelsCollection<K extends string, A extends string, V extends string, M extends FunctionType> = Record<K, HookInterfaceChannel<A, V, M>>

export interface HookInterface<A extends string, V extends string> {
  actions(actionKeyStack: Array<A>): void,
  get(valueKey: V): string
  getRenderCount(): number
  cleanup(): void
}

export interface CompoundHookInterface<K extends string, A extends string, V extends string> {
  at(channelKey: K): Omit<HookInterface<A, V>, 'cleanup'>
  cleanup: HookInterface<A, V>['cleanup'],
}

/**
 * A wrapper for testing a React Hook by abstracting the DOM container's logic.
 */
export function createHookInterface<A extends string, V extends string, M extends FunctionType>(
  config: HookInterfaceChannel<A, V, M>
): HookInterface<A, V> {
  const chi = createCompoundHookInterface({ a: config })
  return {
    actions: chi.at('a').actions,
    get: chi.at('a').get,
    getRenderCount: chi.at('a').getRenderCount,
    cleanup: chi.cleanup,
  }
}

/**
 * A wrapper for testing multiple React Hooks by abstracting the DOM container's
 * logic.
 */
export function createCompoundHookInterface<K extends string, A extends string, V extends string, M extends FunctionType>(
  channels: HookInterfaceChannelsCollection<K, A, V, M>
): CompoundHookInterface<K, A, V> {

  const renderStack = []
  const renderCount = {}
  const outlets = {}

  const channelKeys = Object.keys(channels)
  for (let i = 0; i < channelKeys.length; i++) {
    const channelKey = channelKeys[i]

    renderCount[channelKey] = 0
    outlets[channelKey] = {
      dispatchableActions: {},
      retrievableValues: {},
    }
    const { hook, actions = {}, values = {} } = channels[channelKey]
    const { method: hookMethod, parameters: hookParameters = [] } = hook

    const ChildComponent = () => {
      const hookData = hookMethod(...hookParameters)
      useLayoutEffect(() => { renderCount[channelKey] += 1 })

      const actionKeys = Object.keys(actions)
      outlets[channelKey].dispatchableActions = {}
      for (const actionKey of actionKeys) {
        const callback = actions[actionKey]
        outlets[channelKey].dispatchableActions[actionKey] = () => {
          callback({ H: hookData })
        }
      }

      const valueKeys = Object.keys(values)
      outlets[channelKey].retrievableValues = {}
      for (const valueKey of valueKeys) {
        const valueMapper = values[valueKey]
        // All values should be casted to string
        outlets[channelKey].retrievableValues[valueKey] = `${valueMapper(hookData)}`
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

// NOTE: I don't have enough knowledge on how to make this work, so I'm only
// using the `any` type for HOCs...

export interface HocInterfaceChannel<A extends string, V extends string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Record<A, (props: any) => void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: Record<V, (hookData: ReturnType<any>) => string>
}

export interface HocInterfaceConfig<A extends string, V extends string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry(entryArgs: { C: any }): any
  actions?: HocInterfaceChannel<A, V>['actions']
  values?: HocInterfaceChannel<A, V>['values']
}

export interface HocInterface<A extends string, V extends string> {
  actions(actionKeyStack: Array<A>): void,
  get(valueKey: V): string
  getRenderCount(): number
  cleanup(): void
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
