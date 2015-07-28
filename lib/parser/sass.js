var SASS = require("node-sass");
var path = require("path");

function sass(file) {
  var option = {
    data: file.contents.toString(),
    includePath: [path.dirname(file.path)]
  };

  var css = SASS.renderSync(option).css.toString();

  return css;
}

module.exports = sass;
