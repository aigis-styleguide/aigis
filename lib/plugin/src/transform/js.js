var _ = require("lodash");

function js(components) {
  var reg_block = /`{3}(js|javascript)$[\s\S]*?^`{3}$/gm;
  var reg_start = /^`{3}(js|javascript)$/m;
  var reg_end = /^`{3}$/m;

  return _.map(components, function(component) {
    var md = component.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      return codeblock + '\n\n<script>\n(function(){\n' + code + '\n})();\n</script>';
    });
    component.md = md;
    return component;
  });
}

module.exports = js;
