var _ = require("lodash");
var Jade = require("jade");

function jade(modules) {
  var reg_block = /`{3}(jade)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(jade|\n)+/;
  var reg_end = /`{3}/;

  return _.map(modules, function(module) {
    var md = module.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      code = Jade.compile(code)();
      return "<div class='aigis-preview'>\n  " + code + "\n</div>\n\n" + codeblock;
    });
    module.md = md;
    return module;
  });
}

module.exports = jade;
