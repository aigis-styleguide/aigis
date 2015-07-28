var fs = require("fs-extra");
var YAML = require("js-yaml");
var CSON = require("cson");
var path = require("path");

function readConfigFile(filePath) {
    var config;
    var file;
    try {
      file = fs.readFileSync(path.resolve(filePath), "utf8");
    }
    catch(e) {
      console.error("Config file: " + path.resolve(filePath) + " is Not Found");
      process.exit(1)
    }

    if (file) {
      console.log("config: " + path.resolve(filePath));
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
