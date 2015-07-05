var SASS = require("node-sass");
var path = require("path");

function sass(file) {
  var css = SASS.renderSync({
    data: file.contents.toString()
  }).css.toString();
  
  return css;
}

module.exports = sass;
