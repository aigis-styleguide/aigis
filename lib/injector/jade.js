var Jade = require("jade");

function jade(comments) {
  var reg_block = /`{3}(jade)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(jade|\n)+/;
  var reg_end = /`{3}/;
  
  _.each(comments, function(comment) {
    var md = comment.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      code = Jade.compile(code)();
      return "<div class='aigis-preview'>\n  " + code + "\n</div>\n\n" + codeblock;
    });
    comment.md = md;
  });
}

module.exports = jade;
