const langutil = require('./langutil');

const DICTIONARY = {
    "english": {
        "HELLO": "Hello",
        "WORLD": "World",
        "HELLO_PARAM_WORLD_PARAM_FOO": "Hello %p, world %p, foo. ",
        "FOO": "foo",
        "BAR": "bar",
        "PARAM_ESCAPE": "This %p is a placeholder, but this %%p and this %q are not. This %p is another placeholder. "
    },
    "chinese_s": {
        "HELLO": "哈咯",
        "WORLD": "世界",
        "HELLO_PARAM_WORLD_PARAM_FOO": "哈咯 %p, 世界 %p, 胡。",
        "FOO": "胡",
        "BAR": "巴",
        "PARAM_ESCAPE": "这 %p 是一个占位符，但这个 %%p 和这个 %q 不是。这 %p 又是另一个占位符。"
    },
    "no_lang": {

    }
}

langutil.hideLogs();
langutil.init(DICTIONARY, 'english', true);

const TESTS = [
    // ————— Basic Tests —————
    basicTestEnglish =()=> {
        console.log('Test with English');
        console.log('Test for `english` dictionary, localize() should return the English localization. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('HELLO');
        var expected = 'Hello';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    basicTestChineseSimplified =()=> {
        console.log('Test with Simplified Chinese');
        console.log('Test for `chinese_s` dictionary, localize() should return the Simplified Chinese localization. ');
        langutil.setLanguage('chinese_s');
        var toTest = langutil.localize('HELLO');
        var expected = '哈咯';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    basicTest_no_lang =()=> {
        console.log('Test with `no_lang`, a defined language but with no localizations');
        console.log('Test for `no_lang` dictionary, localize() should return the keyword itself since it is not defined. ');
        langutil.setLanguage('no_lang');
        var toTest = langutil.localize('HELLO');
        var expected = 'HELLO';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    basicTest_abc =()=> {
        console.log('Test with `abc`, an undefined language');
        console.log('Test for `no_lang` dictionary, localize() should return the keyword itself since it is not defined. ');
        langutil.setLanguage('abc');
        var toTest = langutil.localize('HELLO');
        var expected = 'HELLO';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    // ————— Language Switching Tests —————
    languageSwitching =()=> {
        console.log('Test switching between languages');
        console.log('Test for `no_lang` dictionary, localize() should return the keyword itself since it is not defined. ');
        langutil.setLanguage('english');
        var toTest1 = langutil.localize('WORLD');
        var expected1 = 'World';
        console.log('"' + expected1 + '" and "' + toTest1 + '" should be the same. ');
        langutil.setLanguage('chinese_s');
        var toTest2 = langutil.localize('WORLD');
        var expected2 = '世界';
        console.log('"' + expected2 + '" and "' + toTest2 + '" should be the same. ');
        return (expected1 === toTest1) && (expected2 === toTest2);
    },
    // ————— ParamArray Tests —————
    paramEnough =()=> {
        console.log('Test localizing with parameters — Just enough');
        console.log('localize() should return localized string with all parameters swapped in accurately. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', ['meow', 32]);
        var expected = 'Hello meow, world 32, foo. ';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    paramExtraneous =()=> {
        console.log('Test localizing with parameters — Extraneous');
        console.log('localize() should return localized string with required parameters swapped in. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', ['meow', 32, true]);
        var expected = 'Hello meow, world 32, foo. ';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    paramInsufficient =()=> {
        console.log('Test localizing with parameters — Insufficient');
        console.log('localize() should return localized string with only one parameter swapped in. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', ['meow']);
        var expected = 'Hello meow, world , foo. ';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    paramWrongDataType =()=> {
        console.log('Test localizing with parameters — Wrong data type');
        console.log('localize() should return localized string with no parameters swapped in at all. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('HELLO_PARAM_WORLD_PARAM_FOO', true); // It should be an array
        var expected = 'Hello , world , foo. ';
        console.log('"' + expected + '" and "' + toTest + '" should be the same. ');
        return expected === toTest;
    },
    // ————— ParamArray Tests with Escaped Character —————
    paramWithEscapeEnough =()=> {
        console.log('Test localizing with parameters and escaped character — Just enough');
        console.log('localize() should return localized string with all parameters swapped in accurately and maintain the escaped character `%%p` as `%p`. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('PARAM_ESCAPE', ['meow', 32]);
        var expected = 'This meow is a placeholder, but this %p and this %q are not. This 32 is another placeholder. ';
        console.log('EXPECTED: ' + expected);
        console.log('  RESULT: ' + toTest);
        return expected === toTest;
    },
    paramWithEscapeExtraneous =()=> {
        console.log('Test localizing with parameters and escaped character — Extraneous');
        console.log('localize() should return localized string with required parameters swapped in and maintain the escaped character `%%p` as `%p`. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('PARAM_ESCAPE', ['meow', 32, true]);
        var expected = 'This meow is a placeholder, but this %p and this %q are not. This 32 is another placeholder. ';
        console.log('EXPECTED: ' + expected);
        console.log('  RESULT: ' + toTest);
        return expected === toTest;
    },
    paramWithEscapeInsufficient =()=> {
        console.log('Test localizing with parameters and escaped character — Insufficient');
        console.log('localize() should return localized string with only one parameter swapped in and maintain the escaped character `%%p` as `%p`. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('PARAM_ESCAPE', ['meow']);
        var expected = 'This meow is a placeholder, but this %p and this %q are not. This  is another placeholder. ';
        console.log('EXPECTED: ' + expected);
        console.log('  RESULT: ' + toTest);
        return expected === toTest;
    },
    paramWithEscapeWrongDataType =()=> {
        console.log('Test localizing with parameters and escaped character — Wrong data type');
        console.log('localize() should return localized string with no parameters swapped in at all but maintain the escaped character `%%p` as `%p`. ');
        langutil.setLanguage('english');
        var toTest = langutil.localize('PARAM_ESCAPE', true); // It should be an array
        var expected = 'This  is a placeholder, but this %p and this %q are not. This  is another placeholder. ';
        console.log('EXPECTED: ' + expected);
        console.log('  RESULT: ' + toTest);
        return expected === toTest;
    },
    // fn =()=> {},
]

function runTest() {
    var score = 0, checks = [], startTime = new Date();
    for (var i = 0; i < TESTS.length; i++) {
        console.log('Conducting Test ' + (i + 1) + '...');
        var result = TESTS[i]();
        score += result ? 1 : 0;
        checks.push((i + 1) + (result ? '✅' : '❌'));
        console.log((result ? '✅ PASS' : '❌ FAIL') + '\n');
    }
    var endTime = new Date();
    var passingRate = 'Passing Rate: ' + Math.round(100 * score / TESTS.length) + '%';
    var scoreStat = 'Passed: ' + score + ', ' + 'Failed: ' + (TESTS.length - score) + ', Total: ' + TESTS.length;
    var timeReport = 'Completed in ' + (endTime - startTime) + ' miliseconds. ';
    var longestLine = Math.max(passingRate.length, scoreStat.length, timeReport.length);
    var reportString = (
        '╭—' + '—'.repeat(longestLine) + '—╮\n' +
        '│ ' + passingRate + ' '.repeat(longestLine - passingRate.length) + ' │\n' +
        '│ ' + scoreStat + ' '.repeat(longestLine - scoreStat.length) + ' │\n' +
        '│ ' + timeReport + ' '.repeat(longestLine - timeReport.length) + ' │\n' +
        '╰—' + '—'.repeat(longestLine) + '—╯'
    )
    console.log(reportString);
    console.log('CHECKS: ' + checks.join(', '));
    console.log('');
}

runTest();