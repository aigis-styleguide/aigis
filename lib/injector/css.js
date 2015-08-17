var _ = require("lodash");
var postcss = require("postcss");
var cssfmt = require("cssfmt");
var format = require("util").format;

function css(comments) {
  var reg_block = /`{3}(css|scss)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(css|scss|\n)+/;
  var reg_end = /`{3}/;

  _.each(comments, function(comment) {
    var md = comment.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      var type = comment.md.match(/(css|scss)/)[0];
      // remove preserve newlines for markdown parser
      code = postcss()
        .use(cssfmt())
        .process(code)
        .css;
      return format('```%s\n%s\n```', type, code);
    });
    comment.md = md;
  });
}

module.exports = css;
