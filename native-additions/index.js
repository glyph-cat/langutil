'use strict';
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./native-additions');
} else {
  module.exports = require('./native-additions.min.js');
}