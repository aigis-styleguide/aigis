var path = require('path');
var fs = require('fs-extra');
var jade = require('jade');

function loadJADETemplate(templatePath) {
  var template = fs.readFileSync(templatePath, 'utf-8');
  return jade.compile(template, {filename: templatePath, pretty: true});
}

module.exports = loadJADETemplate;
