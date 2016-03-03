var _ = require("lodash");
var Jade = require("jade");
var format = require('util').format;

function jade(modules, options) {
  var reg_block = /`{3}(jade)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(jade|\n)+/;
  var reg_end = /`{3}/;

  return _.map(modules, function(module) {
    var md = module.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      // TODO path module.config
      code = Jade.compile(code)();
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    module.md = md;
    return module;
  });
}

module.exports = jade;
