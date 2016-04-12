var _ = require('lodash');
var ejs = require('ejs');
var format = require('util').format;

function transform(components, options) {
  var reg_block = /^`{3}(ejs)$[\s\S]*?^`{3}$/gm;
  var reg_start = /^`{3}(ejs)$/m;
  var reg_end = /^`{3}$/m;

  return _.map(components, function(component) {
    var md = component.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');

      if (component.config.compile === true) {
        code = ejs.compile(code)(component.config);
      }
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    component.md = md;
    return component;
  });
}

module.exports = transform;
