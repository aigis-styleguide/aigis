var _ = require('lodash');
var htmlBeautify = require('js-beautify').html;
var format = require('util').format;

function html(components, options) {
  var reg_block = /^`{3}(html|block)$[\s\S]*?^`{3}$/gm;
  var reg_start = /^`{3}(html|block)$/m;
  var reg_end = /^`{3}$/m;

  return _.map(components, function(component) {
    var md = component.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      // remove preserve newlines for markdown parser
      code = htmlBeautify(code, {
        preserve_newlines: false
      });
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    component.md = md;
    return component;
  });
}

module.exports = html;
