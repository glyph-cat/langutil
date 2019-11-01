const fs = require('fs');
const { exec } = require('child_process');
const { default: { red, redBright, bold, greenBright, yellow, cyanBright } } = require('chalk');
const formatBadParam = value => typeof value === 'string' ? `'${value}'` : typeof value;

// Usage:
// npm run deploy -- --(type) (--dry-run)
// Where `type` is one of 'patch', 'minor' or 'major'

const INCREMENT_ACTIONS = (value = '') => {
    value = value.split('.');
    return {
        '--patch': `${value[0]}.${value[1]}.${++value[2]}`,
        '--minor': `${value[0]}.${++value[1]}.0`,
        '--major': `${++value[0]}.0.0`
    };
};

// Determine increment type
const INCREMENT_TYPE = process.argv[2];
const INCREMENT_PRESETS = Object.keys(INCREMENT_ACTIONS());
if (!INCREMENT_PRESETS.includes(INCREMENT_TYPE)) {
    console.log(`${red('Expected argv[2] to be one of')}${bold(redBright('\'' + INCREMENT_PRESETS.join('\', \'') + '\''))}${red(' but got ')}${bold(redBright(formatBadParam(INCREMENT_TYPE)))}${red('.')}`);
    process.exit();
}
console.log(`\nReceived command to increase version number: ${INCREMENT_TYPE}\n`);

// Determine current version number
console.log('Determining current version number...');
const { version: oldVersion } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

// Increment of version number
console.log('Performing increment...');
let newVersion = INCREMENT_ACTIONS(oldVersion)[INCREMENT_TYPE];
console.log('Computed increment output:');
console.log(` • NEW: ${newVersion}\n • OLD: ${oldVersion}`);

// Append new version number
console.log('\nAppending new version number to the following files:');
const APPENDABLES = [
    {
        path: 'package.json',
        target: `"version": "${oldVersion}"`,
        replace: `"version": "${newVersion}"`,
    },
    {
        path: 'index.d.ts',
        target: `* @version ${oldVersion}`,
        replace: `* @version ${newVersion}`
    },
    {
        path: 'lib/langutil.js',
        target: `* @version ${oldVersion}`,
        replace: `* @version ${newVersion}`
    },
    {
        path: 'lib/langutil.min.js',
        target: `* @version ${oldVersion}`,
        replace: `* @version ${newVersion}`
    },
];

const getTruncatedPreview = str => str.substr(0, 200) + '......';

// Dry run functionality pending
const DRY_RUN = process.argv[3] === '--dry-run';
for (let i = 0; i < APPENDABLES.length; i++) {
    const { path, target, replace } = APPENDABLES[i];
    try {
        let currentlyProcessing = fs.readFileSync(path, { encoding: 'utf-8' });
        currentlyProcessing = currentlyProcessing.replace(target, replace);
        // console.log('\n\n\n' + currentlyProcessing) + '\n\n\n';
        console.log('\n\n', getTruncatedPreview(currentlyProcessing));
        if (!DRY_RUN) {
            fs.writeFileSync(path, currentlyProcessing, { encoding: 'utf-8' });
        }
        console.log(`${greenBright('✓')} ${path}`);
    } catch (error) {
        console.log(`${redBright('×')} ${path}`);
    }
}

console.log('\nPublishing to NPM...');
if (!DRY_RUN) {
    exec('npm publish', (err, stdout, ) => {
        console.log(stdout);
        if (err) {
            console.error(err);
        } else {
            console.log(greenBright('Successfully published to NPM!'));
        }
    });
} else {
    console.log(greenBright('Successfully published to NPM!'));
}

// Final report
const formatType = value => value.replace(/\-/g, '').toUpperCase();
console.log('\nVersion number increase successful!');
console.log(`${yellow(oldVersion)} --${bold('(' + formatType(INCREMENT_TYPE) + ')')}-> ${greenBright(newVersion)}`);

if (DRY_RUN) { console.log(cyanBright('\n\n--- DRY RUN COMPLETE ---\n\n')); }
