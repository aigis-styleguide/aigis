module.exports = function(content, flags) {
  var className = this.md_class["tablecell"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '" class="' + classes + '">'
    : '<' + type + ' class="' + classes + '">';
  return tag + content + '</' + type + '>\n';
};
