const fs = require('fs')

const FS_OPTIONS = { encoding: 'utf-8' }
const FILE_PATH = './lib/types/index.d.ts'
const fileContents = fs.readFileSync(FILE_PATH, FS_OPTIONS)
const fileContentsByRow = fileContents.split('\n')

let lineToRemove = -1
const lineContentsToRemove = 'export declare const $$INTERNALS: unique symbol'
for (let i = 0; i < fileContentsByRow.length; i++) {
  if (fileContentsByRow[i].includes(lineContentsToRemove)) {
    lineToRemove = i
    break
  }
}

fileContentsByRow.splice(lineToRemove, 1)

// Rewrite the file
const newFileContents = fileContentsByRow.join('\n')
fs.writeFileSync(FILE_PATH, newFileContents, FS_OPTIONS)
