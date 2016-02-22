var _ = require('lodash');
var format = require('util').format;

module.exports = function (quote) {
  var className = this.md_class['blockquote'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  return format('<blockquote class="%s">\n%s</blockquote>\n', classes, quote);
};
