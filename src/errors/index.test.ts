import {
  __formatErrorCode,
  TYPE_ERROR_DICTIONARY_INVALID_TYPE,
  TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE,
  SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP,
} from '.'

test('__formatErrorCode', () => {
  const args = ['foo', 'bar', 'baz']
  const output = __formatErrorCode(1, ...args)
  expect(output).toBe('LangutilE1-foo,bar,baz')
})

test('TYPE_ERROR_DICTIONARY_INVALID_TYPE', () => {
  const err = TYPE_ERROR_DICTIONARY_INVALID_TYPE(42)
  expect(err.message).toBe('Expected `dictionary` to be an object but got number')
})

test('TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE', () => {
  const err = TYPE_ERROR_STRINGMAP_INVALID_PARAM_TYPE(42)
  expect(err.message).toBe(
    'Expected `param` to be an array or object but got number'
  )
})

test('SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP', () => {
  const err = SYNTAX_ERROR_CONFLICTING_LANGUTIL_STATE_PROP('MyComponent')
  expect(err.message).toBe('Prop conflict for `langutilState` in <MyComponent/>')
})
