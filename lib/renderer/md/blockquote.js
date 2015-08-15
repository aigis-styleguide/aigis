var _ = require("lodash");

module.exports = function (quote) {
  var className = this.md_class["blockquote"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  return '<blockquote class="' + classes + '">\n' + quote + '</blockquote>\n';
};
