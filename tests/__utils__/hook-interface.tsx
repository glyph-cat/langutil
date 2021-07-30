import React, { Component as ReactComponent, Fragment, useLayoutEffect } from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

// Type explanation:
// A: action
// V: values
// K: Channel key
// M: Method (The hook function)


// === Cleanup Ref ===
const $$cleanupQueue = Symbol()

export interface CleanupRef {
  /**
   * @internal
   */
  [$$cleanupQueue]: Array<unknown>
  /**
   * @public
   */
  run(): void
}

function appendCleanupQueue(
  cleanupRef: CleanupRef,
  callback: () => void
): void {
  cleanupRef[$$cleanupQueue].push(callback)
}

export function createCleanupRef(): CleanupRef {
  const self = {
    [$$cleanupQueue]: [],
    run: () => {
      for (let i = 0; i < self[$$cleanupQueue].length; i++) {
        self[$$cleanupQueue][i]()
      }
    },
  }
  return self
}

// === Misc. ===

export interface RootRef {
  current: ReactTestRenderer
}

// === Hook ===

type UNSTABLE_FunctionType = (...args: Array<unknown>) => unknown

export interface HookInterfaceHookSpecs<M extends UNSTABLE_FunctionType> {
  method: M
  parameters?: Array<unknown>
}

/**
 * @public
 */
export interface HookInterfaceActionDefinition<M extends UNSTABLE_FunctionType> {
  (arg: { hookValue: ReturnType<M> }): void
}

/**
 * @public
 */
export interface HookInterfaceValueMapper<M extends UNSTABLE_FunctionType> {
  (arg: { hookValue: ReturnType<M> }): string
}

/**
 * @public
 */
export interface HookInterfaceChannel<A extends string, V extends string, M extends UNSTABLE_FunctionType> {
  hook: HookInterfaceHookSpecs<M>
  actions?: Record<A, HookInterfaceActionDefinition<M>>
  values?: Record<V, HookInterfaceValueMapper<M>>
}

/**
 * @public
 */
export type HookInterfaceChannelsCollection<K extends string, A extends string, V extends string, M extends UNSTABLE_FunctionType> = Record<K, HookInterfaceChannel<A, V, M>>

/**
 * @public
 */
export interface HookInterface<A extends string, V extends string> {
  root: RootRef,
  actions(actionKeyStack: Array<A>): void,
  get(valueKey: V): string
  getRenderCount(): number
}

/**
 * @public
 */
export interface CompoundHookInterface<K extends string, A extends string, V extends string> {
  root: RootRef,
  at(channelKey: K): Omit<HookInterface<A, V>, 'root'>
}

/**
 * A wrapper for testing a React Hook by abstracting the DOM container's logic.
 * @public
 */
export function createHookInterface<A extends string, V extends string, M extends UNSTABLE_FunctionType>(
  config: HookInterfaceChannel<A, V, M>,
  cleanupRef: CleanupRef
): HookInterface<A, V> {
  const chi = createCompoundHookInterface({ a: config }, cleanupRef)
  return {
    root: chi.root,
    actions: chi.at('a').actions,
    get: chi.at('a').get,
    getRenderCount: chi.at('a').getRenderCount,
  }
}

/**
 * A wrapper for testing multiple React Hooks by abstracting the DOM container's
 * logic.
 * @public
 */
export function createCompoundHookInterface<K extends string, A extends string, V extends string, M extends UNSTABLE_FunctionType>(
  channels: HookInterfaceChannelsCollection<K, A, V, M>,
  cleanupRef: CleanupRef
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
        const actionCallback = actions[actionKey]
        outlets[channelKey].dispatchableActions[actionKey] = () => {
          actionCallback({ hookValue: hookData })
        }
      }

      const valueKeys = Object.keys(values)
      outlets[channelKey].retrievableValues = {}
      for (const valueKey of valueKeys) {
        const valueMapper = values[valueKey]
        // All values should be casted to string
        const mappedValue = `${valueMapper({ hookValue: hookData })}`
        outlets[channelKey].retrievableValues[valueKey] = mappedValue
      }

      return null
    }

    renderStack.push(<ChildComponent key={channelKey} />)
  }

  let root: ReactTestRenderer
  act(() => { root = create(<Fragment children={renderStack} />) })
  appendCleanupQueue(cleanupRef, root.unmount)

  return {
    root: { current: root },
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
  }
}

// NOTE: I don't have enough knowledge on how to make this work, so I'm only
// using the `any` type for HOCs...

/**
 * @public
 */
export interface HocInterfaceChannel<A extends string, V extends string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Record<A, (props: any) => void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: Record<V, (hookData: ReturnType<any>) => string>
}

/**
 * @public
 */
export interface HocInterfaceConfig<A extends string, V extends string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry(entryArgs: { Component: any }): any
  actions?: HocInterfaceChannel<A, V>['actions']
  values?: HocInterfaceChannel<A, V>['values']
}

/**
 * @public
 */
export interface HocInterface<A extends string, V extends string> {
  root: RootRef
  actions(actionKeyStack: Array<A>): void,
  get(valueKey: V): string
  getRenderCount(): number
}

/**
 * @public
 */
export function createHocInterface<A extends string, V extends string>(
  config: HocInterfaceConfig<A, V>,
  cleanupRef: CleanupRef
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
        const actionCallback = actions[actionKey]
        dispatchableActions[actionKey] = () => {
          actionCallback({ props: this.props })
        }
      }

      const valueKeys = Object.keys(values)
      retrievableValues = {}
      for (const valueKey of valueKeys) {
        const valueMapper = values[valueKey]
        // All values should be casted to string
        const mappedValue = valueMapper({ props: this.props })
        retrievableValues[valueKey] = `${mappedValue}`
      }
    }

  }

  let root: ReactTestRenderer
  act(() => {
    // Parameters are first applied then passed in as a component, example
    // entry: ({ Component }) => withHoc(Component, options)
    const WrappedComponent = entry({ Component })
    root = create(<WrappedComponent />)
  })
  appendCleanupQueue(cleanupRef, root.unmount)

  return {
    root: { current: root },
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
  }
}
