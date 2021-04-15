import { extractCoreMethodsForHook } from './'

it('extractCoreMethodsForHook', () => {
  const core = {
    noise1: true,
    localize: true,
    localizeExplicitly: true,
    noise2: true,
    localizeFromScratch: true,
    setLanguage: true,
    noise3: true,
    setDictionary: true,
    appendDictionary: true,
    noise4: true,
    resolveLanguage: true,
    getAllLanguages: true,
    noise5: true,
  }
  const output = extractCoreMethodsForHook(core)
  expect(output).toStrictEqual({
    localize: true,
    localizeExplicitly: true,
    localizeFromScratch: true,
    setLanguage: true,
    setDictionary: true,
    appendDictionary: true,
    resolveLanguage: true,
    getAllLanguages: true,
  })
})
