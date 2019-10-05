'use strict';
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./react-additions');
} else {
  module.exports = require('./react-additions.min.js');
}