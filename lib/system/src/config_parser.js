var YAML = require('js-yaml');
var path = require('path');
var colors = require('colors/safe');

function configParser(fileBuffer) {
  var config = {};
  var fileString = fileBuffer.toString('utf8');

  if (fileString) {
    try {
      config = YAML.load(fileString);
    }
    catch(e) {
      console.error(colors.bold.underline.red('[Error] Invalid YAML File'));
      throw new Error(e);
    }
  }
  return config;
}

module.exports = configParser;
