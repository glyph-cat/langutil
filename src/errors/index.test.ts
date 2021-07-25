import {
  __formatErrorCode,
  TYPE_ERROR_DICTIONARY_INVALID_TYPE,
  TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE,
  SYNTAX_ERROR_CONFLICTING_LANGSTATE_PROP,
} from '.'

describe('__formatErrorCode', () => {
  const args = ['foo', 'bar', 'baz']
  const output = __formatErrorCode(1, ...args)
  expect(output).toBe('LangutilE1-foo,bar,baz')
})

describe('TYPE_ERROR_DICTIONARY_INVALID_TYPE', () => {
  const err = TYPE_ERROR_DICTIONARY_INVALID_TYPE(42)
  expect(err.message).toBe('Expected `dictionary` to be an object but got number')
})

describe('TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE', () => {
  const err = TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE(42)
  expect(err.message).toBe(
    'Expected `param` to be an array or object but got number'
  )
})

describe('SYNTAX_ERROR_CONFLICTING_LANGSTATE_PROP', () => {
  const err = SYNTAX_ERROR_CONFLICTING_LANGSTATE_PROP('MyComponent')
  expect(err.message).toBe('Prop conflict for `langState` in <MyComponent/>')
})
