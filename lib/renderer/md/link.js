var _ = require("lodash");

module.exports = function(href, title, text) {
  var className = this.md_class["link"];
  var classes = _.isArray(className) ? className.join(" ") : className;

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
  var out = '<a class="' + classes + '"href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};
