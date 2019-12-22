const fs = require('fs');

// Only keep first block of /** */ comment
// Remove all other double slash comments
// Remove all printWarning(); printError(); printVerbose(); blocks
// Convert continuous empty lines into one empty line
//

const path = 'lib/langutil.js';
const raw = fs.readFileSync(path, { encoding: 'utf-8' });

function removeSpaceAroundOperatorsIn(code) {
  const operators = ['=', '===', '<', '>', '<=', '>=', '*', '=>', '+=', ',', ';', ':'];
  for (let o of operators) {
    const rgx = new RegExp(`\\s?\\${o}\\s?`, 'g');
    code = code.replace(rgx, o);
  }
  return code;
}

function getPreMinified(code) {
  // \/\*\*\n(.|\n)+\*\/\n // Block comments
  code = code.replace(/\/\/\s.+/gi, ''); // double slash comments
  code = code.replace(/printVerbose\(.+\);/g, '');
  code = code.replace(/printWarning\(.+\);/g, '');
  code = code.replace(/printError\(.+\);/g, '');
  code = code.replace(/,]/g, ''); // unused commas for ]
  code = code.replace(/(,|;)\s*}/g, '}'); // extra commas & semicolons for }
  code = removeSpaceAroundOperatorsIn(code);
  code = code.replace(/if\s?\(.+\)\s?{(\s|\n)+}(?!\s?else)/g, ''); // Dead code IF
  code = code.replace(/else\s?{(\s|\n)+}/g, ''); // Dead code ELSE
  code = code.replace(/\n+/g, '\n'); // continuous empty lines
  // code = code.replace(/\n{2}/g, 'ABCABCABCABC'); // continuous empty lines
  return code;
}

const preminified = getPreMinified(raw);
console.log(preminified);

