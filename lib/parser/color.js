var path = require("path");
var CSS = require("css");
var YAML = require("js-yaml");
var CSON = require("cson");
var CSS = require("css");
var getCssColors = require("get-css-colors");

function color(files) {
  var ret = _(files)
    .map(function(file) {
      var cssString;
      var ext = path.extname(file.path);
      
      switch(ext) {
        case ".css":
          cssString = file.contents.toString();
          break;
          
        case ".sass":
        case ".scss":
          cssString = require("./sass")(file);
          break;
          
        case ".styl":
          cssString = require("./stylus")(file);
          break;
          
        default:
          cssString = null;
      }
      
      if (!cssString) return;
      
      var css = CSS.parse(cssString, {source: file.path});
      
      return _(css.stylesheet.rules)
        .filter({type: "rule"})
        .pluck("declarations")
        .map(function(declarations) {
          return _(declarations)
            .map(function(dec) {
              return getCssColors(dec.value)
            })
            .value();
        })
        .value();
    })
    .flattenDeep()
    .compact()
    .value();
  
  return ret;
}

module.exports = color;
