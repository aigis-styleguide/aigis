var _ = require('lodash');
var hbs = require('handlebars');
var htmlBeautify = require('js-beautify').html;
var format = require('util').format;
var path = require('path');
var fs = require('fs-extra');

function transform(modules, options) {

  hbs.registerHelper('include', function(includePath, params) {
    var ext = path.extname(includePath).length ===0 ? '.hbs' : '';
    var filePath = path.join(options.module_dir, includePath + ext);
    var template = fs.readFileSync(filePath, 'utf-8');
    template = hbs.compile(template);
    return new hbs.SafeString(template(this));
  });

  var reg_block = /`{3}(hbs|handlebars)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(hbs|handlebars|\n)+/;
  var reg_end = /`{3}/;

  return _.map(modules, function(module) {
    var md = module.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');

      if (module.config.compile === true) {
        code = hbs.compile(code)(module.config);
        code = htmlBeautify(code, {
          preserve_newlines: false
        });
      }
      return format('<div class="%s">\n  %s</div>\n\n%s', options.preview_class, code, codeblock);
    });
    module.md = md;
    return module;
  });
}



module.exports = transform;
