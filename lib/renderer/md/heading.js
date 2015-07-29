module.exports = function(text, level, raw) {
  var className = this.md_class["heading"];
  var classes = _.isArray(className) ? className.join(" ") : className;

  return '<h' +
    level +
    ' class="' + classes + '"' +
    ' id="' +
    this.options.headerPrefix +
    raw.toLowerCase().replace(/[^\w]+/g, '-') +
    '">' +
    text +
    '</h' +
    level +
    '>\n';
};
