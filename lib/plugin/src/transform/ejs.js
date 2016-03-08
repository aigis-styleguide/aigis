var _ = require('lodash');
var ejs = require('ejs');
var format = require('util').format;

function transform(modules, options) {
  var reg_block = /`{3}(ejs)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(ejs|\n)+/;
  var reg_end = /`{3}/;

  return _.map(modules, function(module) {
    var md = module.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');

      if (module.config.compile === true) {
        code = ejs.compile(code)(module.config);
      }
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    module.md = md;
    return module;
  });
}

module.exports = transform;
