var _ = require('lodash');
var jade = require('jade');
var format = require('util').format;

function transform(components, options) {
  var reg_block = /^`{3}(jade)$[\s\S]*?^`{3}$/gm;
  var reg_start = /^`{3}(jade)$/m;
  var reg_end = /^`{3}$/m;

  return _.map(components, function(component) {
    var md = component.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      code = jade.compile(code, {pretty: true})(component.config);
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    component.md = md;
    return component;
  });
}

module.exports = transform;
