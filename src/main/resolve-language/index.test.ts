import {
  getResolvedLanguageAnyToMany,
  getResolvedLanguageManyToMany,
  getResolvedLanguageOneToMany,
} from '.'

describe('getResolvedLanguageAnyToMany', () => {

  test('String', () => {
    const output = getResolvedLanguageAnyToMany('en', ['en', 'ms', 'zh'])
    expect(output).toBe('en')
  })

  test('Array<string>', () => {
    const output = getResolvedLanguageAnyToMany(['en'], ['en', 'ms', 'zh'])
    expect(output).toBe('en')
  })

})

describe('getResolvedLanguageManyToMany', () => {

  test('Exact language found', () => {
    const output1 = getResolvedLanguageManyToMany(['en', 'ms'], ['en', 'ms', 'zh'])
    expect(output1).toBe('en')
    const output2 = getResolvedLanguageManyToMany(['ms', 'en'], ['en', 'ms', 'zh'])
    expect(output2).toBe('ms')
  })

  test('Closest language found', () => {
    const output1 = getResolvedLanguageManyToMany(['en', 'ms'], ['en_GB', 'ms', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageManyToMany(['en_GB', 'ms'], ['en', 'ms', 'zh'])
    expect(output2).toBe('en')
  })

  test('Language not found', () => {
    const output = getResolvedLanguageManyToMany(['ab'], ['en', 'ms', 'zh'])
    expect(output).toBe(null)
  })

})

describe('getResolvedLanguageOneToMany', () => {

  test('Exact language found', () => {
    const output = getResolvedLanguageOneToMany('en', ['en', 'ms', 'zh'])
    expect(output).toBe('en')
  })

  test('Closest language found', () => {
    const output1 = getResolvedLanguageOneToMany('en', ['en_GB', 'ms', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageOneToMany('en_GB', ['en', 'ms', 'zh'])
    expect(output2).toBe('en')
  })

  test('Language not found', () => {
    const output = getResolvedLanguageOneToMany('ab', ['en', 'ms', 'zh'])
    expect(output).toBe(null)
  })

})
