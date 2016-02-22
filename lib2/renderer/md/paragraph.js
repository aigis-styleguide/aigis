var _ = require('lodash');
var format = require('util').format;

module.exports = function(text) {
  var className = this.md_class['paragraph'];
  var classes = _.isArray(className) ? className.join(' ') : className;

  return format('<p class="%s">%s</p>\n', classes, text);
};
