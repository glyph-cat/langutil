const { inspectDict } = require('../dev-additions');
// const { convertDict, inspectDict, inspectProject } = require('../dev-additions');
// const { createKey } = require('../lib/langutil.js');

// const legacyDict = [
//   createKey('LOGIN', {
//     'en': 'Login',
//     'zh': '登入'
//   }),
//   createKey('SECRET_CODE', {
//     'en': 100,
//     'zh': 200
//   }),
//   createKey('THE_QUICK_BROWN_FOX', {
//     'en': 'The quick brown fox jumped over the fence',
//     'zh': '那敏捷的棕色狐狸跳过了篱笆'
//   }),
//   createKey('WELCOME_USER_ARR', {
//     'en': 'Welcome, %p. %%p is escaped here.',
//     'zh': '%p，您好。这里的 %%p 已被转义。'
//   }),
//   createKey('WELCOME_USER_OBJ', {
//     'en': 'Welcome, {:user}. {::user} is escaped here.',
//     'zh': '{:user}，您好。这里的 {::user} 已被转义。'
//   })
// ];

// it('convertDict', () => {
//   const { byKey: expectedOutput } = require('./dict');
//   expect(convertDict(legacyDict, 'keyword', 'json')).toEqual(expectedOutput);
// });

it('inspectDict (by keywords)', () => {
  const { byKey } = require('./dict');
  const noErrors = inspectDict(byKey);
  expect(noErrors).toBe(true);
});

it('inspectDict (by language)', () => {
  const { byLang } = require('./dict');
  const noErrors = inspectDict(byLang);
  expect(noErrors).toBe(true);
});

// it('inspectDict', () => {
//   // ...
// });
