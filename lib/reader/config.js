var fs = require("fs-extra");
var YAML = require("js-yaml");
var CSON = require("cson");

function readConfigFile(filePath) {
    var config;
    var file = fs.readFileSync(filePath, "utf-8");
    
    if (file) {
      try{
        config = YAML.load(file);
      }
      catch(e) {
        config = CSON.parse(file);
      }
    }
    
    return config;
  }

module.exports = readConfigFile;
