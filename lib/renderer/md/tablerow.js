var _ = require("lodash");

module.exports = function(content) {
  var className = this.md_class["tablerow"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  return '<tr class="' + classes + '">\n' + content + '</tr>\n';
};
