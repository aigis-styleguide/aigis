var Handlebars = require("handlebars");
var fs = require("fs-extra");
var path = require("path");

function readTemplate(templateDir, type) {
  var filePath = path.resolve(path.join(templateDir, type + ".hbs"));
  return Handlebars.compile(fs.readFileSync(filePath, "utf8"));
}

module.exports = readTemplate;
