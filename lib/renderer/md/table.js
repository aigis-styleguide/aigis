var _ = require('lodash');
var format = require('util').format;

module.exports = function(header, body) {
  var className = this.md_class['table'];
  var classes = _.isArray(className) ? className.join(' ') : className;

  return format('<table class="%s">\n<thead>\n%s</thead>\n<tbody>\n%s</tbody>\n</table>\n', classes, header, body);
};
