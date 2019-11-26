const FIRST_LEVEL_CHILDREN = {

  // NOTE: In case of future bug, this results in a potential cyclic structure
  // module.exports -> { commands } -> run -> require('./showAllFunctions') -> ...
  // ... -> FIRST_LEVEL_CHILDREN -> help -> run -> require('./showAllFunctions') <——— LOOP
  // REASON to keep it around:
  // User might mistype 'help', so it is important to show 'help'
  // as one of the available arguments as well
  help: {
    _desc: 'Show all available functions',
    run: require('./showAllFunctions')
  },

  inspect: {
    children: {
      dictionary: {
        _desc: 'Inspect dictionary',
        run() { console.log('inspecting dictionary...'); }
      },
      project: {
        _desc: 'Inspect entire project',
        run() { console.log('inspecting project...'); }
      }
    }
  },

  pack: {
    _desc: 'Integrate keywords in dictionary into typings',
    run() { require('./packAutocomplete').default(); },
    children: {
      '--verbose': {
        _desc: 'Integrate keywords in dictionary into typings with verbose logging',
        run() { require('./packAutocomplete').verbose(); },
      }
    }
  },

  restruct: {
    children: {
      byKey: {
        children: {
          csv: {
            _desc: 'Restructure dictionary by keywords and export to CSV',
            run: require('./restruct').byKeyToCsv
          },
          js: {
            _desc: 'Restructure dictionary by keywords and export to JavaScript',
            run: require('./restruct').byKeyToJs
          },
          json: {
            _desc: 'Restructure dictionary by keywords and export to JSON',
            run: require('./restruct').byKeyToJson
          }
        }
      },
      byLang: {
        children: {
          csv: {
            _desc: 'Restructure dictionary by language and export to CSV',
            run: require('./restruct').byLangToCsv
          },
          js: {
            _desc: 'Restructure dictionary by language and export to JavaScript',
            run: require('./restruct').byLangToJs
          },
          json: {
            _desc: 'Restructure dictionary by language and export to JSON',
            run: require('./restruct').byLangToJson
          }
        }
      }
    }
  },

  version: {
    run: require('./showVersionNumber'),
    _desc: 'Show current langutil version number',
  },

  // For testing ambigous arguments
  // branch: {
  //   children: {
  //     b1: {
  //       run() { console.log('branch 1'); }
  //     },
  //     b2: {
  //       run() { console.log('branch 2'); }
  //     }
  //   }
  // }

};

const commands = { run: require('./showAllFunctions'), children: FIRST_LEVEL_CHILDREN };

// Commands and 1st-level children are separated
// so that 1st-level children can be imported by `showAllFunctions`

// Okay, the effort was useless... [facepalm]
// Reason: refer to the block of comment above `FIRST_LEVEL_CHILDREN.help`

module.exports = { commands, FIRST_LEVEL_CHILDREN };
