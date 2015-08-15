var _ = require("lodash");

module.exports = function(href, title, text) {
  var className = this.md_class["image"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  var out = '<img class="' + classes + '" src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};
