var path = require('path');
var fs = require('fs-extra');
var ejs = require('ejs');

function loadEJSTemplate(options) {
  var indexTemplatePath = path.resolve(options.template);
  var template = fs.readFileSync(indexTemplatePath, 'utf-8');
  return ejs.compile(template, {filename: indexTemplatePath});
}

module.exports = loadEJSTemplate;
