module.exports = function(text) {
  var className = this.md_class.blockquote;
  var classes = _.isArray(className) ? className.join(" ") : className;
  
  return '<p class="' + classes + '">' + text + '</p>\n';
};
