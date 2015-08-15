var _ = require("lodash");
var path = require("path");
var CSS = require("css");
var YAML = require("js-yaml");
var CSON = require("cson");

function parseCSS(files) {
  console.log("\n-------- target file --------");

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

      console.log(file.path);

      var css = CSS.parse(cssString, {source: file.path});

      return _(css.stylesheet.rules)
        .filter({type: "comment"})
        .map(function(rule) {
          var comment = rule.comment;
          var source = rule.position.source;
          var filePath = "/" + path.relative("./", source);
          var reg = /-{3}[\s\S]+?-{3}/;
          var matched = comment.match(reg);

          if (matched === null) return;

          var configString = matched[0].replace(/-{3}/g, "");
          var config;

          try {
            config = YAML.load(configString);
          }
          catch(e) {
            config = CSON.parse(configString);
          }

          if (config.category === undefined) {
            config.category = [];
          }
          if (config.tag === undefined) {
            config.tag = [];
          }

          if (!_.isArray(config.category)) {
            config.category = [config.category];
          }
          if (!_.isArray(config.tag)) {
            config.tag = [config.tag];
          }

          config.filePath = filePath;
          var md = comment.replace(reg, "");
          var obj = {
            config: config,
            md: md,
            source: source,
          };

          return obj;
        }).value();

    })
    .flatten()
    .compact()
    .value();

  return ret;
}

module.exports = parseCSS;
