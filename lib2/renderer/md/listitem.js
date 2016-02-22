var _ = require('lodash');
var format = require('util').format;

module.exports = function(text) {
  var className = this.md_class['listitem'];
  var classes = _.isArray(className) ? className.join(' ') : className;

  return format('<li class="%s">%s</li>\n', classes, text);
};
