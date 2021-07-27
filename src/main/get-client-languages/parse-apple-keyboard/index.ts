function parseAppleKeyboards<S extends string = string>(
  values: Array<S>
): Array<S> {
  const parsedValues = []
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    // Value splitting
    // 'en_US@sw=QWERTY;hw=Automatic' -> ['en_US', 'sw=QWERTY;hw=Automatic']
    parsedValues.push(value.split('@')[0])
  }
  return parsedValues
}

export default parseAppleKeyboards
