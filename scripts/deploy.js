const fs = require('fs');
const { exec } = require('child_process');
const { red, redBright, bold, greenBright, yellow, cyanBright } = require('chalk').default;
const formatBadParam = value => typeof value === 'string' ? `'${value}'` : typeof value;
const DRY_RUN = process.argv[3] === '--dry-run';

// Usage:
// npm run deploy -- --(type) (--dry-run)
// Where `type` is one of 'patch', 'minor' or 'major'

exec('git status', (e1, out1) => {

	// (1) Make sure there are no uncommited changes
	if (e1) { console.log(redBright(e1)); process.exit(1); } // Early exit if there are uncommited changes
	if (!out1.includes('nothing to commit, working tree clean')) {
		console.log(redBright('Cannot publish package - There are still uncomitted changes.\n'));
		process.exit(1);
	}

	// (2) Proceed if no uncommited changes
	const infoForFinalReport = increaseVersionNumber();

	// (3) JEST
	console.log(cyanBright('\nRunning command `jest`...\n'));
	exec('jest', (e2, out2) => {
		console.log(out2);
		if (e2) { console.log(redBright(e2)); process.abort.exit(1); } // Early exit

		// (4) Publish to NPM if test pass
		console.log(cyanBright('\nPublishing to NPM...\n'));
		if (!DRY_RUN) {
			exec('npm publish', (e3, out3) => {
				console.log(out3);
				if (e3) { console.log(redBright(e3)); process.exit(1); } // Early exit
				console.log(greenBright('Successfully published to NPM!'));
				showFinalReport(infoForFinalReport);
			});
		} else {
			console.log(greenBright('Successfully published to NPM!'));
			showFinalReport(infoForFinalReport);
		}

	});

});

function increaseVersionNumber() {
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
	console.log(`\nIncreasing version number: ${INCREMENT_TYPE}\n`);

	// Determine current version number
	console.log('Determining current version number...');
	const { version: oldVersion } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

	// Increment of version number
	console.log('Performing increment...');
	let newVersion = INCREMENT_ACTIONS(oldVersion)[INCREMENT_TYPE];
	console.log('Computed increment output:');
	console.log(` • NEW: ${newVersion}\n • OLD: ${oldVersion}`);

	// Determine what to modify in the files
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
		{
			path: 'lu-scripts/commands/showVersionNumber.js',
			target: /console\.log\('\\tlangutil \d+\.\d+\.\d+'\);/,
			replace: `console.log('\\tlangutil ${newVersion}');`,
		}
	];

	// Append new version number
	const getTruncatedPreview = str => str.substr(0, 200) + '......';
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

	// Return info for final report
	return { INCREMENT_TYPE, oldVersion, newVersion };

}

function showFinalReport({ INCREMENT_TYPE, oldVersion, newVersion }) {
	const formatType = value => value.replace(/\-/g, '').toUpperCase();
	console.log('\nVersion number increase successful!');
	console.log(`${yellow(oldVersion)} --${bold('(' + formatType(INCREMENT_TYPE) + ')')}-> ${greenBright(newVersion)}`);
	if (DRY_RUN) { console.log(cyanBright('\n\n--- DRY RUN COMPLETE ---\n\n')); }
}
