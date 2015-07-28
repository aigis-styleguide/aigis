var YAML = require("js-yaml");
var CSON = require("cson");
var path = require("path");

function configParser(fileBuffer) {
  var config = {};
  var fileString = fileBuffer.toString("utf8");

  if (fileString) {
    try {
      config = YAML.load(fileString);
    }
    catch(e) {
      config = CSON.parse(fileString);
    }
  }
  return config;
}

module.exports = configParser;
