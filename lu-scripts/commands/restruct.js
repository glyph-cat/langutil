function restruct({ by, to }) {
  console.log('Restructuring', { by, to }, '...');
}

// Dictionary will be forced to export to JS if dictionary contains
// complex data types, JSX, functions, etc...

module.exports = {
  byKeyToCsv() { restruct({ by: 'key', to: 'csv' }) },
  byKeyToJs() { restruct({ by: 'key', to: 'js' }) },
  byKeyToJson() { restruct({ by: 'key', to: 'json' }) },
  byLangToCsv() { restruct({ by: 'lang', to: 'csv' }) },
  byLangToJs() { restruct({ by: 'lang', to: 'js' }) },
  byLangToJson() { restruct({ by: 'lang', to: 'json' }) },
};
