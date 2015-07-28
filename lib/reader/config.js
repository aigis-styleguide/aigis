var fs = require("fs-extra");
var path = require("path");
var configParser = require("../parser/config");

function readConfigFile(filePath) {
    var fileBuffer;
    try {
      console.log("config: " + path.resolve(filePath));
      fileBuffer = fs.readFileSync(path.resolve(filePath));
    }
    catch(e) {
      console.error("Config file: " + path.resolve(filePath) + " is Not Found");
      process.exit(1)
    }

    return configParser(fileBuffer);
  }

module.exports = readConfigFile;
