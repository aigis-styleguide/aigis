var path = require("path");
var Handlebars = require("handlebars");
var fs = require("fs-extra");

function renderModule(filePath) {
  var templatePath = path.resolve(filePath);
  var tmpl = Handlebars.compile(fs.readFileSync(templatePath, "utf8"));
  
  _.each(this.modules, function (module) {
    var content = tmpl(module);
    module.content = content;
  });
}

module.exports = renderModule;
