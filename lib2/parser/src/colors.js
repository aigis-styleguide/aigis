var _ = require('lodash');
var path = require('path');
var getCssColors = require('get-css-colors');

function colors(files) {
  var colors = _(files)
    .map(function(file) {
      var contents = file.contents.toString();
      return getCssColors(contents);
    })
    .flattenDeep()
    .compact()
    .uniq()
    .sortBy(function(color) {
      return color.toLowerCase();
    })
    .value();

  return colors;
}

module.exports = colors;
