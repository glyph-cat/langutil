const fs = require('fs');
const PKG_PATH = '../../package.json';

try {
  const pkg = fs.readFileSync(PKG_PATH, { encoding: 'utf-8' });
  let pkgContent = { ...JSON.parse(pkg) };
  if (pkgContent['scripts']) {
    if (!pkgContent['scripts']['langutil']) {

      // Append langutil script to package.json
      pkgContent['scripts']['langutil'] = 'node node_modules/.bin/langutil';

      // Determine indent level of the package.json
      let indentLevel = 4; // Fallback
      try {
        const pkgRawFirstLine = pkg.split('\n')[1];
        indentLevel = /^\s+/.exec(pkgRawFirstLine).length;
        console.log({ indentLevel });
      } catch (e) { }

      // Commit changes
      fs.writeFileSync(PKG_PATH, JSON.stringify(pkgContent, null, indentLevel), { encoding: 'utf-8' });

    }
  }

} catch (e) {
  // This is not a critical error
  // Users will have to run 'node node_modules/.bin/langutil'
  // Or manually add the line below into package.json:
  // { "scripts": { "langutil": "node node_modules/.bin/langutil" } }
}
