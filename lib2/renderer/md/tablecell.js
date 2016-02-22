var _ = require('lodash');
var format = require('util').format;

module.exports = function(content, flags) {
  var className = this.md_class['tablecell'];
  var classes = _.isArray(className) ? className.join(' ') : className;

  var type = flags.header ? 'th' : 'td';
  var align = flags.align ? format('style="text-align:%s;  ', flags.align) : ' ';

  return format('<%s %s class="%s">%s</%s>\n', type, align, classes, content, type);
};
