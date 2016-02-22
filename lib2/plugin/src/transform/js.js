var _ = require("lodash");

function js(modules) {
  var reg_block = /`{3}(js|javascript)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(js|javascript|\n)+/;
  var reg_end = /`{3}/;

  return _.map(modules, function(module) {
    var md = module.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      return codeblock + "\n\n<script>\n(function(){\n" + code + "\n})();\n</script>";
    });
    module.md = md;
    return module;
  });
}

module.exports = js;
