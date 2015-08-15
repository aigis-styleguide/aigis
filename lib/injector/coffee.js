var _ = require("lodash");
var Coffee = require("coffee-script");

function coffee(comments) {
  var reg_block = /`{3}(coffee)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(coffee|\n)+/;
  var reg_end = /`{3}/;

  _.each(comments, function(comment) {
    var md = comment.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      code = Coffee.compile(code, {bare: true});

      return codeblock + "\n\n<script>\n(function(){\n" + code + "\n})();\n</script>";
    });
    comment.md = md;
  });
}

module.exports = coffee;
