module.exports = {
  run: require('./showAllFunctions'),
  children: {

    version: {
      run: require('./showVersionNumber'),
    },

    inspect: {
      run() { console.log('inspecting...'); }
    },

    pack: {
      run() { require('./packAutocomplete').default(); },
      children: {
        '--verbose': {
          run() { require('./packAutocomplete').verbose(); },
        }
      }
    },

  }
};
