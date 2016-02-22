var _ = require('lodash');
var format = require('util').format;

module.exports = function(content) {
  var className = this.md_class['tablerow'];
  var classes = _.isArray(className) ? className.join(' ') : className;

  return format('<tr class="%s">\n%s</tr>\n', classes, content);
};
