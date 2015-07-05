function html(comments) {
  var reg_block = /`{3}(html|block)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(html|block|\n)+/;
  var reg_end = /`{3}/;
  
  _.each(comments, function(comment) {
    var md = comment.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      return "<div class='aigis-preview'>\n  " + code + "</div>\n\n" + codeblock;
    });
    comment.md = md;
  });
}

module.exports = html;
