import {
  createDebouncedWarning,
  formatOneLineMissingLoc,
  formatMultiLineMissingLoc,
} from './'

it('createDebouncedWarning - Warnings are batched', () => {
  jest.useFakeTimers()

  let warningMessage = ''
  const setWarningMessage = (msg) => {
    warningMessage = msg
  }
  const spyFunction = jest.fn()
  const callback = (msg) => {
    setWarningMessage(msg)
    spyFunction()
  }

  const debouncedWarning = createDebouncedWarning(callback)
  debouncedWarning.pushWarning('en', 'HELLO')
  debouncedWarning.pushWarning('en', 'FOO')
  debouncedWarning.pushWarning('en', 'BAR')
  debouncedWarning.pushWarning('en', 'BAZ')
  jest.advanceTimersByTime()
  expect(spyFunction).toHaveBeenCalledTimes(1)
  expect(warningMessage).toMatch(/BAR, BAZ, FOO, HELLO/)
})

describe('formatOneLineMissingLoc', () => {
  it('1 item', () => {
    const missingLocalizations = { en: ['HELLO'] }
    const output = formatOneLineMissingLoc(missingLocalizations)
    expect(output).toBe('Missing localizations (en): HELLO')
  })
  it('Multiple items', () => {
    const missingLocalizations = { en: ['HELLO', 'FOO', 'BAR'] }
    const output = formatOneLineMissingLoc(missingLocalizations)
    expect(output).toBe('Missing localizations (en): BAR, FOO, HELLO')
  })
})

it('formatMultiLineMissingLoc', () => {
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
