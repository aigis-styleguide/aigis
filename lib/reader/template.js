var Handlebars = require("handlebars");
var fs = require("fs-extra");
var path = require("path");
var DEFAULT_OPTIONS = require("../app/options.js");

function readTemplate(templateDir, type) {
  var template;
  var filePath = path.resolve(path.join(templateDir, type + ".hbs"));
  
  try{
    template = fs.readFileSync(filePath, "utf8");
  }
  catch (err) {
    filePath = path.resolve(path.join(DEFAULT_OPTIONS.template, type + ".hbs"));
    template = fs.readFileSync(filePath, "utf8");
  }
  return Handlebars.compile(template);
}

module.exports = readTemplate;
