var path = require('path');
var fs = require('fs-extra');
var format = require('util').format;

function componentLink(md, options) {
  var componentLink = /\!\!\[(.*)\]\(([-_.!~*¥'()a-zA-Z0-9;¥/?:¥@&=+¥$,%#]+)\)/g;
  if (componentLink.test(md)) {
    md = md.replace(componentLink, function(str, title, fileName) {
      var filePath = path.join(options.component_dir, fileName);
      var html = fs.readFileSync(path.resolve(filePath), 'utf8');
      return format('\n\n```html\n%s\n```', html);
    }.bind(this))
  }
  return md;
}

module.exports = componentLink;
