var fs = require('fs-extra');
var path = require('path');
var configParser = require('./config_parser');

function configLoader(filePath) {
  var fileBuffer;
  try {
    console.info('[Info] Config File:', path.resolve(filePath));
    fileBuffer = fs.readFileSync(path.resolve(filePath));
  }
  catch(e) {
    console.error('[Error] Config File Not Found');
    throw new Error(e);
  }

  return configParser(fileBuffer);
}

module.exports = configLoader;
