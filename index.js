"use strict";
if (process.env.NODE_ENV !== "production") {
    module.exports = require("./lib/langutil.js");
} else {
    module.exports = require("./lib/langutil.min.js");
}