var _ = require('lodash');
var htmlBeautify = require('js-beautify').html;

function html(modules) {
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
      return '<div class="aigis-preview">\n  ' + code + '</div>\n\n' + codeblock;
    });
    module.md = md;
    return module;
  });
}

module.exports = html;
