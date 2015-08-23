var _ = require("lodash");
var htmlBeautify = require("js-beautify").html;
var path = require("path");
var fs = require("fs-extra");
var format = require("util").format;

function markup(comments) {
  _.each(comments, function(comment) {
    if (comment.config.markup) {
      var dir = path.dirname(comment.config.filePath);
      var fpath = path.join('.', dir, comment.config.markup);
      var html = fs.readFileSync(path.resolve(fpath), "utf8");

      comment.md += format('\n\n```html\n%s\n```', html);
    }
  });
}

module.exports = markup;
