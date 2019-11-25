function packAutocomplete(verbose) {
  if (verbose) {
    console.log('packing... (verbose)');
  } else {
    console.log('packing...');
  }
}

module.exports = {
  default: () => packAutocomplete(),
  verbose: () => packAutocomplete(true)
};
