var _ = require('lodash');
var format = require('util').format;

module.exports = function(body, ordered) {
  var className = this.md_class['list'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var type = ordered ? 'ol' : 'ul';

  return format('<%s class="%s">\n%s</%s>\n', type, classes, body, type);
};
