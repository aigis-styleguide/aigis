var _ = require('lodash');
var hbs = require('handlebars');
var htmlBeautify = require('js-beautify').html;
var format = require('util').format;
var path = require('path');
var fs = require('fs-extra');

function transform(components, options) {

  hbs.registerHelper('include', function(includePath, params) {
    var ext = path.extname(includePath).length ===0 ? '.hbs' : '';
    var filePath = path.join(options.component_dir, includePath + ext);
    var template = fs.readFileSync(filePath, 'utf-8');
    var data = options.template_global_data ? this : params.hash;
    
    template = hbs.compile(template);
    
    return new hbs.SafeString(template(data));
  });
  
  var reg_block = /^`{3}(hbs|handlebars)$[\s\S]*?^`{3}$/gm;
  var reg_start = /^`{3}(hbs|handlebars)$/m;
  var reg_end = /^`{3}$/m;
  
  return _.map(components, function(component) {
    var md = component.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      
      if (component.config.compile === true) {
        var data = options.template_global_data ? component.config : {};
        code = hbs.compile(code)(data);
        code = htmlBeautify(code, {
          preserve_newlines: false
        });
      }
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    component.md = md;
    return component;
  });
}



module.exports = transform;
