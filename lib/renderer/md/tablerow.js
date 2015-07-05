module.exports = function(content) {
  var className = this.md_class.blockquote;
  var classes = _.isArray(className) ? className.join(" ") : className;

  return '<tr class="' + classes + '">\n' + content + '</tr>\n';
};
