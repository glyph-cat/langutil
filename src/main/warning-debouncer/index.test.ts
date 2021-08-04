import {
  createWarningDebouncer,
  formatOneLineMissingLoc,
  formatMultiLineMissingLoc,
} from '.'

test(`${createWarningDebouncer.name} - Warnings are batched`, () => {
  jest.useFakeTimers()

  let warningMessage = ''
  const spyFunction = jest.fn((msg: string) => {
    warningMessage = msg
  })

  const pushWarning = createWarningDebouncer(spyFunction)
  pushWarning('en', 'HELLO')
  pushWarning('en', 'FOO')
  pushWarning('en', 'BAR')
  pushWarning('en', 'BAZ')
  expect(spyFunction).toHaveBeenCalledTimes(0)
  jest.advanceTimersByTime(0)
  expect(spyFunction).toHaveBeenCalledTimes(1)
  expect(warningMessage).toMatch(/BAR, BAZ, FOO, HELLO/)
})

describe(formatOneLineMissingLoc.name, () => {

  test('1 item', () => {
    const missingLocalizations = { en: ['HELLO'] }
    const output = formatOneLineMissingLoc(missingLocalizations)
    expect(output).toBe('Missing localizations (en): HELLO')
  })

  test('Multiple items', () => {
    const missingLocalizations = { en: ['HELLO', 'FOO', 'BAR'] }
    const output = formatOneLineMissingLoc(missingLocalizations)
    expect(output).toBe('Missing localizations (en): BAR, FOO, HELLO')
  })

})

test(formatMultiLineMissingLoc.name, () => {
  const missingLocalizations = {
    ms: ['HELLO', 'FOO', 'BAR'],
    zh: ['FOO'],
    en: ['HELLO'],
  }
  const output = formatMultiLineMissingLoc(missingLocalizations)
  expect(output).toBe(
    [
      'Missing localizations',
      '(en): HELLO',
      '(ms): BAR, FOO, HELLO',
      '(zh): FOO',
    ].join('\n')
  )
})
