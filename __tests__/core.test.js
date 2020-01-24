(function () {
  const { byKey, byLang } = require('./dict');
  function implementWith(core) {
    const {
      setLanguage, setDictionary, localize, langmap, getGuidedLanguage, getCurrentLanguage, getDefinedLanguages, createKey, appendDictionary,
      _INTERNALS: {
        extractAB, capitalizeFirstLetter, applyParam, applyCasing, applyTransform,
        getRandomHash, convertToNewDict, flipDict, // formatInv,
      }
    } = core;
    return function () {
      function baseImplementation() {

        const lang_en = 'en', lang_zh = 'zh';

        it('getDefinedLanguages', () => {
          expect(getDefinedLanguages()).toEqual(['en', 'zh']);
        });

        it(`setLanguage (${lang_zh})`, () => {
          setLanguage(lang_zh);
          expect(getCurrentLanguage()).toBe(lang_zh);
        });

        it(`setLanguage (${lang_en})`, () => {
          setLanguage(lang_en);
          expect(getCurrentLanguage()).toBe(lang_en);
        });

        it('getGuidedLanguage (In dictionary)', () => {
          const output = getGuidedLanguage(() => 'en');
          expect(output).toBe('en')
        });

        it('getGuidedLanguage (Close)', () => {
          const output = getGuidedLanguage(() => 'zh-Hans');
          expect(output).toBe('zh')
        });

        it('getGuidedLanguage (Not in dictionary)', () => {
          const output = getGuidedLanguage(() => 'xyz');
          expect(output).toBe('en')
        });

        it('localize(keyword)', () => {
          const output = localize('LOGIN');
          expect(output).toBe('Login');
        });

        it('localize [No paramarray but has placeholders]', () => {
          // Expect %%p to become %p even without param
          const output = localize('FORCE_ESCAPE_ARR');
          expect(output).toBe('This is a %p');
        });

        it('localize [No paramobject but has placeholders]', () => {
          // Expect {::key} to become {:key} even without param
          const output = localize('FORCE_ESCAPE_OBJ');
          expect(output).toBe('This is a {:key}');
        });

        it('localize(keyword, paramArray)', () => {
          const output = localize('WELCOME_USER_ARR', ['Adam']);
          expect(output).toBe('Welcome, Adam. %p is escaped here.');
        });

        it('localize(keyword, paramObject)', () => {
          const output = localize('WELCOME_USER_OBJ', { user: 'Belle' });
          expect(output).toBe('Welcome, Belle. {:user} is escaped here.');
        });

        const QUICK_BROWN_FOX_ORIGINAL = 'the quick brown fox jumped over the fence';

        it('localize({ keyword, casing: \'lowerCase\' })', () => {
          const output = localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: 'lowerCase' });
          expect(output).toBe(QUICK_BROWN_FOX_ORIGINAL);
        });

        it('localize({ keyword, casing: \'localeLowerCase\' })', () => {
          const output = localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: 'localeLowerCase' });
          expect(output).toBe(QUICK_BROWN_FOX_ORIGINAL.toLocaleLowerCase());
        });

        it('localize({ keyword, casing: \'upperCase\' })', () => {
          const output = localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: 'upperCase' });
          expect(output).toBe(QUICK_BROWN_FOX_ORIGINAL.toUpperCase());
        });

        it('localize({ keyword, casing: \'localeUppercase\' })', () => {
          const output = localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: 'localeUpperCase' });
          expect(output).toBe(QUICK_BROWN_FOX_ORIGINAL.toLocaleUpperCase());
        });

        it('localize({ keyword, casing: \'sentenceCase\' })', () => {
          const output = localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: 'sentenceCase' });
          expect(output).toBe('The quick brown fox jumped over the fence');
        });

        it('localize({ keyword, casing: \'titleCase\' })', () => {
          const output = localize({ keyword: 'THE_QUICK_BROWN_FOX', casing: 'titleCase' });
          expect(output).toBe('The Quick Brown Fox Jumped Over The Fence');
        });

        it('localize with \'sentenceCase\', partial casings should be preserved.', () => {
          const output = localize({ keyword: 'FILES_WITH_JSX', casing: 'sentenceCase' });
          expect(output).toBe('Files with JSX extension are used for React.');
        });

        it('localize({ keyword, transform })', () => {
          const original = localize('SECRET_CODE');
          const output = localize({
            keyword: 'SECRET_CODE',
            transform: (localizedValue) => localizedValue * 2
          });
          expect(output / original).toBe(2);
        });

        it('appendDictionary (byLang)', () => {
          appendDictionary({
            en: { APPEND_TEST_1: 'a1' },
            zh: { APPEND_TEST_1: '啊1' }
          }, 'a1');
          expect(langmap('en', 'APPEND_TEST_1')).toBe('a1');
        });

        it('appendDictionary (byKey)', () => {
          appendDictionary({
            APPEND_TEST_2: { en: 'a2', zh: '啊2' },
          }, 'a2');
          expect(langmap('en', 'APPEND_TEST_2')).toBe('a2');
        });

      }
      setDictionary(byKey); baseImplementation();
      setDictionary(byLang); baseImplementation();

      it('createKey & convertToNewDict', () => {
        const legacyDict = [
          createKey('HELLO', { 'en': 'Hello', 'ms': 'Apa khabar' }),
          createKey('MORNING', { 'en': 'Good morning', 'ms': 'Selamat pagi' }),
        ]
        const output = convertToNewDict(legacyDict)
        const expected = {
          'HELLO': { 'en': 'Hello', 'ms': 'Apa khabar' },
          'MORNING': { 'en': 'Good morning', 'ms': 'Selamat pagi' }
        }
        expect(output).toEqual(expected);
      });

      it('extractAB', () => {
        const dict = { en: { HELLO: 'Hello', WORLD: 'world' } };
        const expectedAB = { a: ['en'], b: ['HELLO', 'WORLD'] };
        expect(extractAB(dict)).toEqual(expectedAB);
      });

      it('capitalizeFirstLetter', () => {
        expect(capitalizeFirstLetter('foo')).toBe('Foo');
      });

      it('applyParam (array)', () => {
        const computed = applyParam('Welcome, %p. Escaped %%p.', ['Adam']);
        const expected = 'Welcome, Adam. Escaped %p.';
        expect(computed).toBe(expected);
      });

      it('applyParam (object)', () => {
        const computed = applyParam('Welcome, {:user}. Escaped {::user}.', { user: 'Adam' });
        const expected = 'Welcome, Adam. Escaped {:user}.';
        expect(computed).toBe(expected);
      });

      it('applyParam (object) UNTALLY', () => {
        const computed = applyParam('Welcome, {:user}. Add {:foo}. Escaped {::user}.', { user: 'Adam', bar: 'baz' });
        const expected = 'Welcome, Adam. Add {:foo}. Escaped {:user}.';
        expect(computed).toBe(expected);
      });

      it('applyCasing (lowerCase)', () => {
        const computed = applyCasing('HELLO WORLD', 'lowerCase');
        const expected = 'hello world';
        expect(computed).toBe(expected);
      });

      it('applyCasing (localeLowerCase)', () => {
        const computed = applyCasing('HELLO WORLD', 'localeLowerCase');
        const expected = 'hello world';
        expect(computed).toBe(expected);
      });

      it('applyCasing (upperCase)', () => {
        const computed = applyCasing('hello world', 'upperCase');
        const expected = 'HELLO WORLD';
        expect(computed).toBe(expected);
      });

      it('applyCasing (localeUpperCase)', () => {
        const computed = applyCasing('hello world', 'localeUpperCase');
        const expected = 'HELLO WORLD';
        expect(computed).toBe(expected);
      });

      it('applyCasing (titleCase)', () => {
        const computed = applyCasing('HeLlO wOrLd', 'titleCase');
        const expected = 'Hello World';
        expect(computed).toBe(expected);
      });

      it('applyCasing (sentenceCase)', () => {
        const computed = applyCasing('HeLlO wOrLd', 'sentenceCase');
        const expected = 'Hello world';
        expect(computed).toBe(expected);
      });

      it('applyCasing (camelCase)', () => {
        const computed = applyCasing('hello world', 'camelCase');
        const expected = 'helloWorld';
        expect(computed).toBe(expected);
      });

      it('applyCasing (pascalCase)', () => {
        const computed = applyCasing('hello world', 'pascalCase');
        const expected = 'HelloWorld';
        expect(computed).toBe(expected);
      });

      it('applyCasing (kebabCase)', () => {
        const computed = applyCasing('hello world', 'kebabCase');
        const expected = 'hello-world';
        expect(computed).toBe(expected);
      });

      it('applyCasing (snakeCase)', () => {
        const computed = applyCasing('hello world', 'snakeCase');
        const expected = 'hello_world';
        expect(computed).toBe(expected);
      });

      it('applyCasing (macroCase)', () => {
        const computed = applyCasing('hello world', 'macroCase');
        const expected = 'HELLO_WORLD';
        expect(computed).toBe(expected);
      });

      it('applyTransform', () => {
        const computed = applyTransform(100, (v) => v * 2);
        const expected = 200;
        expect(computed).toBe(expected);
      });

      it('getRandomHash', () => {
        const hashLength = 10;
        expect(getRandomHash(hashLength).length).toBe(hashLength);
      });

      it('flipDict', () => {
        const original = { a: { foo: 'a1', bar: 'a2' }, b: { foo: 'b1', bar: 'b2' } };
        const flipped = { foo: { a: 'a1', b: 'b1' }, bar: { a: 'a2', b: 'b2' } };
        expect(flipDict(original)).toStrictEqual(flipped);
      })

      // it('formatInv ()', () => {
      //   // ...
      // });

    };
  }
  implementWith(require('../lib/langutil.js'))();
  implementWith(require('../lib/langutil.min.js'))();
})();
