module.exports = function(body, ordered) {
  var className = this.md_class["list"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  var type = ordered ? 'ol' : 'ul';
  return '<' + type + ' class="' + classes + '">\n' + body + '</' + type + '>\n';
};
