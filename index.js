'use strict';
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./lib/langutil.dev.js');
} else {
    module.exports = require('./lib/langutil.min.js');
}