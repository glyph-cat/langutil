// Value is undefined upon first require because structure is cyclic
const { FIRST_LEVEL_CHILDREN: firstCycleRequire } = require('./index');

function showAllFunctions() {
  console.log('    ~ LANGUTIL CLI ~');
  const { FIRST_LEVEL_CHILDREN } = require('./index'); // Re-import
  searchFunctions(FIRST_LEVEL_CHILDREN);
  console.log(`\t${formatCommandsAndHelp(possibleCommands).join('\n\t')}`);
  console.log('\n    (More utilities coming soon)\n');
}

let stack = [], possibleCommands = [];
function searchFunctions(children) {
  for (let cKey of Object.keys(children)) {

    // To be pushed upon every start of loop
    // If cKey is no longer used, it will be popped at the end of the loop
    stack.push(cKey);

    // If executable function exists, derive a command from the stack
    if (typeof children[cKey].run === 'function') {
      possibleCommands.push({
        cmd: stack.join(' '),
        desc: children[cKey]._desc
      });
    }

    // If children exists, go deeper into the tree
    if (typeof children[cKey].children === 'object') {
      searchFunctions(children[cKey].children);
    }

    // To be popped upon every end of loop
    // If the tree goes deeper, the recursive calling of this function above
    // Would have prevented the stack from popping at that instance
    stack.pop();

  }
}

function formatCommandsAndHelp(cmds) {
  let allCmds = [], allDesc = [], longestCmdLength = 0;
  for (let c of cmds) {
    longestCmdLength = Math.max(longestCmdLength, c.cmd.length);
    allCmds.push(c.cmd);
    allDesc.push(typeof c.desc === 'string' ? c.desc : '(N/A)');
  }

  let printStack = [];
  for (let i in allCmds) {
    printStack.push(`${allCmds[i].padEnd(longestCmdLength, ' ')}\t${allDesc[i]}`)
  }

  return printStack;

}

module.exports = showAllFunctions;
