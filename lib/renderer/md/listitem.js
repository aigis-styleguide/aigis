var _ = require("lodash");

module.exports = function(text) {
  var className = this.md_class["listitem"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  return '<li class="' + classes + '">' + text + '</li>\n';
};
