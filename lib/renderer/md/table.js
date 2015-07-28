module.exports = function(header, body) {
  var className = this.md_class.blockquote;
  var classes = _.isArray(className) ? className.join(" ") : className;
  
  return '<table class="' + classes + '">\n' +
    '<thead>\n' +
    header +
    '</thead>\n' +
    '<tbody>\n' +
    body +
    '</tbody>\n' +
    '</table>\n';
};
