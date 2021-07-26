import { getResolvedLanguageOneToMany } from '.'

describe('getResolvedLanguageFromList', () => {
  it('Exact language found', () => {
    const output = getResolvedLanguageOneToMany('en', ['en', 'ms', 'zh'])
    expect(output).toBe('en')
  })

  it('Closest language found', () => {
    const output1 = getResolvedLanguageOneToMany('en', ['en_GB', 'ms', 'zh'])
    expect(output1).toBe('en_GB')
    const output2 = getResolvedLanguageOneToMany('en_GB', ['en', 'ms', 'zh'])
    expect(output2).toBe('en')
  })

  it('Language not found', () => {
    const output = getResolvedLanguageOneToMany('ab', ['en', 'ms', 'zh'])
    expect(output).toBe(null)
  })
})
