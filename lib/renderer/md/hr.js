var _ = require('lodash');
var format = require('util').format;

module.exports = function() {
  var className = this.md_class['hr'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var end = this.options.xhtml ? '/' : '';
  return format('<hr class="%s"%s>\n', classes, end);
};
