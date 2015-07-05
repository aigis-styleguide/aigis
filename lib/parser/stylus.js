var STYLUS = require("stylus");

function stylus(file) {
  return STYLUS.render(file.contents.toString());
}

module.exports = stylus;
