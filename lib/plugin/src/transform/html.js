var _ = require('lodash');
var htmlBeautify = require('js-beautify').html;
var format = require('util').format;

function html(modules, options) {
  var reg_block = /`{3}(html|block)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(html|block|\n)+/;
  var reg_end = /`{3}/;

  return _.map(modules, function(module) {
    var md = module.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      // remove preserve newlines for markdown parser
      code = htmlBeautify(code, {
        preserve_newlines: false
      });
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    module.md = md;
    return module;
  });
}

module.exports = html;
