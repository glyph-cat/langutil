(function () {
  const { byKey, byLang } = require('./dict');
  function implementWith(core) {
    const {
      setLanguage, setDictionary, localize, getCurrentLanguage, getDefinedLanguages,
      extractAB, capitalizeFirstLetter, applyParam, applyCasing, applyTransform,
      getRandomHash, formatInv,
    } = core;
    return function () {
      function baseImplementation() {

        const lang_en = 'en', lang_zh = 'zh';

        it('getDefinedLanguages', () => {
          expect(getDefinedLanguages()).toEqual(['en', 'zh']);
        })

        it(`setLanguage (${lang_zh})`, () => {
          setLanguage(lang_zh);
          expect(getCurrentLanguage()).toBe(lang_zh);
        });

        it(`setLanguage (${lang_en})`, () => {
          setLanguage(lang_en);
          expect(getCurrentLanguage()).toBe(lang_en);
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

        it('localize({ keyword, transform })', () => {
          const original = localize('SECRET_CODE');
          const output = localize({
            keyword: 'SECRET_CODE',
            transform: (localizedValue) => localizedValue * 2
          });
          expect(output / original).toBe(2);
        });

      }
      setDictionary(byKey); baseImplementation();
      setDictionary(byLang); baseImplementation();

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

      it('applyTransform', () => {
        const computed = applyTransform(100, (v) => v * 2);
        const expected = 200;
        expect(computed).toBe(expected);
      });

      it('getRandomHash', () => {
        const hashLength = 10;
        expect(getRandomHash(hashLength).length).toBe(hashLength);
      });

      // it('formatInv ()', () => {
      //   // ...
      // });

      // it('formatInv ()', () => {
      //   // ...
      // });

      // it('formatInv ()', () => {
      //   // ...
      // });

    };
  }
  implementWith(require('../lib/langutil.js'))();
  implementWith(require('../lib/langutil.min.js'))();
})();
