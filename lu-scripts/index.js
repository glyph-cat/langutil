const { commands } = require('./commands');
const echo = (t) => process.stdout.write(t);

let [, , ...args] = process.argv;
let scope = { ...commands }; // A duplicate copy of the commands for processing
let prevScope = {}; // Previously processed scope
let prevArg = ''; // The last processed argument regardless of valid or not
let validArgs = []; // Previously valid arguments
// TODO: Recognize custom parameters and pass them in as strings to whichever function that is triggered

while (args.length > 0) {
  const currentArg = args.shift();
  prevArg = currentArg;
  prevScope = { ...scope };
  scope = scope.children[currentArg];
  if (typeof scope === 'undefined') {
    scope = {};
    break;
  } else {
    validArgs.push(currentArg);
  }
}

echo('\n');
typeof scope.run === 'function' ? scope.run() : showInvalidHelper();
echo('\n');

/**
 * @description If arguments are invalid, call this function to show some help to the user.
 */
function showInvalidHelper() {
  const { children: prevChildren } = prevScope;
  if (typeof scope.children === 'object') {
    console.log('Invalid command, did you mean:');
    console.log(formatPossibleArgs(validArgs, Object.keys(scope.children)));
  } else if (typeof prevChildren === 'object') {
    const possibleCommands = getPossibleCommands(prevArg, Object.keys(prevChildren));
    if (possibleCommands.length > 0) {
      console.log('Invalid command, did you mean:');
      console.log(formatPossibleArgs(validArgs, possibleCommands));
    } else {
      console.log('Invalid command.');
    }
  } else {
    console.log('Invalid command.');
  }
}

// Functions above are MEANT TO BE FIXED within this file
// Functions below SHOULD BE SEPARABLE and independant of the variables defined above

/**
 * @description From an invalid argument, finds similarly valid arguments from all valid arguments.
 * @param {string} faultyCmd The invalid argument
 * @param {Array} keys Other valid arguments
 * @returns {Array}
 */
function getPossibleCommands(faultyCmd, keys) {
  const levenshtein = require('./levenshtein');
  let possible = {};
  for (let k of keys) {
    const score = levenshtein(faultyCmd, k);
    const percentage = getPercentage(score, Math.max(faultyCmd.length, k.length));
    if (percentage > 30) {
      if (!possible[score]) {
        possible[score] = k;
      } else {
        possible[`score${new Date().getMilliseconds().toString()}`] = k;
      }
    }
  }
  return Object.values(possible);
}

/**
 * @description Calculate the percentage of similarity between 2 strings
 * @param {number} levenshteinDistance The Levenshtein Distance
 * @param {number} originalDistance Original length of the word
 * @returns {number}
 */
function getPercentage(levenshteinDistance, originalDistance) {
  return 100 * (originalDistance - levenshteinDistance) / originalDistance;
}

/**
 * @description Combines previous valid arguments plus following possible arguments.
 * @param {Array} cmd Previous valid arguments (when joined, looks like a command)
 * @param {Array} args Possible arguments
 * @returns {string}
 */
function formatPossibleArgs(cmd, args) {
  const cmdJoined = cmd.join(' ');
  return `\t${cmdJoined} ${args.join(`\n\t${cmdJoined} `)}`;
}
