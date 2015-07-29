var path = require("path");
var CSS = require("css");
var getCssColors = require("get-css-colors");

function color(files) {
  var ret = _(files)
    .map(function(file) {
      var cssString;
      var ext = path.extname(file.path);

      // ファイル名の先頭が_のファイルは処理しない
      if (path.basename(file.path).indexOf('_') === 0) {
        return;
      }

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
              if (dec.type === "declaration") {
                return getCssColors(dec.value);
              }
            })
            .value();
        })
        .value();
    })
    .flattenDeep()
    .compact()
    .uniq()
    .sortBy(function(color) {
      return color.toLowerCase();
    })
    .value();

  return ret;
}

module.exports = color;
