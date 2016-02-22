var _ = require('lodash');
var format = require('util').format;

module.exports = function(href, title, text) {
  var className = this.md_class['link'];
  var classes = _.isArray(className) ? className.join(' ') : className;

  var prot;
  if (this.options.sanitize) {
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  return format('<a class="%s" href="%s" title="%s">%s</a>', classes, href, title, text);
};
