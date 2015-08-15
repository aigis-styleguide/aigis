var _ = require("lodash");

module.exports = function() {
  var className = this.md_class["hr"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  return this.options.xhtml ? '<hr class="' + classes + '"/>\n' : '<hr class="' + classes + '">\n';
};
