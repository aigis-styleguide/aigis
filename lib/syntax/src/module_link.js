var path = require('path');
var fs = require('fs-extra');
var format = require('util').format;

function moduleLink(md, options) {
  var moduleLink = /\!\!\[(.*)\]\(([-_.!~*¥'()a-zA-Z0-9;¥/?:¥@&=+¥$,%#]+)\)/g;
  if (moduleLink.test(md)) {
    md = md.replace(moduleLink, function(str, title, fileName) {
      var filePath = path.join(options.module_dir, fileName);
      var html = fs.readFileSync(path.resolve(filePath), 'utf8');
      return format('\n\n```html\n%s\n```', html);
    }.bind(this))
  }
  return md;
}

module.exports = moduleLink;
