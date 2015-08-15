var _ = require("lodash");

module.exports = function(text) {
  var className = this.md_class["paragraph"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  return '<p class="' + classes + '">' + text + '</p>\n';
};
