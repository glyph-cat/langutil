const fs = require('fs')

const FS_OPTIONS = { encoding: 'utf-8' }
const FILE_PATH = './react/lib/types/index.d.ts'
const fileContents = fs.readFileSync(FILE_PATH, FS_OPTIONS)

let fileContentsByLine = fileContents.split('\n')

// Inject missing import
// eslint-disable-next-line quotes
const missingImport = "\nimport { LangutilCore, LangutilState } from '../../..';"
fileContentsByLine.splice(1, 0, missingImport)

// TODO: Ideally, automatically remove all exports without the `@ReactBundle` tag
// Tamper with all exported declarations that don't have the `@ReactBundle` tag
// so the editor will underline them in red, which makes it less likely to
// forget to remove them.
for (let i = 0; i < fileContentsByLine.length; i++) {
  if (/^declare/.test(fileContentsByLine[i])) {
    fileContentsByLine[i] = `un${fileContentsByLine[i]}`
    // declare -> undeclare
  }
}

// Remove lines:
// - with `@ReactBundle` tags
// - useless `export { }` statement
fileContentsByLine = fileContentsByLine.filter((currentLine) => {
  return !/@ReactBundle/.test(currentLine) && !/export { }/.test(currentLine)
})

// Rewrite the file
const newFileContents = fileContentsByLine
  .join('\n')
  .replace(/\n\n+/, '\n') // If more than one empty line, trim them.
fs.writeFileSync(FILE_PATH, newFileContents, FS_OPTIONS)

// NOTE: Old implementation that actually scans each line to find the last line
// of import statement has been removed. To find it back refer to this commit:
// 128523c3e20d49a66bbeea400e04e48fa8e45898
