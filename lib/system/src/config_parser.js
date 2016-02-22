var YAML = require('js-yaml');
var path = require('path');

function configParser(fileBuffer) {
  var config = {};
  var fileString = fileBuffer.toString('utf8');

  if (fileString) {
    try {
      config = YAML.load(fileString);
    }
    catch(e) {
      console.error(e.message);
      throw new Error(e);
    }
  }
  return config;
}

module.exports = configParser;
