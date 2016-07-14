var _ = require('lodash');
var detectCssColors = require('detect-css-colors');

function colors(files) {
  var colors = _(files)
    .map(function(file) {
      var contents = file.contents.toString();
      return detectCssColors(contents);
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
