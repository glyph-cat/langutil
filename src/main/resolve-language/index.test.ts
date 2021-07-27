import {
  getResolvedLanguageAnyToMany,
  getResolvedLanguageManyToMany,
  getResolvedLanguageOneToMany,
} from '.'

describe('getResolvedLanguageAnyToMany', () => {

  test('String', () => {
    const output = getResolvedLanguageAnyToMany('en', ['en', 'in', 'zh'])
    expect(output).toBe('en')
  })

  test('Array<string>', () => {
    const output = getResolvedLanguageAnyToMany(['en'], ['en', 'in', 'zh'])
    expect(output).toBe('en')
  })

})

describe('getResolvedLanguageManyToMany', () => {

  test('Exact language found', () => {
    const output1 = getResolvedLanguageManyToMany(['en', 'in'], ['en', 'in', 'zh'])
    expect(output1).toBe('en')
    const output2 = getResolvedLanguageManyToMany(['in', 'en'], ['en', 'in', 'zh'])
    expect(output2).toBe('in')
  })

  test('Closest language found', () => {
    const output1 = getResolvedLanguageManyToMany(['en', 'in'], ['en_GB', 'in', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageManyToMany(['en_GB', 'in'], ['en', 'in', 'zh'])
    expect(output2).toBe('en')
  })

  test('Language not found', () => {
    const output = getResolvedLanguageManyToMany(['ab'], ['en', 'in', 'zh'])
    expect(output).toBe(null)
  })

})

describe('getResolvedLanguageOneToMany', () => {

  test('Exact language found', () => {
    const output = getResolvedLanguageOneToMany('en', ['en', 'in', 'zh'])
    expect(output).toBe('en')
  })

  test('Closest language found', () => {
    const output1 = getResolvedLanguageOneToMany('en', ['en_GB', 'in', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageOneToMany('en_GB', ['en', 'in', 'zh'])
    expect(output2).toBe('en')
  })

  test('Language not found', () => {
    const output = getResolvedLanguageOneToMany('ab', ['en', 'in', 'zh'])
    expect(output).toBe(null)
  })

})
