var fs = require("fs-extra");

function writeModules(outputPath, html) {
  fs.outputFileSync(outputPath, html);
}

module.exports = writeModules;
