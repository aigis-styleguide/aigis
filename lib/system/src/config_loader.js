var fs = require('fs-extra');
var path = require('path');
var configParser = require('./config_parser');
var colors = require('colors/safe');

function configLoader(filePath) {
  var fileBuffer;
  try {
    console.info(colors.bold.cyan('[Info] Config File:', path.resolve(filePath)));
    fileBuffer = fs.readFileSync(path.resolve(filePath));
  }
  catch(e) {
    console.error(colors.bold.underline.red('[Error] Config File Not Found'));
    throw new Error(e);
  }

  return configParser(fileBuffer);
}

module.exports = configLoader;
