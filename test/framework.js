module.exports = {

    /**
     * @param {Object} props
     * @param {String} props.title
     * @param {String} props.description
     * @param {Function} props.callback
     * @param {any} props.expectedValue
     */
    task: function ({
        title='',
        description='',
        expectedValue='',
        callback=()=>{},
    }) {
        if (title === undefined || title === null || title === '') {
            throw Error('Title cannot be empty')
        }
        if (Array.isArray(expectedValue)) {
            expectedValue = expectedValue.join(', ')
        }
        return {
            "title": title,
            "description": description,
            "expectedValue": expectedValue,
            "callback": callback,
        }
    },

    /**
     * @param {Array<Function>} tests
     */
    runTests: function(tests) {
        console.log('\n');
        var score = 0, checks = [], startTime = new Date(), testsWithError = []
        for (var i = 0; i < tests.length; i++) {
            console.log('Conducting Test ' + (i + 1) + '...');
            var currentTest = tests[i];
            console.log(currentTest.title + '\n' + currentTest.description)
            var callbackResult = null;
            try {
                callbackResult = currentTest.callback()
                if (Array.isArray(callbackResult)) {
                    callbackResult = callbackResult.join(', ')
                }
            } catch (error) {
                testsWithError.push(currentTest.title)
            }
            console.log(
                'Expected output: ' + currentTest.expectedValue + '\n' +
                'Actual output  : ' + callbackResult
            )
            const individualResult = (currentTest.expectedValue === callbackResult)
            if (individualResult) {
                score += 1
            } else {
                testsWithError.push(currentTest.title)
            }
            checks.push((i + 1) + (individualResult ? '✅' : '❌'));
            console.log((individualResult ? '✅ PASS' : '❌ FAIL') + '\n');
        }
        var endTime = new Date();
        var passingRate = 'Passing Rate: ' + Math.round(100 * score / tests.length) + '%';
        var scoreStat = 'Passed: ' + score + ', ' + 'Failed: ' + (tests.length - score) + ', Total: ' + tests.length;
        var timeReport = 'Completed in ' + (endTime - startTime) + ' miliseconds. ';
        var longestLine = Math.max(passingRate.length, scoreStat.length, timeReport.length);
        var reportString = (
            '╭—' + '—'.repeat(longestLine) + '—╮\n' +
            '│ ' + passingRate + ' '.repeat(longestLine - passingRate.length) + ' │\n' +
            '│ ' + scoreStat + ' '.repeat(longestLine - scoreStat.length) + ' │\n' +
            '│ ' + timeReport + ' '.repeat(longestLine - timeReport.length) + ' │\n' +
            '╰—' + '—'.repeat(longestLine) + '—╯'
        )
        console.log([
            reportString,
            'CHECKS: ' + checks.join(', '),
            testsWithError.length > 0 ? 'ERROR(S) at: \n • ' + testsWithError.join('\n • ') : null,
            ''
        ].join('\n'));
    }

}
