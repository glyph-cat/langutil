const fs = require('fs')

const FS_OPTIONS = { encoding: 'utf-8' }
const FILE_PATH = './react/dist/types/index.d.ts'
const fileContents = fs.readFileSync(FILE_PATH, FS_OPTIONS)
const fileContentsByRow = fileContents.split('\n')

let firstImportLine = -1
let lastImportLine = -1

for (let i = 0; i < fileContentsByRow.length; i++) {

  const currentRow = fileContentsByRow[i]
  const importRegex = /^import/

  // Find first import line
  if (firstImportLine < 0) {
    if (importRegex.test(currentRow)) {
      firstImportLine = i
    }
  }

  // Find last import line
  if (firstImportLine >= 0 && lastImportLine < 0) {
    if (!importRegex.test(currentRow)) {
      // If current line is no longer an import statement,
      // then the previous line is the last one
      lastImportLine = i
      // break
    }
  }

  // Tamper with all exported declarations so that editor will underline them in red
  // This makes it less likely that we will forget to remove them
  if (firstImportLine >= 0 && lastImportLine >= 0) {
    fileContentsByRow[i] = fileContentsByRow[i].replace(/^declare/, 'TO_REMOVE')
  }

}

// eslint-disable-next-line quotes
const missingImport = "import { LangutilCore, LangutilState } from '../../..';"
fileContentsByRow.splice(lastImportLine, 0, missingImport)

// Rewrite the file
const newFileContents = fileContentsByRow.join('\n')
fs.writeFileSync(FILE_PATH, newFileContents, FS_OPTIONS)
