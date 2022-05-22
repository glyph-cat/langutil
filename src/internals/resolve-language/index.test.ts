import {
  getResolvedLanguageAnyToMany,
  getResolvedLanguageManyToMany,
  getResolvedLanguageOneToMany,
} from '.'

describe(getResolvedLanguageAnyToMany.name, () => {

  test('String', () => {
    const output = getResolvedLanguageAnyToMany('en', ['en', 'id', 'zh'])
    expect(output).toBe('en')
  })

  test('Array<string>', () => {
    const output = getResolvedLanguageAnyToMany(['en'], ['en', 'id', 'zh'])
    expect(output).toBe('en')
  })

})

describe(getResolvedLanguageManyToMany.name, () => {

  test('Exact language found', () => {
    const output1 = getResolvedLanguageManyToMany(['en', 'id'], ['en', 'id', 'zh'])
    expect(output1).toBe('en')
    const output2 = getResolvedLanguageManyToMany(['id', 'en'], ['en', 'id', 'zh'])
    expect(output2).toBe('id')
  })

  test('Closest language found', () => {
    const output1 = getResolvedLanguageManyToMany(['en', 'id'], ['en_GB', 'id', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageManyToMany(['en_GB', 'id'], ['en', 'id', 'zh'])
    expect(output2).toBe('en')
  })

  test('Language not found', () => {
    const output = getResolvedLanguageManyToMany(['ab'], ['en', 'id', 'zh'])
    expect(output).toBe(null)
  })

})

describe(getResolvedLanguageOneToMany.name, () => {

  test('Exact language found', () => {
    const output = getResolvedLanguageOneToMany('en', ['en', 'id', 'zh'])
    expect(output).toBe('en')
  })

  test('Closest language found', () => {
    const output1 = getResolvedLanguageOneToMany('en', ['en_GB', 'id', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageOneToMany('en_GB', ['en', 'id', 'zh'])
    expect(output2).toBe('en')
  })

  test('Language not found', () => {
    const output = getResolvedLanguageOneToMany('ab', ['en', 'id', 'zh'])
    expect(output).toBe(null)
  })

})
