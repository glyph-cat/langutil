const commands = require('./commands');
const echo = (t) => process.stdout.write(t);

let [, , ...args] = process.argv
let scope = { ...commands }, prevScope = {};

while (args.length > 0) {
  const currentArg = args.shift();
  prevScope = { ...scope };
  scope = scope.children[currentArg];
}

const { run: executor } = scope || {};
echo('\n');
typeof executor === 'function' ? executor() : showInvalidHelper();
echo('\n');

function showInvalidHelper() {
  const { children: prevChildren } = prevScope;
  if (typeof prevChildren === 'object') {
    console.log('Invalid command, did you mean:');
    console.log(`\t${Object.keys(prevChildren).join('\n\t')}`);
  } else {
    console.log('Invalid command');
  }
}
